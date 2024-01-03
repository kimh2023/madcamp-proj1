import React from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const {height} = Dimensions.get('window');

interface CustomedButtonProps {
  onPress: () => void;
}

const CustomedButton = ({
  onPress,
}: {
  onPress: (event: GestureResponderEvent) => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress} // Use the onPress prop directly
      style={styles.buttonContainer}>
      <Text style={styles.buttonText}>Search</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: height / 10,
  },
  buttonContainer: {
    marginVertical: 20,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textTransform: 'uppercase',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContainer: {
    height: 100,
    width: '100%',
    flexDirection: 'row',
    padding: 5,
  },
  image: {
    height: '100%',
    flex: 0.35,
  },
  content: {
    flex: 0.65,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default CustomedButton;
