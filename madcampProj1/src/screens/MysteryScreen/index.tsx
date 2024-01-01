import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {detectText} from '@src/utils/TextDetection';
import React, {useCallback, useEffect, useState} from 'react';
import {LayoutChangeEvent, Pressable, Text, View} from 'react-native';
import {
  Camera,
  CameraRuntimeError,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {Worklets, useSharedValue} from 'react-native-worklets-core';

import {BottomTabParamsList} from '@src/navigation/MainTabs';

import TextOverlay from '@src/components/MysteryComponents/TextOverlay';

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
      <TextOverlay
        result={result}
        frameDimensions={frameDimensions}
        cameraDimensions={cameraDimensions}
      />
      <Camera
        onError={onError}
        style={{height: '100%', width: '100%', flex: 1}}
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
