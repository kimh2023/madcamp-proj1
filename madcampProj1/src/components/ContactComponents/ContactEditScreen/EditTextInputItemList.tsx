import {editItemType} from './EditTextInput';
import {valueListItem} from './EditTextInputGroup';
import EditTextInputItemListEdit from './EditTextInputItemListEdit';
import EditTextInputItemListNew from './EditTextInputItemListNew';
import React from 'react';
import {Text, View} from 'react-native';

import {globalVariables} from '@src/styles/globalVariables';
import style from '@src/styles/style';

function EditTextInputItemList({
  setStartEdit,
  setContactInfo,
  title,
  valueList,
  innerAttribute,
}: {
  setStartEdit: () => void;
  setContactInfo: (changedValue: string | valueListItem[]) => void;
  title: string;
  valueList: valueListItem[];
  innerAttribute?: editItemType['innerAttribute'];
}) {
  return (
    <View
      style={[
        style.containerDefaults,
        {width: '100%', alignItems: 'flex-start'},
      ]}>
      <View
        style={{
          width: 40,
          height: style.input.height,
          justifyContent: 'center',
        }}>
        <Text style={style.h2}>{title}</Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          gap: globalVariables.gap.verticalGap,
        }}>
        {innerAttribute &&
          valueList?.map((value, index) => (
            <React.Fragment key={index}>
              {(innerAttribute in value ? value[innerAttribute] : '').length !==
                0 && (
                <EditTextInputItemListEdit
                  setStartEdit={setStartEdit}
                  setContactInfo={setContactInfo}
                  valueList={valueList}
                  innerAttribute={innerAttribute}
                  initValue={
                    innerAttribute in value ? value[innerAttribute] : ''
                  }
                  id={value.id}
                />
              )}
            </React.Fragment>
          ))}
        {valueList && (
          <EditTextInputItemListNew
            index={valueList.length}
            setStartEdit={setStartEdit}
            setContactInfo={setContactInfo}
            valueList={valueList}
            innerAttribute={innerAttribute}
          />
        )}
      </View>
    </View>
  );
}

export default React.memo(EditTextInputItemList);
