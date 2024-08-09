import axios from 'axios';
import {Base_Url} from '../api';
import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

export const getAllSongs = async () => {
  const networkAvailable = await isNetworkAvailable();
  if (networkAvailable) {
    const {data} = await axios.get(Base_Url + '/song/getAllSongs');
    try {
      if (data) {
        if (data.status == 'ok') {
          storeDataLocally(data.data);
          return data.data;
        } else {
          return [];
        }
      }
    } catch (error) {
      ToastAndroid.show('Getting Songs failed', ToastAndroid.SHORT);
    }
  } else {
    const localData = await retrieveDataLocally();
    if (localData) {
      return localData;
    } else {
      return [];
    }
  }
};
export const getKeyboards = async () => {
  const networkAvailable = await isNetworkAvailable();
  if (networkAvailable) {
    const {data} = await axios.get(Base_Url + '/song/getKeyboards');
    try {
      if (data) {
        if (data.status == 'ok') {
          return data.data;
        } else {
          ToastAndroid.show(data.message, ToastAndroid.SHORT);
          return [];
        }
      }
    } catch (error) {
      ToastAndroid.show('Get Keyboards failed', ToastAndroid.SHORT);
    }
  } else {
    const data = await retrieveFilterDatasLocally('keyboard');
    return data;
  }
};
export const getLanguages = async key => {
  const networkAvailable = await isNetworkAvailable();
  if (networkAvailable) {
    const {data} = await axios.get(
      Base_Url + '/song/getlanguages?keyboard=' + key.queryKey[1],
    );
    try {
      if (data) {
        if (data.status == 'ok') {
          return data.data;
        } else {
          ToastAndroid.show(data.message, ToastAndroid.SHORT);
          return [];
        }
      }
    } catch (error) {
      ToastAndroid.show('Get Keyboards failed', ToastAndroid.SHORT);
    }
  } else {
    const data = await retrieveFilterDatasLocally('language', key.queryKey[1]);

    return data;
  }
};
export const getIndexs = async key => {
  const networkAvailable = await isNetworkAvailable();
  if (networkAvailable) {
    const {data} = await axios.get(
      Base_Url + '/song/getIndex?language=' + key.queryKey[1],
    );
    try {
      if (data) {
        if (data.status == 'ok') {
          return data.data;
        } else {
          return [];
        }
      }
    } catch (error) {
      ToastAndroid.show('Getting Index failed', ToastAndroid.SHORT);
    }
  } else {
    const data = await retrieveFilterDatasLocally('index', key.queryKey[1]);
    return data;
  }
};
export const getTitles = async index => {
  const networkAvailable = await isNetworkAvailable();
  if (networkAvailable) {
    const {data} = await axios.get(
      Base_Url + '/song/getSongTitles?index=' + index.queryKey[1],
    );
    try {
      if (data) {
        if (data.status == 'ok') {
          return data.data;
        } else {
          return [];
        }
      }
    } catch (error) {
      ToastAndroid.show('Getting titles failed', ToastAndroid.SHORT);
    }
  } else {
    const data = await retrieveFilterDatasLocally('title', index.queryKey[1]);

    return data;
  }
};

export const getLyrics = async id => {
  const networkAvailable = await isNetworkAvailable();
  if (networkAvailable) {
    const {data} = await axios.get(
      Base_Url + '/song/getSong/' + id.queryKey[1],
    );
    try {
      if (data) {
        if (data.status == 'ok') {
          return data.data;
        } else {
          return [];
        }
      }
    } catch (error) {
      ToastAndroid.show('Get lyrics failed', ToastAndroid.SHORT);
    }
  } else {
    const song = await retrieveDataByIDLocally(id.queryKey[1]);
    return song;
  }
};
export const addSong = async formDatas => {
  const {data} = await axios.post(
    Base_Url + '/song/addSong?userId=' + formDatas.id,
    formDatas.data,
    {
      headers: {
        Authorization: `Bearer ${formDatas.token}`,
      },
    },
  );
  try {
    if (data) {
      if (data.status == 'ok') {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
      }
    }
  } catch (error) {
    ToastAndroid.show('Add song failed', ToastAndroid.SHORT);
  }
};
export const getMySongs = async formDatas => {
  const networkAvailable = await isNetworkAvailable();
  if (networkAvailable) {
    const {data} = await axios.get(
      Base_Url + '/song/getMySongs?userId=' + formDatas.queryKey[1].id,
      {
        headers: {
          Authorization: `Bearer ${formDatas.queryKey[1].token}`,
        },
      },
    );
    try {
      if (data) {
        if (data.status == 'ok') {
          storeRequestDataLocally(data.data);
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
    const localData = await retrieveRequestedDataLocally();
    if (localData) {
      return localData;
    } else {
      return [];
    }
  }
};

export const getPendingSongs = async formDatas => {
  const networkAvailable = await isNetworkAvailable();
  if (networkAvailable) {
    const {data} = await axios.get(
      Base_Url + '/song/getPendingSongs?userId=' + formDatas.queryKey[1].id,
      {
        headers: {
          Authorization: `Bearer ${formDatas.queryKey[1].token}`,
        },
      },
    );
    try {
      if (data) {
        if (data.status == 'ok') {
          storeRequestDataLocally(data.data);
          return data.data;
        } else {
          ToastAndroid.show(data.message, ToastAndroid.SHORT);
          return [];
        }
      }
    } catch (error) {
      ToastAndroid.show('Get pending song failed', ToastAndroid.SHORT);
    }
  } else {
    const localData = await retrieveRequestedDataLocally();
    if (localData) {
      return localData;
    } else {
      return [];
    }
  }
};
export const approveSongs = async formDatas => {
  const {data} = await axios.put(
    Base_Url +
      '/song/approveSong?userId=' +
      formDatas.id +
      '&songId=' +
      formDatas.songId,
    null,
    {
      headers: {
        Authorization: `Bearer ${formDatas.token}`,
      },
    },
  );
  try {
    if (data) {
      if (data.status == 'ok') {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
      }
      return data;
    }
  } catch (error) {
    ToastAndroid.show('approve song failed', ToastAndroid.SHORT);
  }
};
export const updateSong = async formDatas => {
  const {data} = await axios.put(
    Base_Url +
      '/song/updateSong/' +
      formDatas.songId +
      '?userId=' +
      formDatas.id,
    formDatas.data,
    {
      headers: {
        Authorization: `Bearer ${formDatas.token}`,
      },
    },
  );
  try {
    if (data) {
      if (data.status == 'ok') {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
      }
    }
  } catch (error) {
    ToastAndroid.show('Add song failed', ToastAndroid.SHORT);
  }
};

const storeDataLocally = async data => {
  try {
    await AsyncStorage.setItem('chordlyrics_localData', JSON.stringify(data));
  } catch (error) {
    console.error('Error storing data locally:', error);
  }
};
const retrieveDataLocally = async () => {
  try {
    const data = await AsyncStorage.getItem('chordlyrics_localData');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error retrieving data from local storage:', error);
    return null;
  }
};
const storeRequestDataLocally = async data => {
  try {
    await AsyncStorage.setItem(
      'chordlyrics_requestedLocalData',
      JSON.stringify(data),
    );
  } catch (error) {
    console.error('Error storing data locally:', error);
  }
};
const retrieveRequestedDataLocally = async () => {
  try {
    const data = await AsyncStorage.getItem('chordlyrics_requestedLocalData');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error retrieving data from local storage:', error);
    return null;
  }
};
const retrieveDataByIDLocally = async id => {
  try {
    const data = await AsyncStorage.getItem('chordlyrics_localData');
    if (data && data.length > 0) {
      const allSongs = JSON.parse(data);
      const song = allSongs.find(i => i._id == id);
      return song;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error retrieving data from local storage:', error);
    return null;
  }
};
const retrieveFilterDatasLocally = async (key, value) => {
  try {
    const data = await AsyncStorage.getItem('chordlyrics_localData');
    if (data && data.length > 0) {
      const allSongs = JSON.parse(data);
      if (key == 'keyboard') {
        const song = allSongs.map(i => i.keyboardModal);
        return song;
      } else if (key == 'language') {
        const song = [
          ...new Set(
            allSongs.filter(i => i.keyboardModal == value).map(i => i.language),
          ),
        ];
        return song;
      } else if (key == 'index') {
        const songIndexs = allSongs
          .filter(i => i.language == value)
          .map(i => i.title.charAt(0));

        let totalSongs = {};
        songIndexs.forEach(i => {
          if (!totalSongs[i]) {
            totalSongs[i] = songIndexs.filter(elem => elem == i).length;
          }
        });
        const indexes = [...new Set(songIndexs.map(i => i))].map(elem => ({
          title: elem,
          totalSongs: totalSongs[elem],
        }));
        return indexes;
      } else if (key == 'title') {
        return allSongs.filter(i => i.title.charAt(0) == value);
      }
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error retrieving data from local storage:', error);
    return [];
  }
};

export const isNetworkAvailable = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected;
};
