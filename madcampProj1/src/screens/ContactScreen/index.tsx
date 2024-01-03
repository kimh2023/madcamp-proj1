import {ContactStackParamsList} from '../../../App';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  AppState,
  Keyboard,
  PermissionsAndroid,
  Platform,
  Pressable,
  TextInput,
  View,
} from 'react-native';
import Contacts, {Contact} from 'react-native-contacts';

import {BottomTabParamsList} from '@src/navigation/MainTabs';

import ContactList from '@src/components/ContactComponents/ContactScreen/ContactList';

import CloseIcon from '@src/assets/icons/icon-close.svg';
import PlusButton from '@src/assets/icons/icon-plus.svg';
import SearchIcon from '@src/assets/icons/icon-search.svg';

import {globalVariables} from '@src/styles/globalVariables';
import style from '@src/styles/style';

type Props = NativeStackScreenProps<
  BottomTabParamsList,
  'ContactScreen',
  'Tab'
>;

function ContactScreen({route, navigation}: Props) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [appState, setAppState] = useState('startup');
  const getContacts = useCallback(async () => {
    setSearchTerm('');
    Keyboard.dismiss();
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: '몰입캠프 프로젝트 1',
        message: '<몰입캠프 프로젝트 1>이 연락처 데이터를 요구합니다.',
        buttonPositive: '<몰입캠프 프로젝트 1>에게 연락처 데이터를 주세요.',
      }).then(res => {
        console.log('Permission for ContactScreen: ', res);
        Contacts.getAll().then(allContacts => {
          // console.log('Contacts: ', allContacts);
          const sortedContacts = allContacts.sort((a, b) => {
            // Use toUpperCase() to ensure a case-insensitive comparison
            const displayNameA = a.displayName.toUpperCase();
            const displayNameB = b.displayName.toUpperCase();

            if (displayNameA < displayNameB) {
              return -1;
            }
            if (displayNameA > displayNameB) {
              return 1;
            }
            return 0;
          });

          setContacts(sortedContacts);
        });
      });
    } else {
      Contacts.getAll().then(allContacts => {
        // console.log('Contacts: ', allContacts);
        const sortedContacts = allContacts.sort((a, b) => {
          // Use toUpperCase() to ensure a case-insensitive comparison
          const displayNameA = a.displayName.toUpperCase();
          const displayNameB = b.displayName.toUpperCase();

          if (displayNameA < displayNameB) {
            return -1;
          }
          if (displayNameA > displayNameB) {
            return 1;
          }
          return 0;
        });

        setContacts(sortedContacts);
      });
    }
  }, []);
  const memoizedGetContacts = useMemo(() => getContacts, [getContacts]);

  const stackNavigation =
    useNavigation<NativeStackNavigationProp<ContactStackParamsList>>();
  const newContact = () => {
    stackNavigation.navigate('ContactEditScreen', {
      userId: `newUser-${contacts.length}`,
    });
  };

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

  // search
  const handleSearch = async (text: string) => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: '몰입캠프 프로젝트 1',
        message: '<몰입캠프 프로젝트 1>이 연락처 데이터를 요구합니다.',
        buttonPositive: '<몰입캠프 프로젝트 1>에게 연락처 데이터를 주세요.',
      }).then(res => {
        console.log('Permission for ContactScreen: ', res);
        Contacts.getContactsMatchingString(text).then(allContacts => {
          console.log('Contacts Searched: ', allContacts);
          const sortedContacts = allContacts.sort((a, b) => {
            // Use toUpperCase() to ensure a case-insensitive comparison
            const displayNameA = a.displayName.toUpperCase();
            const displayNameB = b.displayName.toUpperCase();

            if (displayNameA < displayNameB) {
              return -1;
            }
            if (displayNameA > displayNameB) {
              return 1;
            }
            return 0;
          });

          setContacts(sortedContacts);
        });
      });
    } else {
      Contacts.getContactsMatchingString(text).then(allContacts => {
        console.log('Contacts Searched: ', allContacts);
        const sortedContacts = allContacts.sort((a, b) => {
          // Use toUpperCase() to ensure a case-insensitive comparison
          const displayNameA = a.displayName.toUpperCase();
          const displayNameB = b.displayName.toUpperCase();

          if (displayNameA < displayNameB) {
            return -1;
          }
          if (displayNameA > displayNameB) {
            return 1;
          }
          return 0;
        });

        setContacts(sortedContacts);
      });
    }
  };

  return (
    <View style={style.screenDefaults}>
      <View
        style={[
          style.input,
          style.containerDefaults,
          {
            flex: 0,
            marginHorizontal: globalVariables.margin.horizontalMargin,
            paddingHorizontal: 0,
            paddingVertical: 0,
            paddingRight: 20,
            marginBottom: 20,
          },
        ]}>
        <TextInput
          style={[style.input, style.h3, {borderWidth: 0}]}
          value={searchTerm}
          onChangeText={(text: string) => {
            setSearchTerm(text);
            handleSearch(text);
          }}
        />
        {searchTerm.length === 0 ? (
          <SearchIcon width={16} height={style.input.height} />
        ) : (
          <Pressable onPress={memoizedGetContacts}>
            <CloseIcon width={12} height={style.input.height} />
          </Pressable>
        )}
      </View>
      {contacts.length > 0 && <ContactList dataRows={contacts} />}
      <Pressable
        onPress={newContact}
        style={[
          style.containerDefaults,
          {
            position: 'absolute',
            bottom: globalVariables.margin.buttonMargin,
            right: globalVariables.margin.horizontalMargin,
            height: 50,
            width: 50,
            backgroundColor: globalVariables.color.blue1,
            borderRadius: 50,
            // for ios
            shadowColor: globalVariables.color.dark,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 1,
            shadowRadius: 20,
            // for android
            elevation: 5,
          },
        ]}>
        <PlusButton width={12} height={12} />
      </Pressable>
    </View>
  );
}

export default React.memo(ContactScreen);
