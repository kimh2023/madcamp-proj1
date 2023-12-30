import {editItemType} from './EditTextInput';
import {valueListItem} from './EditTextInputGroup';
import React, {useState} from 'react';
import {Pressable, TextInput, View} from 'react-native';

import MinusButton from '@src/assets/icons/icon-minus.svg';

import {globalVariables} from '@src/styles/globalVariables';
import style from '@src/styles/style';

function EditTextInputItemListEdit({
  setStartEdit,
  setContactInfo,
  valueList,
  innerAttribute,
  initValue,
  id,
}: {
  setStartEdit: () => void;
  setContactInfo: (changedValue: string | valueListItem[]) => void;
  valueList: valueListItem[];
  innerAttribute?: editItemType['innerAttribute'];
  initValue: string;
  id: string;
}) {
  const [value, setValue] = useState(initValue);
  const handleTextChange = (text: string) => {
    setStartEdit();
    setValue(text);
  };
  const handleTextChangeEnd = () => {
    const updatedList = valueList.map(item =>
      item.id === id
        ? {
            ...item,
            [innerAttribute as string]: value,
          }
        : item,
    );
    // console.log(updatedList);
    setContactInfo(updatedList);
  };
  const handleRemoveTextInputItemList = () => {
    const updatedList = valueList.map(item =>
      item.id === id
        ? {
            ...item,
            [innerAttribute as string]: '',
          }
        : item,
    );
    console.log(updatedList);
    setContactInfo(updatedList);
  };
  return (
    <View style={{flexDirection: 'row', gap: 10}}>
      <TextInput
        style={[style.input, style.h2, {flex: 1}]}
        value={value}
        onChangeText={text => handleTextChange(text)}
        onBlur={handleTextChangeEnd}
      />
      <Pressable
        onPress={handleRemoveTextInputItemList}
        style={[
          style.containerDefaults,
          {
            width: 40,
            backgroundColor: globalVariables.color.blue0,
            borderRadius: 50,
          },
        ]}>
        <MinusButton width={15} height={15} />
      </Pressable>
    </View>
  );
}

export default React.memo(EditTextInputItemListEdit);
