import React from 'react';
import {Text, View} from 'react-native';
import {ISharedValue} from 'react-native-worklets-core';
import {Dimension} from 'recyclerlistview';

import style from '@src/styles/style';

const TextOverlay = ({
  blocks,
  cameraDimensions,
  frameDimensions,
}: {
  blocks: any | undefined;
  cameraDimensions: Dimension;
  frameDimensions: ISharedValue<{
    width: number;
    height: number;
  }>;
}) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: cameraDimensions.width,
        height: cameraDimensions.height,
        zIndex: 9,
        // backgroundColor: 'rgba(143, 168, 255, 0.90)',
      }}>
      {blocks &&
        Object.values(blocks).map((block: any, index: number) => {
          return (
            <View
              key={index}
              style={{
                position: 'absolute',
                right:
                  (block.frame?.y * cameraDimensions.width) /
                  frameDimensions.value.width,
                // right:
                //   (block.frame?.y * cameraDimensions.width) /
                //   frameDimensions.value.width,
                top:
                  (block.frame?.x * cameraDimensions.height) /
                  frameDimensions.value.height,
                backgroundColor: 'rgba(143, 168, 255, 0.90)',
              }}>
              <Text
                style={[
                  style.h3,
                  {
                    fontSize: Math.min(
                      (block.frame?.height * cameraDimensions.height) /
                        (frameDimensions.value.height * block.lines?.length),
                      10,
                    ),
                  },
                ]}>
                {block.text}
              </Text>
            </View>
          );
        })}
    </View>
  );
};

export default React.memo(TextOverlay);
