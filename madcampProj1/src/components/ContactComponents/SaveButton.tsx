import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ContactStackParamsList} from '@src/../App';
import React from 'react';
import {
  Dimensions,
  PermissionsAndroid,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import Contacts, {Contact} from 'react-native-contacts';

import {globalVariables} from '@src/styles/globalVariables';
import style from '@src/styles/style';

function SaveButton({contact}: {contact: Contact | null}) {
  const height = Dimensions.get('window').height;
  const navigation =
    useNavigation<NativeStackNavigationProp<ContactStackParamsList>>();
  const handleContactInfoSave = () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
        {
          title: '몰입캠프 프로젝트 1',
          message: '<몰입캠프 프로젝트 1>이 연락처 데이터를 요구합니다.',
          buttonPositive: '<몰입캠프 프로젝트 1>에게 연락처 데이터를 주세요.',
        },
      ).then(res => {
        console.log('Permission: ', res);
        Contacts.updateContact(contact as Contact).then(() => {
          console.log('Contact Update: ', contact);
        });
      });
    } else {
      //   Contacts.getContactById(route.params.userId).then(nativeContact => {
      //     console.log('Contact: ', nativeContact);
      //     setContactInfo(nativeContact);
      //   });
    }

    navigation.navigate('ContactDetailsScreen', {
      userId: contact?.recordID as string,
    });
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
