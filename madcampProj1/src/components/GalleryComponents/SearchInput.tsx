// SearchInput.tsx
import CustomedButton from './CustomedButton';
import React from 'react';
import {Dimensions, StyleSheet, TextInput, View} from 'react-native';

interface SearchInputProps {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchInput,
  setSearchInput,
  onSearch,
}) => {
  return (
    <View style={styles.header}>
      <TextInput
        style={styles.input}
        placeholder="Search For Album, Artist, or Track"
        onChangeText={text => setSearchInput(text)}
        value={searchInput}
        returnKeyType="done"
        placeholderTextColor="#FFFFFF"
        selectionColor="#1FDF64"
      />
      <CustomedButton onPress={onSearch} />
    </View>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  input: {
    width: (width / 8) * 5,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 10,
    color: '#ffffff',
  },
});

export default SearchInput;
