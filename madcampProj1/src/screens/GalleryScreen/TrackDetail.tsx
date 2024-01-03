import {BlurView} from '@react-native-community/blur';
import React, {useEffect, useMemo} from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Sound from 'react-native-sound';

import TrackCover from '@src/components/GalleryComponents/TrackCover';
import StackHeader from '@src/components/LayoutComponents/StackHeader';

import {globalVariables} from '@src/styles/globalVariables';
import style from '@src/styles/style';

const {height} = Dimensions.get('window');

const TrackDetailScreen = ({route}: any) => {
  const trackData = route.params.trackInfo;
  const track = useMemo(
    () =>
      new Sound(trackData.preview_url, '', e => {
        if (e) {
          console.log('error loading track:', e);
        } else {
          track.play();
        }
      }),
    [trackData.preview_url],
  );

  useEffect(() => {
    track.setVolume(1);
    track.play();
    return () => {
      track.release();
    };
  }, [track]);
  const play = () => {
    track.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };

  return (
    <View style={[StyleSheet.absoluteFill]}>
      <StackHeader path={'MainTabs'} />
      {/* Blurred Background Image */}
      <ImageBackground
        source={{uri: trackData.album.images[0].url}}
        style={StyleSheet.absoluteFill}
      />
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="xlight"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />

      {/* Content */}
      <View style={styles.container}>
        <TrackCover url={trackData.album.images[0].url} />
        <Text style={[style.h1]}>{trackData.name}</Text>
        <Text style={[style.h2, {color: globalVariables.color.blue1}]}>
          {trackData.artists[0].name}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
  },
  textColor: {color: globalVariables.color.white},
  backgroundImage: {
    resizeMode: 'stretch',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  button: {
    padding: 16,
  },
  song: {
    color: 'white',
  },
  artist: {
    color: globalVariables.color.blue1,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default React.memo(TrackDetailScreen);
