import React from 'react';
import {Text, View} from 'react-native';
import {ISharedValue} from 'react-native-worklets-core';
import {Dimension} from 'recyclerlistview';

const TextOverlay = ({
  result,
  cameraDimensions,
  frameDimensions,
}: {
  result: {text: Text; blocks: any} | undefined;
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
        flex: 1,
        zIndex: 9,
      }}>
      {result &&
        result?.blocks &&
        Object.values(result?.blocks).map((block: any, index: number) => {
          return (
            <View
              key={index}
              style={{
                position: 'absolute',
                left:
                  (block.frame?.y * cameraDimensions.width) /
                  frameDimensions.value.width,
                top:
                  (block.frame?.x * cameraDimensions.height) /
                  frameDimensions.value.height,
                backgroundColor: 'rgba(143, 168, 255, 0.90)',
              }}>
              <Text>{block.text}</Text>
            </View>
          );
        })}
    </View>
  );
};

export default React.memo(TextOverlay);
