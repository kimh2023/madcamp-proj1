import {ContactStackParamsList} from '../../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';

const {width, height} = Dimensions.get('window');

type Props = NativeStackScreenProps<
  ContactStackParamsList,
  'ImageDetailScreen',
  'Stack'
>;

const ImageDetailScreen = ({route, navigation}: Props) => {
  const {imageUrl} = route.params;

  return (
    <View style={styles.container}>
      <Image source={{uri: imageUrl}} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: width,
  },
});

export default ImageDetailScreen;
