import OCRAppBar from './OCRAppBar';
import TextOverlay from './TextOverlay';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useIsFocused} from '@react-navigation/native';
import {detectText} from '@src/utils/TextDetection';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {LayoutChangeEvent, Text, View} from 'react-native';
import ViewShot from 'react-native-view-shot';
import {
  Camera,
  CameraRuntimeError,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {Worklets, useSharedValue} from 'react-native-worklets-core';

import {BottomTabParamsList} from '@src/navigation/MainTabs';

function MysteryCamera({
  navigation,
}: {
  navigation: BottomTabNavigationProp<
    BottomTabParamsList,
    'MysteryScreen',
    'Tab'
  >;
}) {
  const [isActive, setIsActive] = useState(false);

  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const isFocused = useIsFocused();
  const onInitialized = useCallback(() => {
    setIsCameraInitialized(true);
  }, []);

  // handling results
  const [result, setResult] = useState<{text: string; blocks: any}>();
  const setResultJS = Worklets.createRunInJsFn(setResult);
  const [isTranslate, setIsTranslate] = useState(false);

  const [cameraDimensions, setCameraDimensions] = useState({
    width: 0,
    height: 0,
  });
  const frameDimensions = useSharedValue({width: 600, height: 360});
  const format = useCameraFormat(device, [
    // {
    //   photoResolution: 'max',
    // },
    // {photoAspectRatio: cameraDimensions.height / cameraDimensions.width},
    // {
    //   videoResolution: {
    //     width: cameraDimensions.width,
    //     height: cameraDimensions.height,
    //   },
    // },
    // {
    //   photoResolution: {
    //     width: cameraDimensions.width,
    //     height: cameraDimensions.height,
    //   },
    // },
    // {videoResolution: 'max'},
    // {photoResolution: 'max'},
  ]);

  useEffect(() => {
    if (isCameraInitialized) {
      // without setTimeout, the camera will not open on init
      setTimeout(() => {
        setIsActive(true);
      }, 1000);
    }
    setIsActive(false);
  }, [isCameraInitialized, setIsActive]);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  const onError = useCallback((error: CameraRuntimeError) => {
    console.error(error);
  }, []);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    frameDimensions.value = {width: frame.width, height: frame.height};
    const text = detectText(frame) as {
      result: {text: string; blocks: any};
    };
    setResultJS(text?.result);
  }, []);

  const screenShotRef = useRef<ViewShot>(null);

  if (!hasPermission || device === undefined || device === null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>이 탭을 쓰려면 카메라 권한이 필요합니다!</Text>
      </View>
    );
  }
  // console.log(cameraDimensions);
  // console.log(result);

  return (
    <ViewShot ref={screenShotRef} style={{flex: 1}} options={{format: 'jpg'}}>
      <View style={{flex: 1}}>
        <TextOverlay
          blocks={result?.blocks}
          frameDimensions={frameDimensions}
          cameraDimensions={cameraDimensions}
          isTranslate={isTranslate}
        />
        <Camera
          photo={true}
          onError={onError}
          style={{flex: 1}}
          // style={StyleSheet.absoluteFill}
          device={device}
          isActive={isActive && isFocused && isCameraInitialized}
          frameProcessor={frameProcessor}
          pixelFormat={'yuv'} // let's hope that this doesn't break on different devices
          orientation={'portrait'}
          onLayout={(event: LayoutChangeEvent) => {
            setCameraDimensions({
              height: event.nativeEvent.layout.height,
              width: event.nativeEvent.layout.width,
            });
          }}
          format={format}
          // resizeMode={'contain'}
          // fps={1}
          onInitialized={onInitialized}
        />
        <OCRAppBar
          text={result?.text}
          screenShotRef={screenShotRef}
          isTranslate={isTranslate}
          setIsTranslate={() => setIsTranslate(prev => !prev)}
        />
      </View>
    </ViewShot>
  );
}

export default React.memo(MysteryCamera);
