import React from 'react';
import {View} from 'react-native';
import {
  Contact,
  EmailAddress,
  PhoneNumber,
  PostalAddress,
} from 'react-native-contacts';

import EditTextInputGroup, {
  valueListItem,
} from '@src/components/ContactComponents/ContactEditScreen/EditTextInputGroup';

import {globalVariables} from '@src/styles/globalVariables';
import style from '@src/styles/style';

export interface editItemType {
  title: string;
  attribute: keyof Contact;
  innerAttribute?: keyof EmailAddress | keyof PhoneNumber | keyof PostalAddress;
}

export const editItems: editItemType[][] = [
  [
    {
      title: '성',
      attribute: 'familyName',
    },
    {
      title: '이름',
      attribute: 'givenName',
    },
  ],
  [
    {
      title: '전화',
      attribute: 'phoneNumbers',
      innerAttribute: 'number',
    },
  ],
  [
    {
      title: '이메일',
      attribute: 'emailAddresses',
      innerAttribute: 'email',
    },
  ],
  [
    {
      title: '소속',
      attribute: 'company',
    },
  ],
  //   [
  //     {
  //       title: '주소',
  //       attribute: 'company',
  //     },
  //   ],
];

function EditTextInput({
  setStartEdit,
  setContactInfo,
  contactInfo,
}: {
  setStartEdit: () => void;
  setContactInfo: (
    attribute: keyof Contact,
    changedValue: string | valueListItem[],
  ) => void;
  contactInfo: Contact | null;
}) {
  return (
    <View
      style={[
        style.containerDefaults,
        {
          flex: 1,
          flexDirection: 'column',
          paddingHorizontal: globalVariables.margin.leftMargin,
          paddingVertical: 30,
        },
      ]}>
      {editItems.map((editSection, index) => (
        <EditTextInputGroup
          key={index}
          index={index}
          editSection={editSection}
          setStartEdit={setStartEdit}
          setContactInfo={setContactInfo}
          contactInfo={contactInfo}
        />
      ))}
    </View>
  );
}

export default React.memo(EditTextInput);
