/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  DefaultTheme,
  NavigationContainer,
  ParamListBase,
  RouteProp,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import React from 'react';

import ContactNavigation from '@src/navigation/ContactNavigation';

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
  ContactNavigation: undefined;
  GalleryScreen: undefined;
  MysteryScreen: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamsList>();
const hiddenTabRoutes = ['ContactDetailsScreen', 'ContactEditScreen'];

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: globalVariables.color.white,
  },
};

function App(): React.JSX.Element {
  const returnTabBarIcon = (
    route: RouteProp<ParamListBase, string>,
    focused: boolean,
  ) => {
    switch (route.name) {
      case 'ContactNavigation':
        return focused ? (
          <ContactIconFocus width={40} height={40} />
        ) : (
          <ContactIcon width={40} height={40} />
        );

      case 'GalleryScreen':
        return focused ? (
          <GalleryIconFocus width={40} height={40} />
        ) : (
          <GalleryIcon width={40} height={40} />
        );

      default:
        return focused ? (
          <MysteryIconFocus width={40} height={40} />
        ) : (
          <MysteryIcon width={40} height={40} />
        );
    }
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => returnTabBarIcon(route, focused),
          tabBarStyle: {
            height: 120,
            paddingTop: 20,
            paddingBottom: 40,
            borderTopWidth: 0,
            elevation: 0,
            display: hiddenTabRoutes.includes(
              getFocusedRouteNameFromRoute(route) as string,
            )
              ? 'none'
              : 'flex',
          },
          tabBarLabelStyle: style.tabBar,
          tabBarActiveTintColor: globalVariables.color.blue1,
          tabBarInactiveTintColor: globalVariables.color.dark,
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
            marginLeft: globalVariables.margin.leftMargin,
          },
        })}>
        <Tab.Screen
          name="ContactNavigation"
          component={ContactNavigation}
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
    </NavigationContainer>
  );
}

export default App;
