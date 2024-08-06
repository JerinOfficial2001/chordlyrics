import axios from 'axios';
import {Base_Url} from '../api';

export const getIndexs = async language => {
  const {data} = await axios.get(Base_Url + '/song/getIndex?language=English');
  try {
    if (data) {
      if (data.status == 'ok') {
        return data.data;
      } else {
        return [];
      }
    }
  } catch (error) {
    throw error;
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
    throw error;
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
    throw error;
  }
};
