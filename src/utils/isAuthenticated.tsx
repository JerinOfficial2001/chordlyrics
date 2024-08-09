import {View, Text} from 'react-native';
import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext<any>(null);
export const useGlobalContext = () => {
  const isAuthenticated = useContext<any>(AuthContext);
  return isAuthenticated;
};
const AuthContextAPI = ({children}: any) => {
  const [cachedData, setcachedData] = useState<any>(null);
  const [currentRoute, setcurrentRoute] = useState('');
  const [isVisible, setisVisible] = useState(false);

  const [showFloatButton, setshowFloatButton] = useState(false);
  useEffect(() => {
    const fetchCachedData = async () => {
      try {
        const res = await AsyncStorage.getItem('chordlyrics_userData');
        setcachedData(res ? JSON.parse(res) : null);
      } catch (error) {
        console.error('Failed to load cached data', error);
      }
    };

    fetchCachedData();
  }, [isVisible, showFloatButton]);

  return (
    <AuthContext.Provider
      value={{
        isVisible,
        setisVisible,
        cachedData,
        setcachedData,
        showFloatButton,
        setshowFloatButton,
        currentRoute,
        setcurrentRoute,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextAPI;
