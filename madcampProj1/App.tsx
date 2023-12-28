/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  // SafeAreaView,
  // ScrollView,
  // StatusBar,
  StyleSheet,
  // Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  Colors,
  // DebugInstructions,
  // Header,
  // LearnMoreLinks,
  // ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import ContactScreen from './src/screens/GalleryScreen';
import GalleryScreen from './src/screens/ContactScreen';
import MysteryScreen from './src/screens/MysteryScreen';

import ContactIcon from './src/assets/icons/contact-icon.svg';
import ContactIconFocus from './src/assets/icons/contact-icon-focus.svg';
import GalleryIcon from './src/assets/icons/gallery-icon.svg';
import GalleryIconFocus from './src/assets/icons/gallery-icon-focus.svg';
import MysteryIcon from './src/assets/icons/mystery-icon.svg';
import MysteryIconFocus from './src/assets/icons/mystery-icon-focus.svg';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            switch (route.name) {
              case '연락처':
                if (focused) {
                  return <ContactIconFocus width={40} height={40} />;
                } else {
                  return <ContactIcon width={40} height={40} />;
                }
              case '갤러리':
                if (focused) {
                  return <GalleryIconFocus width={40} height={40} />;
                } else {
                  return <GalleryIcon width={40} height={40} />;
                }
              default:
                if (focused) {
                  return <MysteryIconFocus width={40} height={40} />;
                } else {
                  return <MysteryIcon width={40} height={40} />;
                }
            }
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="연락처" component={ContactScreen} />
        <Tab.Screen name="갤러리" component={GalleryScreen} />
        <Tab.Screen name="???" component={MysteryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
