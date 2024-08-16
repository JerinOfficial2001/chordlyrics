import {View, Text, ToastAndroid} from 'react-native';
import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation} from '@tanstack/react-query';
import {deleteSong} from '../controllers/songs';
import {queryClient} from '../App';

const AuthContext = createContext<any>(null);
export const useGlobalContext = () => {
  const isAuthenticated = useContext<any>(AuthContext);
  return isAuthenticated;
};
const AuthContextAPI = ({children}: any) => {
  const [cachedData, setcachedData] = useState<any>(null);
  const [currentRoute, setcurrentRoute] = useState('');
  const [isVisible, setisVisible] = useState(false);
  const [openDeleteModal, setopenDeleteModal] = useState('');
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

  const handleOpenDeleteModal = (id: any) => {
    setopenDeleteModal(id);
  };
  const handleDismiss = () => {
    setopenDeleteModal('');
  };
  const {mutate: deleteHandler, isPending: deletionLoading} = useMutation({
    mutationFn: deleteSong,
    onError: error => {
      console.log(error);

      ToastAndroid.show('Unable to delete', ToastAndroid.SHORT);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['MySongs']});
      queryClient.invalidateQueries({queryKey: ['AllSongs']});
      queryClient.invalidateQueries({queryKey: ['PendingSongs']});
    },
  });
  const handleDelete = (id: any) => {
    handleDismiss();
    deleteHandler(id);
  };
  const deleteSongFunctions = {
    handleDelete,
    handleDismiss,
    handleOpenDeleteModal,
    openDeleteModal,
    deleteHandler,
    deletionLoading,
  };
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
        deleteSongFunctions,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextAPI;
