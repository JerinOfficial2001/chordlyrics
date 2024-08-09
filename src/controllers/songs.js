import axios from 'axios';
import {Base_Url} from '../api';
import {ToastAndroid} from 'react-native';

export const getAllSongs = async () => {
  const {data} = await axios.get(Base_Url + '/song/getAllSongs');
  try {
    if (data) {
      if (data.status == 'ok') {
        return data.data;
      } else {
        return [];
      }
    }
  } catch (error) {
    ToastAndroid.show('Getting Songs failed', ToastAndroid.SHORT);
  }
};
export const getKeyboards = async () => {
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
};
export const getLanguages = async key => {
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
};
export const getIndexs = async key => {
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
};
export const getTitles = async index => {
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
};

export const getLyrics = async id => {
  const {data} = await axios.get(Base_Url + '/song/getSong/' + id.queryKey[1]);
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
        return data.data;
      } else {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
        return [];
      }
    }
  } catch (error) {
    ToastAndroid.show('Get mysong failed', ToastAndroid.SHORT);
  }
};

export const getPendingSongs = async formDatas => {
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
        return data.data;
      } else {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
        return [];
      }
    }
  } catch (error) {
    ToastAndroid.show('Get pending song failed', ToastAndroid.SHORT);
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
