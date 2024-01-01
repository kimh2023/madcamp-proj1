import {detectText} from '@src/utils/TextDetection';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {NativeModules} from 'react-native';
import {
  Camera,
  runAsync,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from 'react-native-vision-camera';

function MysteryScreen() {
  const [isActive, setIsActive] = useState(false);
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');

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

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    // TextDetectionModule.recognizeImage();
    const text = detectText(frame);
    console.log(text);

    // runAsync(frame, () => {
    //   'worklet';
    //   console.log("I'm running asynchronously, possibly at a lower FPS rate!");
    //   TextDetectionModule.recognizeImage();
    // });

    // console.log(`Frame: ${frame.width}x${frame.height} (${frame.pixelFormat})`);
    // const scannedOcr = scanOCR(frame);
    //TextDetectionPlugin
    //detectText

    // console.log(scanResult);
  }, []);

  if (!hasPermission || device == null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>이 탭을 쓰려면 카메라 권한이 필요합니다!</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
      }}>
      <Camera
        style={{height: '100%', width: '100%'}}
        device={device}
        isActive={isActive}
        frameProcessor={frameProcessor}
      />
    </View>
  );
}

export default React.memo(MysteryScreen);
