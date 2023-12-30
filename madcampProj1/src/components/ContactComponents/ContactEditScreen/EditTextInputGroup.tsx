import React from 'react';
import {Dimensions, View} from 'react-native';
import {
  Contact,
  EmailAddress,
  PhoneNumber,
  PostalAddress,
} from 'react-native-contacts';

import {
  editItemType,
  editItems,
} from '@src/components/ContactComponents/ContactEditScreen/EditTextInput';
import EditTextInputItem from '@src/components/ContactComponents/ContactEditScreen/EditTextInputItem';
import EditTextInputItemList from '@src/components/ContactComponents/ContactEditScreen/EditTextInputItemList';

import {globalVariables} from '@src/styles/globalVariables';
import style from '@src/styles/style';

export interface valueListItem
  extends EmailAddress,
    PhoneNumber,
    PostalAddress {}

const EditTextInputGroup = ({
  index,
  editSection,
  setStartEdit,
  setContactInfo,
  contactInfo,
}: {
  index: number;
  editSection: (typeof editItems)[0];
  setStartEdit: () => void;
  setContactInfo: (
    attribute: keyof Contact,
    changedValue: string | valueListItem[],
  ) => void;
  contactInfo: Contact | null;
}) => {
  const width = Dimensions.get('window').width;

  return (
    <React.Fragment>
      {index !== 0 && (
        <View
          key={-index}
          style={[
            style.containerDefaults,
            {
              width: width - 40,
              height: 1,
              backgroundColor: globalVariables.color.blue0,
              marginVertical: 5,
            },
          ]}
        />
      )}
      {editSection?.map(
        (
          {
            title,
            attribute,
            innerAttribute,
          }: {
            title: editItemType['title'];
            attribute: editItemType['attribute'];
            innerAttribute?: editItemType['innerAttribute'];
          },
          innerIndex: number,
        ) => (
          <React.Fragment key={innerIndex}>
            {innerAttribute ? (
              <EditTextInputItemList
                setStartEdit={setStartEdit}
                setContactInfo={(changedValue: string | valueListItem[]) =>
                  setContactInfo(attribute, changedValue)
                }
                title={title}
                valueList={
                  (contactInfo && contactInfo[attribute]
                    ? contactInfo[attribute]
                    : []) as valueListItem[]
                }
                innerAttribute={innerAttribute}
              />
            ) : (
              <EditTextInputItem
                setStartEdit={setStartEdit}
                setContactInfo={(changedValue: string) =>
                  setContactInfo(attribute, changedValue)
                }
                title={title}
                value={
                  contactInfo && contactInfo[attribute]
                    ? (contactInfo[attribute] as string)
                    : undefined
                }
              />
            )}
          </React.Fragment>
        ),
      )}
    </React.Fragment>
  );
};

export default React.memo(EditTextInputGroup);
