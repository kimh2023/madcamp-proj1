/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import MainTabs from '@src/navigation/MainTabs';

import ContactDetailsScreen from '@src/screens/ContactDetailsScreen';
import ContactEditScreen from '@src/screens/ContactEditScreen';
import AlbumDetailScreen from '@src/screens/GalleryScreen/AlbumDetail';
import ArtistDetailScreen from '@src/screens/GalleryScreen/ArtistDetail';
import ImageDetailScreen from '@src/screens/GalleryScreen/ImageDetail';
import TrackDetailScreen from '@src/screens/GalleryScreen/TrackDetail';

import {
  SearchResultItem,
  SearchResultItem_Track,
} from '@src/components/GalleryComponents/SearchBar';

import {globalVariables} from '@src/styles/globalVariables';

export type ContactStackParamsList = {
  MainTabs: undefined;
  ContactDetailsScreen: {userId: string};
  ContactEditScreen: {userId: string};
  AlbumDetailScreen: {albumInfo: SearchResultItem};
  ArtistDetailScreen: {artistInfo: SearchResultItem};
  TrackDetailScreen: {trackInfo: SearchResultItem_Track};
  ImageDetailScreen: {imageUrl: string};
};

const Stack = createNativeStackNavigator<ContactStackParamsList>();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: globalVariables.color.white,
    text: globalVariables.color.dark,
  },
};

function App(): React.JSX.Element {
  LogBox.ignoreLogs(['new NativeEventEmitter']);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000); // hide splash screen now
  });

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{title: '연락처'}}
        />
        <Stack.Screen
          name="ContactEditScreen"
          component={ContactEditScreen}
          initialParams={{userId: '1'}}
        />
        <Stack.Screen
          name="ContactDetailsScreen"
          component={ContactDetailsScreen}
          initialParams={{userId: '1'}}
        />
        <Stack.Screen
          name="ArtistDetailScreen"
          component={ArtistDetailScreen}
        />
        <Stack.Screen name="AlbumDetailScreen" component={AlbumDetailScreen} />
        <Stack.Screen name="TrackDetailScreen" component={TrackDetailScreen} />
        <Stack.Screen
          name="ImageDetailScreen"
          component={ImageDetailScreen}
          initialParams={{imageUrl: '1'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default React.memo(App);
