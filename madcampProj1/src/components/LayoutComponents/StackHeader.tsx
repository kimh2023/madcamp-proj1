import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ContactStackParamsList} from '@src/../App';
import React from 'react';
import {Pressable, View} from 'react-native';

import BackIcon from '@src/assets/icons/icon-back.svg';

function StackHeader() {
  const navigation =
    useNavigation<NativeStackNavigationProp<ContactStackParamsList>>();
  return (
    <View
      style={{
        position: 'absolute',
        top: 20,
        left: 15,
        zIndex: 9,
      }}>
      <Pressable onPress={() => navigation.goBack()}>
        <BackIcon width={35} height={35} />
      </Pressable>
    </View>
  );
}

export default StackHeader;
