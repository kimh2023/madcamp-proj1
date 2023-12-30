import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ContactStackParamsList} from '@src/../App';
import React from 'react';
import {Pressable, View} from 'react-native';

import EditIcon from '@src/assets/icons/icon-edit.svg';

function EditButton({userId}: {userId: string}) {
  const navigation =
    useNavigation<NativeStackNavigationProp<ContactStackParamsList>>();
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 9,
      }}>
      <Pressable
        onPress={() => navigation.navigate('ContactEditScreen', {userId})}>
        <EditIcon width={35} height={35} />
      </Pressable>
    </View>
  );
}

export default EditButton;
