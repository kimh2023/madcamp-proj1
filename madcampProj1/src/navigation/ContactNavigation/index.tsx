import {BottomTabParamsList} from '../../../App';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {LogBox} from 'react-native';

import ContactDetailsScreen from '@src/screens/ContactDetailsScreen';
import ContactEditScreen from '@src/screens/ContactEditScreen';
import ContactScreen from '@src/screens/ContactScreen';

import style from '@src/styles/style';

export type ContactStackParamsList = {
  ContactScreen: undefined;
  ContactDetailsScreen: {userId: string};
  ContactEditScreen: {userId: string};
};

const Stack = createNativeStackNavigator<ContactStackParamsList>();

type Props = BottomTabScreenProps<
  BottomTabParamsList,
  'ContactNavigation',
  'Tab'
>;

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

function ContactNavigation({route, navigation}: Props) {
  return (
    <Stack.Navigator
      screenOptions={{
        // hea,
        // headerStyle: {height: 120, borderTopWidth: 0, elevation: 0},
        // headerTitleContainerStyle: {
        //   marginHorizontal: 0,
        // },
        headerTitleStyle: {
          ...style.h1,
          // flex: 1,
          // textAlignVertical: 'bottom',
          // marginBottom: 20,
          // marginLeft: globalVariables.margin.leftMargin,
        },
      }}>
      <Stack.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{title: '연락처', headerShown: false}}
      />
      <Stack.Screen
        name="ContactDetailsScreen"
        component={ContactDetailsScreen}
        initialParams={{userId: '1'}}
      />
      <Stack.Screen
        name="ContactEditScreen"
        component={ContactEditScreen}
        initialParams={{userId: '1'}}
      />
    </Stack.Navigator>
  );
}

export default ContactNavigation;
