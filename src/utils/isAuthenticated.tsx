import {View, Text} from 'react-native';
import React, {createContext, useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext<any>(null);
export const useGlobalContext = () => {
  const isAuthenticated = useContext<any>(AuthContext);
  return isAuthenticated;
};
const AuthContextAPI = ({children}: any) => {
  const [cachedData, setcachedData] = useState<any>(null);
  const [showFloatButton, setshowFloatButton] = useState(true);
  AsyncStorage.getItem('chordlyrics_cookies').then((res: any) =>
    setcachedData(res ? JSON.parse(res) : false),
  );
  const isAuthenticated: Boolean = cachedData ? true : false;
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        cachedData,
        setcachedData,
        showFloatButton,
        setshowFloatButton,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextAPI;
