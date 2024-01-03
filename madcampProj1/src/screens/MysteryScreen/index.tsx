import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {View} from 'react-native';

import {BottomTabParamsList} from '@src/navigation/MainTabs';

import MysteryCamera from '@src/components/MysteryComponents/MysteryCamera';

type Props = BottomTabScreenProps<BottomTabParamsList, 'MysteryScreen', 'Tab'>;

function MysteryScreen({route, navigation}: Props) {
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      {/* <View
        style={{
          position: 'absolute',
          top: 20,
          left: 15,
          zIndex: 9,
        }}>
        <Pressable onPress={() => navigation.goBack()}>
          <BackIcon width={35} height={35} />
        </Pressable>
      </View> */}
      <MysteryCamera navigation={navigation} />
    </View>
  );
}

export default React.memo(MysteryScreen);
