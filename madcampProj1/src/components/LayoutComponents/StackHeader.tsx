import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ContactStackParamsList} from '@src/../App';
import React, {useCallback} from 'react';
import {Pressable, View} from 'react-native';

import BackIcon from '@src/assets/icons/icon-back.svg';

function StackHeader({
  path,
  userId,
}: {
  path: keyof ContactStackParamsList;
  userId?: string;
}) {
  const navigation =
    useNavigation<NativeStackNavigationProp<ContactStackParamsList>>();
  const navigate = useCallback(() => {
    switch (path) {
      case 'MainTabs':
        navigation.navigate('MainTabs');
        return;
      case 'ContactDetailsScreen':
      case 'ContactEditScreen':
        navigation.navigate(path, {userId: userId as string});
    }
  }, [navigation, path, userId]);
  return (
    <View
      style={{
        position: 'absolute',
        top: 20,
        left: 15,
        zIndex: 9,
      }}>
      <Pressable onPress={navigate}>
        <BackIcon width={35} height={35} />
      </Pressable>
    </View>
  );
}

export default React.memo(StackHeader);
