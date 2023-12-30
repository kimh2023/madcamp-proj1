import EditTextInputItem from './EditTextInputItem';
import React from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import {Contact} from 'react-native-contacts';

import {globalVariables} from '@src/styles/globalVariables';
import style from '@src/styles/style';

const editItems: {title: string; attribute: keyof Contact}[][] = [
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
      title: '성',
      attribute: 'familyName',
    },
    {
      title: '이름',
      attribute: 'givenName',
    },
  ],
];

const EditTextInputGroup = (
  editSection: (typeof editItems)[0],
  setStartEdit: () => void,
  setContactInfo: (attribute: keyof Contact, changedValue: string) => void,
  contactInfo: Contact | null,
) => {
  const width = Dimensions.get('window').width;

  return (
    <React.Fragment>
      {editSection.map(
        (
          {title, attribute}: {title: string; attribute: keyof Contact},
          innerIndex: number,
        ) => (
          <EditTextInputItem
            key={innerIndex}
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
        ),
      )}
      <View
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
    </React.Fragment>
  );
};

function EditTextInput({
  setStartEdit,
  setContactInfo,
  contactInfo,
}: {
  setStartEdit: () => void;
  setContactInfo: (attribute: keyof Contact, changedValue: string) => void;
  contactInfo: Contact | null;
}) {
  return (
    <FlatList
      contentContainerStyle={[
        // style.containerDefaults,
        {
          //   flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          paddingHorizontal: globalVariables.margin.leftMargin,
          paddingVertical: 30,
          width: '100%',
          //   left: 0,
          //   overflow: 'scroll',
        },
      ]}
      //   style={[
      //     // style.containerDefaults,
      //     {
      //       flex: 1,
      //       flexDirection: 'column',
      //       //   justifyContent: 'flex-start',
      //       paddingHorizontal: globalVariables.margin.leftMargin,
      //       paddingVertical: 30,
      //       //   overflow: 'scroll',
      //     },
      //   ]}
      data={editItems}
      renderItem={({item, index}) =>
        EditTextInputGroup(item, setStartEdit, setContactInfo, contactInfo)
      }
    />
    //   {editItems.map((editSection, index) => (
    //     <React.Fragment key={index}>
    //       {editSection.map(
    //         (
    //           {title, attribute}: {title: string; attribute: keyof Contact},
    //           innerIndex: number,
    //         ) => (
    //           <EditTextInputItem
    //             key={innerIndex}
    //             setStartEdit={setStartEdit}
    //             setContactInfo={(changedValue: string) =>
    //               setContactInfo(attribute, changedValue)
    //             }
    //             title={title}
    //             value={
    //               contactInfo && contactInfo[attribute]
    //                 ? (contactInfo[attribute] as string)
    //                 : undefined
    //             }
    //           />
    //         ),
    //       )}
    //       <View
    //         style={[
    //           style.containerDefaults,
    //           {
    //             width: width - 40,
    //             height: 1,
    //             backgroundColor: globalVariables.color.blue0,
    //             marginVertical: 5,
    //           },
    //         ]}
    //       />
    //     </React.Fragment>
    //   ))}
  );
}

export default EditTextInput;
