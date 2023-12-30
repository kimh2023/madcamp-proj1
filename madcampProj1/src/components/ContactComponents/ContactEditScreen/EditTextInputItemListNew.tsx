import {editItemType} from './EditTextInput';
import {valueListItem} from './EditTextInputGroup';
import React, {useRef, useState} from 'react';
import {Pressable, TextInput, View} from 'react-native';

import PlusButton from '@src/assets/icons/icon-plus.svg';

import {globalVariables} from '@src/styles/globalVariables';
import style from '@src/styles/style';

const returnObject = (
  value: string,
  innerAttribute?: editItemType['innerAttribute'],
) => {
  switch (innerAttribute) {
    case 'number':
      return {label: 'mobile', number: value} as valueListItem;
    case 'email':
      return {label: 'home', email: value} as valueListItem;
    default:
      return {label: 'mobile', number: value} as valueListItem;
  }
};

function EditTextInputItemListNew({
  setStartEdit,
  setContactInfo,
  valueList,
  innerAttribute,
}: {
  setStartEdit: () => void;
  setContactInfo: (changedValue: string | valueListItem[]) => void;
  valueList: valueListItem[];
  innerAttribute?: editItemType['innerAttribute'];
}) {
  const textInputRef = useRef<TextInput>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');
  const handleTextChange = (text: string) => {
    setValue(text);
  };
  const handleTextChangeStart = () => {
    setStartEdit();
    setIsEditing(true);
    textInputRef.current?.focus();
  };
  const handleTextChangeEnd = () => {
    if (value.length !== 0) {
      const newItem = returnObject(value, innerAttribute);
      setContactInfo([...valueList, newItem]);
      setValue('');
    }
    setIsEditing(false);
  };
  return (
    <View
      style={{
        flexDirection: 'column',
        gap: -style.input.height,
        paddingRight: 10 + 40,
      }}>
      <TextInput
        ref={textInputRef}
        style={[style.input, style.h2]}
        value={value}
        onChangeText={text => handleTextChange(text)}
        onBlur={handleTextChangeEnd}
      />
      {!isEditing && (
        <Pressable
          onPress={handleTextChangeStart}
          style={[
            style.containerDefaults,
            style.input,
            {backgroundColor: globalVariables.color.blue0, borderWidth: 0},
          ]}>
          <PlusButton width={12} height={12} />
        </Pressable>
      )}
    </View>
  );
}

export default React.memo(EditTextInputItemListNew);
