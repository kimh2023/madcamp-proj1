import {ContactStackParamsList} from '../../../App';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native';

const {width} = Dimensions.get('window');

const TrackCover = ({url}: {url: string}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ContactStackParamsList>>();

  const handlePress = () => {
    navigation.navigate('ImageDetailScreen', {imageUrl: url});
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Image source={{uri: url}} style={styles.cover} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cover: {
    marginVertical: 16,
    width: width - width / 4,
    height: width - width / 4,
    borderRadius: width / 16,
  },
});

export default TrackCover;
