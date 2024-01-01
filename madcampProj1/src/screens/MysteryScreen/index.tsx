import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {ScanConfig, recognize} from 'vision-camera-dynamsoft-label-recognizer';

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
    // console.log(`Frame: ${frame.width}x${frame.height} (${frame.pixelFormat})`);
    // const scannedOcr = scanOCR(frame);
    let config: ScanConfig = {};
    config.includeImageBase64 = true;
    const scanResult = recognize(frame, config);
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
