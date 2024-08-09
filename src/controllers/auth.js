import axios from 'axios';
import {Base_Url} from '../api';
import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isNetworkAvailable} from './songs';

export const login = async formData => {
  const networkAvailable = await isNetworkAvailable();
  if (networkAvailable) {
    try {
      const {data} = await axios.post(Base_Url + '/auth/login', formData);
      if (data) {
        if (data.status == 'ok' && data.token) {
          const result = await userData(data.token);
          return result;
        } else {
          ToastAndroid.show(data.message, ToastAndroid.SHORT);
          return data;
        }
      }
    } catch (error) {
      ToastAndroid.show('Login failed', ToastAndroid.SHORT);
    }
  } else {
    ToastAndroid.show('You are offline', ToastAndroid.SHORT);
  }
};
export const register = async formData => {
  try {
    const {data} = await axios.post(Base_Url + '/auth/register', formData);
    if (data) {
      if (data.status == 'ok') {
        const result = await userData(data.token);
        return result;
      } else {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
        return data;
      }
    }
  } catch (error) {
    ToastAndroid.show('Create account failed', ToastAndroid.SHORT);
  }
};
export const userData = async token => {
  try {
    const {data} = await axios.get(Base_Url + '/auth/userData', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      if (data.status == 'ok') {
        AsyncStorage.setItem('chordlyrics_userData', JSON.stringify(data.data));
        ToastAndroid.show('Logged in successfully', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
      }
      return data;
    }
  } catch (error) {
    ToastAndroid.show('Authentication failed', ToastAndroid.SHORT);
  }
};
