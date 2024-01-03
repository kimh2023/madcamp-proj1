import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ContactStackParamsList} from '@src/../App';
import React, {useCallback} from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import Contacts, {Contact} from 'react-native-contacts';

import {globalVariables} from '@src/styles/globalVariables';
import style from '@src/styles/style';

function SaveButton({
  contact,
  thumbnailPath,
}: {
  contact: Contact | null;
  thumbnailPath: string | undefined;
}) {
  const navigation =
    useNavigation<NativeStackNavigationProp<ContactStackParamsList>>();
  const callbackFunction = useCallback(() => {
    if (!(contact?.givenName && contact.givenName.length > 0)) {
      Alert.alert(
        '몰입캠프',
        '이름을 입력하세요!',
        [{text: '넵', onPress: () => {}}],
        {userInterfaceStyle: 'light'},
      );
      return;
    }

    const tmpContact = {
      ...contact,
      thumbnailPath: thumbnailPath ? thumbnailPath : contact?.thumbnailPath,
    };
    console.log('UPDATE:', tmpContact?.thumbnailPath, thumbnailPath);
    if (contact && !('recordID' in contact)) {
      Contacts.addContact(tmpContact as Contact).then((res: Contact) => {
        console.log('Contact Added: ', res);
        navigation.navigate('ContactDetailsScreen', {
          userId: res?.recordID as string,
        });
      });
    } else if (contact) {
      Contacts.updateContact(tmpContact as Contact)
        .then(() => {
          console.log('Contact Update: ', contact);
        })
        .catch(error => {
          console.error('Contact Update Error: ', error);
        });
      navigation.navigate('ContactDetailsScreen', {
        userId: contact?.recordID as string,
      });
    }
  }, [contact, navigation, thumbnailPath]);
  const handleContactInfoSave = () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
        {
          title: '몰입캠프 프로젝트 1',
          message: '<몰입캠프 프로젝트 1>이 연락처 데이터 변경을 요구합니다.',
          buttonPositive:
            '<몰입캠프 프로젝트 1>에게 연락처 데이터 변경 권한을 주세요.',
        },
      ).then(res => {
        console.log('Permission: ', res);
        callbackFunction();
      });
    } else {
      callbackFunction();
    }
  };

  return (
    <View>
      <Pressable
        onPress={handleContactInfoSave}
        style={[
          [style.containerDefaults],
          {
            backgroundColor: globalVariables.color.blue1,
            borderRadius: 50,
            paddingHorizontal: 90,
            height: 60,
            marginBottom: 40,
          },
        ]}>
        <Text style={[style.button, {color: globalVariables.color.white}]}>
          저장하기
        </Text>
      </Pressable>
    </View>
  );
}

export default SaveButton;
