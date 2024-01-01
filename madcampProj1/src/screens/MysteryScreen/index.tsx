import {TextBlock} from '@react-native-ml-kit/text-recognition';
import {
  BottomTabBarButtonProps,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {detectText} from '@src/utils/TextDetection';
import React, {useCallback, useEffect, useState} from 'react';
import {LayoutChangeEvent, Pressable, Text, View} from 'react-native';
import {NativeModules} from 'react-native';
import {
  Camera,
  CameraRuntimeError,
  runAsync,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {Worklets, useSharedValue} from 'react-native-worklets-core';

import {BottomTabParamsList} from '@src/navigation/MainTabs';

import StackHeader from '@src/components/LayoutComponents/StackHeader';

import BackIcon from '@src/assets/icons/icon-back.svg';

type Props = BottomTabScreenProps<BottomTabParamsList, 'MysteryScreen', 'Tab'>;

function MysteryScreen({route, navigation}: Props) {
  const [isActive, setIsActive] = useState(false);
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const [result, setResult] = useState<{text: Text; blocks: any}>();
  const setResultJS = Worklets.createRunInJsFn(setResult);

  const [cameraDimensions, setCameraDimensions] = useState({
    width: 0,
    height: 0,
  });
  const frameDimensions = useSharedValue({width: 0, height: 0});

  useEffect(() => {
    if (hasPermission) {
      // without setTimeout, the camera will not open on init
      setTimeout(() => {
        setIsActive(true);
      }, 1000);
    }
  }, [hasPermission]);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const onError = useCallback((error: CameraRuntimeError) => {
    console.error(error);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      setIsActive(false);
    });
    return unsubscribe;
  }, [navigation]);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    frameDimensions.value = {width: frame.width, height: frame.height};
    const text = detectText(frame) as {
      result: {text: Text; blocks: any};
    };
    setResultJS(text?.result);
  }, []);

  if (!hasPermission || device == null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>이 탭을 쓰려면 카메라 권한이 필요합니다!</Text>
      </View>
    );
  }

  const TextOverlay = () => {
    // console.log(result?.blocks);
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
          // backgroundColor: 'red',
        }}>
        {result &&
          result?.blocks &&
          Object.values(result?.blocks).map((block: any, index: number) => {
            const frameAspectRatio =
              frameDimensions.value.width / frameDimensions.value.height;
            const aspectRatio =
              cameraDimensions.width / cameraDimensions.height;

            let widthRatio: number;
            let heightRatio: number;
            let offsetX = 0;
            let offsetY = 0;
            if (frameAspectRatio < aspectRatio) {
              widthRatio = cameraDimensions.width / frameDimensions.value.width;
              const croppedFrameHeight =
                aspectRatio * frameDimensions.value.width;
              offsetY = (frameDimensions.value.height - croppedFrameHeight) / 2;
              heightRatio = cameraDimensions.height / croppedFrameHeight;
            } else {
              heightRatio =
                cameraDimensions.height / frameDimensions.value.height;
              const croppedFrameWidth =
                aspectRatio * frameDimensions.value.height;
              offsetX = (frameDimensions.value.width - croppedFrameWidth) / 2;
              widthRatio = cameraDimensions.width / croppedFrameWidth;
            }
            console.log(
              cameraDimensions.height,
              cameraDimensions.width,
              frameDimensions.value.height,
              frameDimensions.value.width,
              block?.boundingBox?.top,
              block?.boundingBox?.left,
              block?.frame?.y,
              block?.frame?.x,
              block.cornerPoints[0]?.y,
              block.cornerPoints[0]?.x,
              block.text,
            );

            return (
              <View
                key={index}
                style={{
                  position: 'absolute',
                  // top:
                  //   '0' in block.cornerPoints
                  //     ? (block.cornerPoints[0]?.y * offsetY) / heightRatio
                  //     : 0,
                  // left:
                  //   '0' in block.cornerPoints
                  //     ? (block.cornerPoints[0]?.x * offsetX) / widthRatio
                  //     : 0,
                  // x: (point.x - offsetX) * widthRatio,
                  // y: (point.y - offsetY) * heightRatio,

                  // left: (block.frame?.x - offsetX) * widthRatio,
                  // top: (block.frame?.y - offsetY) * heightRatio,
                  left:
                    (block.frame?.y * cameraDimensions.width) /
                    frameDimensions.value.width,
                  top:
                    (block.frame?.x * cameraDimensions.height) /
                    frameDimensions.value.height,

                  // top:
                  //   (block.frame?.y * cameraDimensions.height) /
                  //   frameDimensions.value.height,
                  // left:
                  //   (block.frame?.x * cameraDimensions.width) /
                  //   frameDimensions.value.width,
                  //   top:
                  //   '0' in block.cornerPoints
                  //     ? (block.cornerPoints[0]?.y * cameraDimensions.height) /
                  //       frameDimensions.value.height
                  //     : 0,
                  // left:
                  //   '0' in block.cornerPoints
                  //     ? (block.cornerPoints[0]?.x * cameraDimensions.width) /
                  //       frameDimensions.value.width
                  //     : 0,
                  // width: 50,
                  // height: 50,
                  backgroundColor: 'rgba(143, 168, 255, 0.90)',
                }}>
                <Text>{block.text}</Text>
              </View>
            );
          })}
      </View>
    );
  };
  console.log(
    cameraDimensions.height,
    cameraDimensions.width,
    frameDimensions.value.height,
    frameDimensions.value.width,
    result?.blocks.length >= 1 && result?.blocks[0]?.frame?.y,
    result?.blocks.length >= 1 && result?.blocks[0]?.frame?.x,
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
      }}>
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
      <TextOverlay />
      <Camera
        onError={onError}
        style={{height: '100%', width: 200, flex: 1}}
        device={device}
        isActive={isActive}
        frameProcessor={frameProcessor}
        pixelFormat={'yuv'} // let's hope that this doesn't break on different devices
        orientation={'portrait'}
        onLayout={(event: LayoutChangeEvent) => {
          setCameraDimensions({
            height: event.nativeEvent.layout.height,
            width: event.nativeEvent.layout.width,
          });
        }}
        // fps={1}
      />
    </View>
  );
}

export default React.memo(MysteryScreen);
