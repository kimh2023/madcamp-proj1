import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ContactStackParamsList} from '@src/../App';
import React from 'react';
import {Pressable, View} from 'react-native';

import DeleteIcon from '@src/assets/icons/icon-delete.svg';
import EditIcon from '@src/assets/icons/icon-edit.svg';

import {globalVariables} from '@src/styles/globalVariables';
import style from '@src/styles/style';

function ContactDetailsEditBar({userId}: {userId: string}) {
  const navigation =
    useNavigation<NativeStackNavigationProp<ContactStackParamsList>>();
  const iconSize = 27;
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
      <Pressable
        onPress={() => navigation.navigate('ContactEditScreen', {userId})}>
        <DeleteIcon width={iconSize} height={iconSize} />
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('ContactEditScreen', {userId})}>
        <EditIcon width={iconSize} height={iconSize} />
      </Pressable>
    </View>
  );
}

export default ContactDetailsEditBar;
