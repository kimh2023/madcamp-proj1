import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ContactStackParamsList} from '@src/../App';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {AppState, PermissionsAndroid, Platform, Text} from 'react-native';
import Contacts, {Contact} from 'react-native-contacts';
import LinearGradient from 'react-native-linear-gradient';

import ContactDetailsAppBar from '@src/components/ContactComponents/ContactDetailsScreen/ContactDetailsAppBar';
import ContactDetailsEditBar from '@src/components/ContactComponents/ContactDetailsScreen/ContactDetailsEditBar';
import ContactImage from '@src/components/ContactComponents/ContactImage';
import StackHeader from '@src/components/LayoutComponents/StackHeader';

import {globalVariables} from '@src/styles/globalVariables';
import style from '@src/styles/style';

type Props = NativeStackScreenProps<
  ContactStackParamsList,
  'ContactDetailsScreen',
  'Stack'
>;

function ContactDetailsScreen({route, navigation}: Props) {
  const [contactInfo, setContactInfo] = useState<Contact | null>(null);
  const [appState, setAppState] = useState('startup');
  const getContactInfo = useCallback(async () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: '몰입캠프 프로젝트 1',
        message: '<몰입캠프 프로젝트 1>이 연락처 데이터를 요구합니다.',
        buttonPositive: '<몰입캠프 프로젝트 1>에게 연락처 데이터를 주세요.',
      }).then(res => {
        console.log('Permission for ContactDetailsScreen: ', res);
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

  // needed for moving outside app
  useEffect(() => {
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
  }, [appState, memoizedGetContactInfo, route.params.userId]);

  // needed for moving within app
  useFocusEffect(
    useCallback(() => {
      memoizedGetContactInfo();
    }, [memoizedGetContactInfo]),
  );

  return (
    <LinearGradient
      style={[
        style.screenDefaults,
        {alignItems: 'center', paddingTop: 100, gap: 5},
      ]}
      colors={[globalVariables.color.blue0, globalVariables.color.white]}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 0.5}}>
      <StackHeader path="MainTabs" />
      <ContactImage image={contactInfo?.thumbnailPath} />
      <Text style={[style.h1, {paddingTop: 50}]}>
        {contactInfo?.displayName}
      </Text>
      <Text style={[style.h2, {paddingTop: 10}]}>
        {contactInfo?.phoneNumbers[0]?.number}
      </Text>
      <Text style={style.h2}>{contactInfo?.emailAddresses[0]?.email}</Text>
      <ContactDetailsAppBar
        phoneNumber={contactInfo?.phoneNumbers[0]?.number}
      />
      <ContactDetailsEditBar userId={route.params.userId} />
      {/* <Text>{`${contactInfo}`}</Text> */}
    </LinearGradient>
  );
}

export default ContactDetailsScreen;
