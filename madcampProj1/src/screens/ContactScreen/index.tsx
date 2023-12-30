import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {AppState, PermissionsAndroid, Platform, View} from 'react-native';
import Contacts, {Contact} from 'react-native-contacts';

import {BottomTabParamsList} from '@src/navigation/MainTabs';

import ContactList from '@src/components/ContactComponents/ContactList';

import style from '@src/styles/style';

type Props = NativeStackScreenProps<
  BottomTabParamsList,
  'ContactScreen',
  'Tab'
>;

function ContactScreen({route, navigation}: Props) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [appState, setAppState] = useState('startup');
  const getContacts = useCallback(async () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: '몰입캠프 프로젝트 1',
        message: '<몰입캠프 프로젝트 1>이 연락처 데이터를 요구합니다.',
        buttonPositive: '<몰입캠프 프로젝트 1>에게 연락처 데이터를 주세요.',
      }).then(res => {
        console.log('Permission for ContactScreen: ', res);
        Contacts.getAll().then(allContacts => {
          // console.log('Contacts: ', allContacts);
          setContacts(allContacts);
        });
      });
    } else {
      Contacts.getAll().then(allContacts => {
        // console.log('Contacts: ', allContacts);
        setContacts(allContacts);
      });
    }
  }, []);
  const memoizedGetContacts = useMemo(() => getContacts, [getContacts]);

  // needed for moving outside app
  useEffect(() => {
    memoizedGetContacts(); // call when component mounts

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.match(/inactive|background|startup/) &&
        nextAppState === 'active'
      ) {
        memoizedGetContacts();
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState, memoizedGetContacts]);

  // needed for moving within app
  useFocusEffect(
    useCallback(() => {
      memoizedGetContacts();
    }, [memoizedGetContacts]),
  );

  return (
    <View style={style.screenDefaults}>
      {contacts.length > 0 && <ContactList dataRows={contacts} />}
    </View>
  );
}

export default React.memo(ContactScreen);
