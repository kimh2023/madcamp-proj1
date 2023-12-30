import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ContactStackParamsList} from '@src/../App';
import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';

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
        style={[
          style.containerDefaults,
          {
            marginHorizontal: globalVariables.margin.horizontalMargin,
            justifyContent: 'flex-start',
          },
        ]}>
        {image ? (
          <View
            style={[
              style.containerDefaults,
              {
                borderRadius: 400,
                overflow: 'hidden',
                // borderColor: 'green',
                // borderWidth: 1,
              },
            ]}>
            <Image
              source={{uri: image}}
              style={{
                height: 40,
                width: 40,
              }}
            />
          </View>
        ) : (
          <ContactIcon width={40} height={40} />
        )}
        <View>
          <View
            style={[
              style.containerDefaults,
              {gap: 5, justifyContent: 'flex-start'},
            ]}>
            <Text style={style.h2}>{name}</Text>
            {favorite ? (
              <FavoriteTrue width={15} height={15} />
            ) : (
              <FavoriteFalse width={15} height={15} />
            )}
          </View>
          <Text style={style.h3}>{number}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ContactListItem;
