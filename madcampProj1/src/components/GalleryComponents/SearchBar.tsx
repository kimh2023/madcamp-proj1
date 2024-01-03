// SearchBar.tsx
import {ContactStackParamsList} from '../../../App';
import BrowseNewReleases from './BrowseNewReleases';
import ResultItem from './ResultItem';
import ResultsList from './ResultList';
import SearchInput from './SearchInput';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import axios from 'axios';
import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import style from '@src/styles/style';

interface Images {
  height: string;
  url: string;
  width: number;
}

interface SearchBarProps {
  accessToken: string;
}

export interface SearchResultItem {
  id: string;
  name: string;
  category: string;
  images: Array<Images>;
}

export interface SearchResultItem_Track {
  id: string;
  name: string;
  category: string;
  album: {
    images: Array<Images>;
  };
}

const SearchBar: React.FC<SearchBarProps> = ({accessToken}) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [albumResults, setAlbumResults] = useState<SearchResultItem[]>([]);
  const [artistResults, setArtistResults] = useState<SearchResultItem[]>([]);
  const [trackResults, setTrackResults] = useState<SearchResultItem_Track[]>(
    [],
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<ContactStackParamsList>>();

  const searchSpotify = async () => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          searchInput,
        )}&type=album,artist,track&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const albums = response.data.albums.items.map((item: any) => ({
        ...item,
        category: 'Album',
      }));
      const artists = response.data.artists.items.map((item: any) => ({
        ...item,
        category: 'Artist',
      }));
      const tracks = response.data.tracks.items.map((item: any) => ({
        ...item,
        category: 'Track',
      }));

      setAlbumResults(albums);
      setArtistResults(artists);
      setTrackResults(tracks);
    } catch (error) {
      console.error('Error searching Spotify:', error);
    }
  };

  const handleResultPress = (
    item: SearchResultItem | SearchResultItem_Track,
  ) => {
    // Navigate to a different page based on the category
    if ('category' in item) {
      if (item.category === 'Album') {
        navigation.navigate('AlbumDetailScreen', {
          albumInfo: item as SearchResultItem,
        });
      } else if (item.category === 'Artist') {
        navigation.navigate('ArtistDetailScreen', {
          artistInfo: item as SearchResultItem,
        });
      } else if (item.category === 'Track') {
        navigation.navigate('TrackDetailScreen', {
          trackInfo: item as SearchResultItem_Track,
        });
      }
    }
  };

  const renderResultItem = ({item}: {item: SearchResultItem}) => {
    return (
      <ResultItem
        onPress={() => handleResultPress(item)}
        imageUri={
          item.images && item.images.length > 0 ? item.images[0].url : ''
        }
        title={item.name}
      />
    );
  };

  const renderResultItem_Track = ({item}: {item: SearchResultItem_Track}) => (
    <ResultItem
      onPress={() => handleResultPress(item)}
      imageUri={
        item.album.images && item.album.images.length > 0
          ? item.album.images[0].url
          : ''
      }
      title={item.name}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchInput
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onSearch={searchSpotify}
        clearSearch={() => {
          setSearchInput('');
          setAlbumResults([]);
          setArtistResults([]);
          setTrackResults([]);
        }}
      />
      <FlatList
        data={[]}
        renderItem={null}
        ListEmptyComponent={
          searchInput.length === 0 ? (
            <BrowseNewReleases />
          ) : (
            <View>
              <Text style={style.h2}>Albums</Text>
              <ResultsList
                data={albumResults}
                keyExtractor={item => item.id}
                renderItem={renderResultItem}
              />

              <Text style={style.h2}>Artists</Text>
              <ResultsList
                data={artistResults}
                keyExtractor={item => item.id}
                renderItem={renderResultItem}
              />

              <Text style={style.h2}>Tracks</Text>
              <ResultsList
                data={trackResults}
                keyExtractor={item => item.id}
                renderItem={renderResultItem_Track}
              />
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#ffffff',
  },
});

export default SearchBar;
