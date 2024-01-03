import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ContactStackParamsList} from '@src/../App';
import React, {useCallback} from 'react';
import {PermissionsAndroid, Platform, Pressable, View} from 'react-native';
import Contacts, {Contact} from 'react-native-contacts';
import {CachesDirectoryPath, readFile, writeFile} from 'react-native-fs';
import Share from 'react-native-share';

// import FavoriteFalse from '@src/assets/icons/favorite-false.svg';
// import FavoriteTrue from '@src/assets/icons/favorite-true.svg';
import DeleteIcon from '@src/assets/icons/icon-delete.svg';
import EditIcon from '@src/assets/icons/icon-edit.svg';
import ShareIcon from '@src/assets/icons/icon-share.svg';

import {globalVariables} from '@src/styles/globalVariables';
import style from '@src/styles/style';

function ContactDetailsEditBar({
  userId,
  contactInfo,
  setContactInfoCallback,
}: {
  userId: string;
  contactInfo: Contact | null;
  setContactInfoCallback: () => void;
}) {
  const navigation =
    useNavigation<NativeStackNavigationProp<ContactStackParamsList>>();
  const iconSize = 27;
  const callbackFunction = useCallback(() => {
    if (!contactInfo) {
      return;
    }
    const contact = {
      ...contactInfo,
      // isStarred: `${!contactInfo?.isStarred}`,
      isStarred: true,
      isFavorite: true,
      note: '',
      familyName: 'lmao',
    };
    Contacts.updateContact(contact).then(() => {
      console.log('Contact Favorite Update: ', contact);
    });
    setContactInfoCallback();
  }, [contactInfo, setContactInfoCallback]);
  const handleFavorite = async () => {
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
        console.log('Permission for ContactDetailsScreen: ', res);
        callbackFunction();
      });
    } else {
      callbackFunction();
    }
  };
  const handleDelete = () => {
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
        console.log('Permission for ContactDetailsScreen: ', res);
        Contacts.deleteContact({recordID: userId} as Contact).then(recordId => {
          console.log('Contact Deleted: ', recordId);
        });
      });
    } else {
      Contacts.deleteContact({recordID: userId} as Contact).then(recordId => {
        console.log('Contact Deleted: ', recordId);
      });
    }
    navigation.navigate('MainTabs');
  };
  const handleShare = async () => {
    let vcardTemplate = `BEGIN:VCARD
VERSION:3.0
FN:${contactInfo?.displayName}
N:${contactInfo?.familyName};${contactInfo?.givenName}
`;
    if (contactInfo?.phoneNumbers && contactInfo?.phoneNumbers.length > 0) {
      contactInfo.phoneNumbers.forEach(phoneNumber => {
        vcardTemplate += 'TEL;TYPE=CELL:' + phoneNumber.number + '\n';
      });
    }
    if (contactInfo?.emailAddresses && contactInfo?.emailAddresses.length > 0) {
      contactInfo.emailAddresses.forEach(emailAddress => {
        vcardTemplate += 'EMAIL;CHARSET=UTF-8:' + emailAddress.email + '\n';
      });
    }
    vcardTemplate += 'END:VCARD\n';
    const filePath = CachesDirectoryPath + '/Contact.vcf';
    try {
      await writeFile(filePath, vcardTemplate, 'utf8');
      const fileContent = await readFile(filePath, 'base64');

      Share.open({
        title: 'Contact.vcf',
        url: 'file://' + filePath,
        failOnCancel: false,
      })
        .then(() => {
          console.log('Contact Share successful');
        })
        .catch(error => {
          console.error('Contact Share failed:', error);
        });
    } catch (error) {
      console.error('Error writing vCard:', error);
    }
  };
  return (
    <View
      style={[
        style.containerDefaults,
        {
          position: 'absolute',
          bottom: globalVariables.margin.buttonMargin,
          width: '100%',
          justifyContent: 'space-evenly',
        },
      ]}>
      {/* <Pressable onPress={handleFavorite}>
        {contactInfo?.isStarred ? (
          <FavoriteTrue width={iconSize} height={iconSize} />
        ) : (
          <FavoriteFalse width={iconSize} height={iconSize} />
        )}
      </Pressable> */}
      <Pressable onPress={handleDelete}>
        <DeleteIcon width={iconSize} height={iconSize} />
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('ContactEditScreen', {userId})}>
        <EditIcon width={iconSize} height={iconSize} />
      </Pressable>
      <Pressable onPress={handleShare}>
        <ShareIcon
          width={iconSize}
          height={iconSize}
          fill={globalVariables.color.dark}
        />
      </Pressable>
    </View>
  );
}

export default React.memo(ContactDetailsEditBar);
