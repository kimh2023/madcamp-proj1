import axios from 'axios';
import {encode} from 'base-64';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';

import {globalVariables} from '@src/styles/globalVariables';
import style from '@src/styles/style';

const BrowseNewReleases = () => {
  const [accessToken, setAccessToken] = useState('');
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    // Replace 'YOUR_CLIENT_ID' and 'YOUR_CLIENT_SECRET' with your actual Spotify API credentials
    const CLIENT_ID = 'c3f9e197d28e4bbd8d4d123637ece125';
    const CLIENT_SECRET = '7ded5ca252a74134a48a7cdf32453d03';

    // Spotify API endpoint to get access token
    const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

    // Spotify API endpoint to browse new releases
    const BROWSE_NEW_RELEASES_ENDPOINT =
      'https://api.spotify.com/v1/browse/new-releases';

    // Base64-encoded string of 'YOUR_CLIENT_ID:YOUR_CLIENT_SECRET'
    const base64Credentials = encode(`${CLIENT_ID}:${CLIENT_SECRET}`);

    // Request body for getting access token
    const authParameters = {
      grant_type: 'client_credentials',
    };

    // Headers for getting access token
    const authHeaders = {
      Authorization: `Basic ${base64Credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    // Make a POST request to get the access token
    axios
      .post(TOKEN_ENDPOINT, null, {
        params: authParameters,
        headers: authHeaders,
      })
      .then(response => {
        const token = response.data.access_token;
        setAccessToken(token);

        // Make a GET request to browse new releases with the access token
        axios
          .get(BROWSE_NEW_RELEASES_ENDPOINT, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(response => {
            const releases = response.data.albums.items;
            setNewReleases(releases);
          })
          .catch(error => {
            console.error('Error browsing new releases:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching access token:', error);
      });
  }, []);

  const renderReleaseItem = ({item}: {item: any}) => (
    // <TouchableOpacity onPress={() => handleReleasePress(item)}>
    <View style={styles.listContainer}>
      <Image source={{uri: item.images[0].url}} style={styles.image} />
      <Text style={[style.h2, styles.Title]}>{item.name}</Text>
      <Text style={[style.h3, styles.littleTitle]}>{item.artists[0].name}</Text>
    </View>
    // </TouchableOpacity>
  );

  return (
    <View style={styles.Container}>
      <Text style={[style.h2, styles.categoryTitle]}>New Releases</Text>
      <FlatList
        data={newReleases}
        keyExtractor={item => item.id}
        renderItem={renderReleaseItem}
        style={{flex: 1}}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#181818',
    padding: globalVariables.margin.horizontalMargin,
  },
  listContainer: {
    flex: 1,
    display: 'flex',
    paddingHorizontal: 10,
    borderRadius: 10,
    gap: 8,
  },
  imageContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 0,
    paddingBottom: '100%',
    resizeMode: 'cover',
    borderRadius: 14,
  },
  Title: {
    color: '#ffffff',
  },
  littleTitle: {
    marginVertical: -5,
    color: '#ffffff',
  },
  categoryTitle: {
    marginVertical: 10,
    color: '#ffffff',
  },
});

export default BrowseNewReleases;
