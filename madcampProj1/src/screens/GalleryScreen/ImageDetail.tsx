import {ContactStackParamsList} from '../../../App';
import {BlurView} from '@react-native-community/blur';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';

import StackHeader from '@src/components/LayoutComponents/StackHeader';

const {width, height} = Dimensions.get('window');

type Props = NativeStackScreenProps<
  ContactStackParamsList,
  'ImageDetailScreen',
  'Stack'
>;

const ImageDetailScreen = ({route, navigation}: Props) => {
  const {imageUrl} = route.params;

  // const handleShare = async () => {
  //   try {
  //     const response = await fetch(imageUrl);
  //     const data = await response.blob();
  //     Share.open({
  //       title: 'Image.jpeg',
  //       url: 'https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg',
  //       failOnCancel: false,
  //     })
  //       .then(() => {
  //         console.log('Image Share successful');
  //       })
  //       .catch(error => {
  //         console.error('Image Share failed:', error);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <View style={styles.container}>
      <StackHeader path={'Back'} />
      {/* <Pressable
        onPress={handleShare}
        style={{
          position: 'absolute',
          top: globalVariables.margin.buttonMargin,
          right: globalVariables.margin.buttonMargin,
          zIndex: 9,
        }}>
        <ShareIcon width={27} height={27} />
      </Pressable> */}

      <ImageBackground
        source={{uri: imageUrl}}
        style={StyleSheet.absoluteFill}
      />
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="xlight"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />

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

export default React.memo(ImageDetailScreen);
