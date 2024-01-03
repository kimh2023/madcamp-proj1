// ResultItem.tsx
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import style from '@src/styles/style';

const {width} = Dimensions.get('window');

const CARD_WIDTH = width - 200;
const CARD_HEIGHT = CARD_WIDTH;

interface ResultItemProps {
  onPress: () => void;
  imageUri: string;
  title: string;
}

const ResultItem: React.FC<ResultItemProps> = ({onPress, imageUri, title}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.imageBox}>
        <Image
          source={{
            uri: imageUri
              ? imageUri
              : 'https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg',
          }}
          style={styles.image}
        />
        <Text style={style.h3}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageBox: {
    alignItems: 'center',
    display: 'flex',
    width: CARD_WIDTH,
    margin: 10,
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    resizeMode: 'cover',
    borderRadius: 14,
  },
  title: {
    padding: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default ResultItem;
