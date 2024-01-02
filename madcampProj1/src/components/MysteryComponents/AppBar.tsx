import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import Tts from 'react-native-tts';

import TTSIcon from '@src/assets/icons/icon-tts.svg';

import {globalVariables} from '@src/styles/globalVariables';

const OCRAppBar = ({text}: {text: string | undefined}) => {
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

  return (
    <View
      style={{
        position: 'absolute',
        bottom: globalVariables.margin.buttonMargin,
        right: globalVariables.margin.buttonMargin,
        zIndex: 10,
      }}>
      <Pressable onPress={handleTTS}>
        <TTSIcon width={60} height={60} />
      </Pressable>
    </View>
  );
};
export default OCRAppBar;
