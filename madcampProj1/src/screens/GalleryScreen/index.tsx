import Authenticator from '@src/hooks/Authenticator';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import SearchBar from '@src/components/GalleryComponents/SearchBar';

const GalleryScreen: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string>('');

  const handleAuthSuccess = (token: string) => {
    setAccessToken(token);
  };

  return (
    <View style={styles.container}>
      <Authenticator onAuthSuccess={handleAuthSuccess} />
      <SearchBar accessToken={accessToken} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GalleryScreen;
