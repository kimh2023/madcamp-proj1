import React, {useState} from 'react';
import {
  NativeModules,
  PermissionsAndroid,
  Platform,
  Pressable,
  View,
} from 'react-native';
import Share from 'react-native-share';
import Tts from 'react-native-tts';
import ViewShot from 'react-native-view-shot';

import ShareIcon from '@src/assets/icons/icon-share.svg';
import TTSIcon from '@src/assets/icons/icon-tts.svg';

import {globalVariables} from '@src/styles/globalVariables';

const {ScreenShotModule} = NativeModules;

const OCRAppBar = ({
  text,
  screenShotRef,
}: {
  text: string | undefined;
  screenShotRef: React.RefObject<ViewShot>;
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleTTS = () => {
    Tts.stop();
    if (!isSpeaking) {
      Tts.getInitStatus().then(() => {
        if (text) {
          // console.log(typeof text);
          Tts.speak(text);
        } else {
          Tts.speak('No text was detected.');
        }
      });
    }
    setIsSpeaking(!isSpeaking);
  };
  const handleShare = async () => {
    // cameraRef.current?.takePhoto();
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: '몰입캠프 프로젝트 1',
          message: '<몰입캠프 프로젝트 1>이 이미지 저장 권한을 요구합니다.',
          buttonPositive:
            '<몰입캠프 프로젝트 1>에게 이미지 저장 권한을 요구합니다.',
        },
      ).then(result => {
        ScreenShotModule.takeScreenShot();
        if (screenShotRef.current && screenShotRef.current.capture) {
          screenShotRef.current.capture().then((uri: string) => {
            console.log(uri);
            Share.open({
              title: '몰입캠프 OCR',
              message: '몰입캠프에서 OCR을 만나봐요!',
              url: uri,
              type: 'image/jpeg',
            });
          });
        }
      });
    }
  };

  return (
    <View
      style={{
        position: 'absolute',
        bottom: globalVariables.margin.buttonMargin,
        right: globalVariables.margin.buttonMargin,
        zIndex: 10,
        display: 'flex',
        gap: globalVariables.gap.verticalGap,
        backgroundColor: 'red',
      }}>
      <Pressable onPress={handleTTS}>
        <TTSIcon width={55} height={55} />
      </Pressable>
      <Pressable onPress={handleShare}>
        <ShareIcon width={55} height={55} />
      </Pressable>
    </View>
  );
};
export default OCRAppBar;
