import {ContactStackParamsList} from '../../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {AppState, PermissionsAndroid, Platform, View} from 'react-native';
import Contacts, {Contact} from 'react-native-contacts';
import LinearGradient from 'react-native-linear-gradient';

import ContactImage from '@src/components/ContactComponents/ContactImage';
import EditTextInput from '@src/components/ContactComponents/EditTextInput';
import SaveButton from '@src/components/ContactComponents/SaveButton';
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
  const getContactInfo = useCallback(async () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: '몰입캠프 프로젝트 1',
        message: '<몰입캠프 프로젝트 1>이 연락처 데이터를 요구합니다.',
        buttonPositive: '<몰입캠프 프로젝트 1>에게 연락처 데이터를 주세요.',
      }).then(res => {
        console.log('Permission for ContactEditScreen: ', res);
        Contacts.getContactById(route.params.userId).then(nativeContact => {
          console.log('Contact: ', nativeContact);
          setContactInfo(nativeContact);
        });
      });
    } else {
      Contacts.getContactById(route.params.userId).then(nativeContact => {
        console.log('Contact: ', nativeContact);
        setContactInfo(nativeContact);
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

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.match(/inactive|background|startup/) &&
        nextAppState === 'active'
      ) {
        memoizedGetContactInfo();
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState, startEdit, memoizedGetContactInfo, route.params.userId]);

  return (
    <LinearGradient
      style={[
        style.screenDefaults,
        {alignItems: 'center', paddingTop: 100, gap: 10},
      ]}
      colors={[globalVariables.color.blue0, globalVariables.color.white]}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 0.5}}>
      <StackHeader />
      <View style={{backgroundColor: 'red'}}>
        <ContactImage image={contactInfo?.thumbnailPath} />
      </View>

      <EditTextInput
        setStartEdit={() => setStartEdit(true)}
        setContactInfo={(attribute: keyof Contact, changedValue: string) =>
          setContactInfo(
            prevState =>
              ({
                ...prevState,
                [attribute]: changedValue,
              } as Contact),
          )
        }
        contactInfo={contactInfo}
      />
      <SaveButton contact={contactInfo} />
    </LinearGradient>
  );
}

export default ContactEditScreen;
