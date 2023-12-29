import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {AppState, PermissionsAndroid, Platform, View} from 'react-native';
import Contacts, {Contact} from 'react-native-contacts';

import {ContactStackParamsList} from '@src/navigation/ContactNavigation';

import ContactList from '@src/components/ContactComponents/ContactList';

import style from '@src/styles/style';

type Props = NativeStackScreenProps<
  ContactStackParamsList,
  'ContactScreen',
  'Stack'
>;

function ContactScreen({route, navigation}: Props) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [appState, setAppState] = useState('startup');

  useEffect(() => {
    function getContacts() {
      if (Platform.OS === 'android') {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: '몰입캠프 프로젝트 1',
            message: '<몰입캠프 프로젝트 1>이 연락처 데이터를 요구합니다.',
            buttonPositive: '<몰입캠프 프로젝트 1>에게 연락처 데이터를 주세요.',
          },
        ).then(res => {
          console.log('Permission: ', res);
          Contacts.getAll().then(allContacts => {
            console.log('Contacts: ', allContacts);
            console.log('Phone Number: ', allContacts[0].phoneNumbers);
            setContacts(allContacts);
          });
        });
      } else {
        Contacts.getAll().then(allContacts => {
          console.log('Contacts: ', allContacts);
          console.log('Phone Number: ', allContacts[0].phoneNumbers);
          setContacts(allContacts);
        });
      }
    }

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.match(/inactive|background|startup/) &&
        nextAppState === 'active'
      ) {
        getContacts();
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState]);

  return (
    <View style={style.screenDefaults}>
      {contacts.length > 0 && <ContactList dataRows={contacts} />}
    </View>
  );
}

export default ContactScreen;
