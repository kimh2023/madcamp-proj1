import {BlurView} from '@react-native-community/blur';
import React from 'react';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import TrackCover from '@src/components/GalleryComponents/TrackCover';

const {height} = Dimensions.get('window');

const TrackDetailScreen = ({route}: any) => {
  const trackData = route.params.trackInfo;
  const insets = useSafeAreaInsets();
  console.log(trackData);

  return (
    <SafeAreaView style={styles.root}>
      <View style={[StyleSheet.absoluteFill, {marginTop: insets.top}]}>
        {/* Blurred Background Image */}
        <ImageBackground
          source={{uri: trackData.album.images[0].url}}
          style={styles.backgroundImage}
        />
        <BlurView
          style={styles.absolute}
          blurType="chromeMaterialLight"
          blurAmount={3}
          reducedTransparencyFallbackColor="white"
        />

        {/* Content */}
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{trackData.name}</Text>
          </View>
          <View style={styles.controls}>
            <View>
              <TrackCover url={trackData.album.images[0].url} />
            </View>
          </View>
          <View style={styles.metadata}>
            <View>
              <Text style={[styles.song, {width: 175}]}>{trackData.name}</Text>
              <Text style={[styles.artist, {width: 175}]}>
                {trackData.artists[0].name}
              </Text>
              <View />
            </View>
            <View style={styles.container} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: height / 10,
    paddingBottom: 16,
  },
  absolute: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    resizeMode: 'stretch',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  button: {
    padding: 16,
  },
  title: {
    color: 'white',
    padding: 16,
    fontSize: 20, // Adjust as needed
    fontWeight: 'bold', // Adjust as needed
  },
  metadata: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    paddingTop: height / 25,
  },
  song: {
    fontSize: 24, // Adjust as needed
    fontWeight: 'bold',
    color: 'white',
  },
  artist: {
    color: 'white',
    fontSize: 16, // Adjust as needed
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default TrackDetailScreen;
