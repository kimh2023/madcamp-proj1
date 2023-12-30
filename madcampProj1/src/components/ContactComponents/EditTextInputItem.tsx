import React from 'react';
import {Text, TextInput, View} from 'react-native';

import style from '@src/styles/style';

function EditTextInputItem({
  setStartEdit,
  setContactInfo,
  title,
  value,
}: {
  setStartEdit: () => void;
  setContactInfo: (changedValue: string) => void;
  title: string;
  value: string | undefined;
}) {
  const handleTextChange = (text: string) => {
    setStartEdit();
    setContactInfo(text);
  };
  return (
    <View style={[style.containerDefaults, {width: '100%'}]}>
      <View style={{width: 40}}>
        <Text style={style.h2}>{title}</Text>
      </View>
      <TextInput
        style={[style.input, style.h2]}
        value={value}
        onChangeText={text => handleTextChange(text)}
        // fontFamily={}
        // theme={{fonts: {regular: style.h1.fontFamily}}}
      />
    </View>
  );
}

export default EditTextInputItem;
