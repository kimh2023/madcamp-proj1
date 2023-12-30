import ContactListItem from './ContactListItem';
import React from 'react';
import {Dimensions, View} from 'react-native';
import {Contact} from 'react-native-contacts';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';

import style from '@src/styles/style';

function ContactList({dataRows}: {dataRows: Contact[]}) {
  let width = Math.round(Dimensions.get('window').width * 1000) / 1000;
  let dataProvider = new DataProvider((r1, r2) => {
    return r1 !== r2;
  });
  let layoutProvider = new LayoutProvider(
    //   index => {
    () => {
      return 0;
    },
    (type, dim) => {
      dim.width = width > 0 ? width : 100;
      dim.height = 75;
    },
  );
  let rowRenderer = (type: string | number, data: any, index: number) => {
    return (
      <ContactListItem
        id={data.rawContactId}
        name={data.givenName}
        number={data.phoneNumbers[0]?.number}
        favorite={data.isStarred}
        image={data.thumbnailPath}
      />
    );
  };

  return (
    <View style={[style.screenDefaults, {minHeight: 1, minWidth: 1}]}>
      <RecyclerListView
        dataProvider={dataProvider.cloneWithRows(dataRows)}
        layoutProvider={layoutProvider}
        rowRenderer={rowRenderer}
        //   data={data}
        //   renderItem={({item}: {item: Contact}) => (
        //     <ContactListItem
        //       //   id={item.rawContactId}
        //       name={item.givenName}
        //       id={item.recordID}
        //       number={0}
        //       favorite={item.isStarred}
        //       image={item.thumbnailPath}
        //     />
        //   )}
      />
    </View>
  );
}

export default ContactList;
