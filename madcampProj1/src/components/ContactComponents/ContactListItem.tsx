import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Pressable, Text, View} from 'react-native';

import {ContactStackParamsList} from '@src/navigation/ContactNavigation';

import ContactIcon from '@src/assets/icons/contact-icon.svg';
import FavoriteFalse from '@src/assets/icons/favorite-false.svg';
import FavoriteTrue from '@src/assets/icons/favorite-true.svg';

import {globalVariables} from '@src/styles/globalVariables';
import style from '@src/styles/style';

type Props = {
  id: string;
  name: string;
  number: number;
  favorite: boolean;
  image?: string;
};

function ContactListItem({id, name, number, favorite, image}: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<ContactStackParamsList>>();
  return (
    <Pressable
      onPress={() => navigation.navigate('ContactDetailsScreen', {userId: id})}
      style={{width: '100%'}}>
      <View
        style={{
          ...style.containerDefaults,
          marginLeft: globalVariables.margin.leftMargin,
          marginRight: globalVariables.margin.leftMargin,
        }}>
        {/* {image?} */}
        <ContactIcon width={50} height={50} />
        <View>
          <View style={{...style.containerDefaults, gap: 5}}>
            <Text style={style.h2}>{name}</Text>
            {favorite ? <FavoriteTrue /> : <FavoriteFalse />}
          </View>
          <Text style={style.h3}>{number}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ContactListItem;
