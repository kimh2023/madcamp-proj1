/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import React from 'react';

import ContactScreen from '@src/screens/ContactScreen';
import GalleryScreen from '@src/screens/GalleryScreen';
import MysteryScreen from '@src/screens/MysteryScreen';

import ContactIconFocus from '@src/assets/icons/contact-icon-focus.svg';
import ContactIcon from '@src/assets/icons/contact-icon.svg';
import GalleryIconFocus from '@src/assets/icons/gallery-icon-focus.svg';
import GalleryIcon from '@src/assets/icons/gallery-icon.svg';
import MysteryIconFocus from '@src/assets/icons/mystery-icon-focus.svg';
import MysteryIcon from '@src/assets/icons/mystery-icon.svg';

import {globalVariables} from '@src/styles/globalVariables';
import style from '@src/styles/style';

export type BottomTabParamsList = {
  ContactScreen: undefined;
  GalleryScreen: undefined;
  MysteryScreen: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamsList>();

function MainTabs(): React.JSX.Element {
  const tabIconSize = 32;
  const returnTabBarIcon = (
    route: RouteProp<ParamListBase, string>,
    focused: boolean,
  ) => {
    switch (route.name) {
      case 'ContactScreen':
        return focused ? (
          <ContactIconFocus width={tabIconSize} height={tabIconSize} />
        ) : (
          <ContactIcon width={tabIconSize} height={tabIconSize} />
        );

      case 'GalleryScreen':
        return focused ? (
          <GalleryIconFocus width={tabIconSize} height={tabIconSize} />
        ) : (
          <GalleryIcon width={tabIconSize} height={tabIconSize} />
        );

      default:
        return focused ? (
          <MysteryIconFocus width={tabIconSize} height={tabIconSize} />
        ) : (
          <MysteryIcon width={tabIconSize} height={tabIconSize} />
        );
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => returnTabBarIcon(route, focused),
        tabBarStyle: {
          height: 120,
          paddingTop: 20,
          paddingBottom: 30,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarLabelStyle: style.tabBar,
        tabBarActiveTintColor: globalVariables.color.blue1,
        tabBarInactiveTintColor: globalVariables.color.dark,
        tabBarHideOnKeyboard: true,
        // tabBarVisible: route ? route.state.index <= 0 : true,
        headerStyle: {
          height: 120,
          borderTopWidth: 0,
          elevation: 0,
        },
        headerTitleContainerStyle: {
          marginHorizontal: 0,
        },
        headerTitleStyle: {
          ...style.h1,
          flex: 1,
          textAlignVertical: 'bottom',
          marginBottom: 20,
          marginLeft: globalVariables.margin.horizontalMargin,
        },
      })}>
      <Tab.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{title: '연락처'}}
      />
      <Tab.Screen
        name="GalleryScreen"
        component={GalleryScreen}
        options={{title: '갤러리'}}
      />
      <Tab.Screen
        name="MysteryScreen"
        component={MysteryScreen}
        options={{title: '???'}}
      />
    </Tab.Navigator>
  );
}

export default React.memo(MainTabs);
