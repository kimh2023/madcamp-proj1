import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';

import {ContactStackParamsList} from '@src/navigation/ContactNavigation';

type Props = NativeStackScreenProps<
  ContactStackParamsList,
  'ContactDetailsScreen',
  'Stack'
>;

function ContactDetailsScreen({route, navigation}: Props) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{route.params.userId}</Text>
    </View>
  );
}

export default ContactDetailsScreen;
