// SearchInput.tsx
import React from 'react';
import {Keyboard, Pressable, TextInput, View} from 'react-native';

import CloseIcon from '@src/assets/icons/icon-close.svg';
import SearchIcon from '@src/assets/icons/icon-search.svg';

import {globalVariables} from '@src/styles/globalVariables';
import style from '@src/styles/style';

interface SearchInputProps {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
  clearSearch: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchInput,
  setSearchInput,
  onSearch,
  clearSearch,
}) => {
  return (
    <View
      style={[
        style.input,
        style.containerDefaults,
        {
          flex: 0,
          marginHorizontal: globalVariables.margin.horizontalMargin,
          paddingHorizontal: 0,
          paddingVertical: 0,
          paddingRight: 20,
          marginBottom: 20,
        },
      ]}>
      <TextInput
        style={[style.input, style.h3, {borderWidth: 0}]}
        value={searchInput}
        onChangeText={text => setSearchInput(text)}
        onSubmitEditing={onSearch}
      />
      {searchInput.length === 0 ? (
        <SearchIcon width={16} height={style.input.height} />
      ) : (
        <Pressable
          onPress={() => {
            clearSearch();
            Keyboard.dismiss();
          }}>
          <CloseIcon width={12} height={style.input.height} />
        </Pressable>
      )}
    </View>
  );
};

export default SearchInput;
