import {ContactStackParamsList} from '../../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  BackHandler,
  PermissionsAndroid,
  Platform,
  ScrollView,
} from 'react-native';
import Contacts, {
  Contact,
  EmailAddress,
  PhoneNumber,
} from 'react-native-contacts';
import LinearGradient from 'react-native-linear-gradient';

import EditImageInput from '@src/components/ContactComponents/ContactEditScreen/EditImageInput';
import EditTextInput from '@src/components/ContactComponents/ContactEditScreen/EditTextInput';
import {valueListItem} from '@src/components/ContactComponents/ContactEditScreen/EditTextInputGroup';
import SaveButton from '@src/components/ContactComponents/ContactEditScreen/SaveButton';
import StackHeader from '@src/components/LayoutComponents/StackHeader';

import {globalVariables} from '@src/styles/globalVariables';
import style from '@src/styles/style';

type Props = NativeStackScreenProps<
  ContactStackParamsList,
  'ContactEditScreen',
  'Stack'
>;

function ContactEditScreen({route, navigation}: Props) {
  const [contactInfo, setContactInfo] = useState<Contact | null>(null);
  const [startEdit, setStartEdit] = useState<boolean>(false);
  const [appState, setAppState] = useState('startup');
  const [thumbnailPath, setThumbnailPath] = useState<{
    url?: string;
    originalPath?: string;
  }>({
    url: undefined,
    originalPath: undefined,
  });
  const getContactInfo = useCallback(async () => {
    if (route.params.userId.includes('newUser')) {
      const nativeContact = {
        familyName: '',
        phoneNumbers: [] as PhoneNumber[],
        emailAddresses: [] as EmailAddress[],
        givenName: '',
        company: '',
      };
      console.log('Contact: new contact');
      setContactInfo(nativeContact as Contact);
      return;
    }
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: '몰입캠프 프로젝트 1',
        message: '<몰입캠프 프로젝트 1>이 연락처 데이터를 요구합니다.',
        buttonPositive: '<몰입캠프 프로젝트 1>에게 연락처 데이터를 주세요.',
      }).then(res => {
        console.log('Permission for ContactEditScreen: ', res);
        Contacts.getContactById(route.params.userId).then(nativeContact => {
          console.log('Contact Edit Page: ', nativeContact);
          setContactInfo(nativeContact);
          setThumbnailPath({url: nativeContact?.thumbnailPath});
        });
      });
    } else {
      Contacts.getContactById(route.params.userId).then(nativeContact => {
        console.log('Contact Edit Page: ', nativeContact);
        setContactInfo(nativeContact);
        setThumbnailPath({url: nativeContact?.thumbnailPath});
      });
    }
  }, [route.params.userId]);
  const memoizedGetContactInfo = useMemo(
    () => getContactInfo,
    [getContactInfo],
  );

  useEffect(() => {
    if (startEdit) {
      return;
    }
    memoizedGetContactInfo(); // call when component mounts
  }, [startEdit, memoizedGetContactInfo, route.params.userId]);

  // 최적화!
  const setStartEditCallback = useCallback(() => setStartEdit(true), []);
  const setContactInfoCallback = useCallback(
    (attribute: keyof Contact, changedValue: string | valueListItem[]) =>
      setContactInfo(
        prevState =>
          ({
            ...prevState,
            [attribute]: changedValue,
          } as Contact),
      ),
    [],
  );
  const setThumbnailCallback = useCallback(
    (originalPath: string, uriPath: string) => {
      setThumbnailPath({url: uriPath, originalPath: originalPath});
      setStartEdit(true);
      // console.log(thumbnailPath);
    },
    [],
  );

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (route.params.userId.includes('newUser')) {
          navigation.navigate('MainTabs');
        } else {
          navigation.navigate('ContactDetailsScreen', {
            userId: route.params.userId,
          });
        }
        return true;
      },
    );
    return () => backHandler.remove();
  }, [navigation, route.params.userId]);

  return (
    <React.Fragment>
      <StackHeader
        path={
          route.params.userId.includes('newUser')
            ? 'MainTabs'
            : 'ContactDetailsScreen'
        }
        userId={route.params.userId}
      />
      <ScrollView>
        <LinearGradient
          style={[
            style.screenDefaults,
            {alignItems: 'center', paddingTop: 100, gap: 10},
          ]}
          colors={[globalVariables.color.blue0, globalVariables.color.white]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 0.5}}>
          {contactInfo && (
            <EditImageInput
              setThumbnail={setThumbnailCallback}
              thumbnailPath={thumbnailPath}
            />
          )}

          <EditTextInput
            setStartEdit={setStartEditCallback}
            setContactInfo={setContactInfoCallback}
            contactInfo={contactInfo}
          />
          <SaveButton
            contact={contactInfo}
            thumbnailPath={thumbnailPath.originalPath}
          />
        </LinearGradient>
      </ScrollView>
    </React.Fragment>
  );
}

export default React.memo(ContactEditScreen);
