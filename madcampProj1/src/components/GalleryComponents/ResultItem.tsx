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

const {width} = Dimensions.get('window');

const CARD_WIDTH = width - 150;
const CARD_HEIGHT = CARD_WIDTH;

interface ResultItemProps {
  onPress: () => void;
  imageUri: string;
  title: string;
}

const ResultItem: React.FC<ResultItemProps> = ({onPress, imageUri, title}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.resultItem}>
        <View style={styles.imageBox}>
          <Image source={{uri: imageUri}} style={styles.image} />
          <Text style={styles.title}>{`${title.substring(0, 20)}...`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  imageBox: {
    overflow: 'hidden',
    alignItems: 'center',
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
