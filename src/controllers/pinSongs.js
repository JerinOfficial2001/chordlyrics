import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastAndroid} from 'react-native';
import {isNetworkAvailable} from './songs';
import {Base_Url} from '../api';
import axios from 'axios';
import {queryClient} from '../App';

export const getPinnedOfflineSongs = async () => {
  const networkAvailable = await isNetworkAvailable();
  const cachedData = await AsyncStorage.getItem('chordlyrics_userData');
  const userData = cachedData ? JSON.parse(cachedData) : false;

  if (userData && networkAvailable) {
    try {
      const {data} = await axios.get(
        Base_Url + '/song/getPinnedSongs?userId=' + userData._id,
        {
          headers: {
            Authorization: `Bearer ${userData.accessToken}`,
          },
        },
      );
      if (data) {
        if (data.status == 'ok') {
          AsyncStorage.setItem(
            'chordlyrics_pinned_songs',
            JSON.stringify(data.data),
          );
          return data.data;
        } else {
          ToastAndroid.show(data.message, ToastAndroid.SHORT);
          return [];
        }
      }
    } catch (error) {
      ToastAndroid.show('Get mysong failed', ToastAndroid.SHORT);
    }
  } else {
    const result = await AsyncStorage.getItem('chordlyrics_pinned_songs');
    if (result) {
      return JSON.parse(result);
    } else {
      return [];
    }
  }
};
export const pinSongsOffline = async (id, song, state) => {
  try {
    const data = await AsyncStorage.getItem('chordlyrics_localData');
    if (data && data.length > 0) {
      const allSongs = JSON.parse(data);
      const index = allSongs.findIndex(i => i._id == id);

      if (index !== -1) {
        allSongs[index].isPinned = state;
        JSON.stringify(allSongs),
          await AsyncStorage.setItem(
            'chordlyrics_localData',
            JSON.stringify(allSongs),
          );
      }
      const pinnedSongs = allSongs.filter(elem => elem.isPinned == true);
      await AsyncStorage.setItem(
        'chordlyrics_pinned_songs',
        JSON.stringify(pinnedSongs),
      );
      queryClient.invalidateQueries({queryKey: ['SongIndexs']});
      queryClient.invalidateQueries({queryKey: ['MySongs']});
      queryClient.invalidateQueries({queryKey: ['SongLyrics']});
    }
  } catch (error) {
    console.error('Error in pinSongsOffline:', error);
    ToastAndroid.show('An error occurred', ToastAndroid.SHORT);
  }
};
