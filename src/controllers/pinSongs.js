import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastAndroid} from 'react-native';

export const getPinnedOfflineSongs = async () => {
  const result = await AsyncStorage.getItem('chordlyrics_pinned_songs');
  if (result) {
    return JSON.parse(result);
  } else {
    return [];
  }
};
export const pinSongsOffline = async (id, song) => {
  const Songs = await AsyncStorage.getItem('chordlyrics_pinned_songs');
  if (Songs) {
    const prevSongs = JSON.parse(Songs);
    if (prevSongs.some(i => (i._id = id))) {
      const remainingSongs = prevSongs.filter(i => i._id != id);
      AsyncStorage.setItem(
        'chordlyrics_pinned_songs',
        JSON.stringify(remainingSongs),
      );
      ToastAndroid.show('Song unpinned ', ToastAndroid.SHORT);
    } else {
      song.isPinned = true;
      prevSongs.push(song);
      AsyncStorage.setItem(
        'chordlyrics_pinned_songs',
        JSON.stringify(prevSongs),
      );
      ToastAndroid.show('Song pinned ', ToastAndroid.SHORT);
    }
  } else {
    song.isPinned = true;
    AsyncStorage.setItem('chordlyrics_pinned_songs', JSON.stringify([song]));
    ToastAndroid.show('Song pinned', ToastAndroid.SHORT);
  }
};
export const isPinnedOffline = async id => {
  const Songs = await AsyncStorage.getItem('chordlyrics_pinned_songs');
  if (Songs) {
    const prevSongs = JSON.parse(Songs);
    if (prevSongs.some(i => (i._id = id))) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
