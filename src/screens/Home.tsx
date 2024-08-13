// src/screens/Home.tsx
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {Menu, ActivityIndicator, Avatar, Searchbar} from 'react-native-paper';
import TopNavigation from '../navigation/TabNavigation';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useGlobalContext} from '../utils/isAuthenticated';
import AuthModal from '../components/Modals/AuthModal';
import {useFocusEffect} from '@react-navigation/native';
import TextField from '../components/TextField';
import SurfaceLayout from '../layouts/SurfaceLayout';
import Loader from '../components/Loader';
import SongCard from '../components/SongCard';
import {useQuery} from '@tanstack/react-query';
import {getAllSongs, retrieveSearchDataLocally} from '../controllers/songs';

interface HomepageProps {
  props: any;
  navigation: any;
}
const Home = ({...props}) => {
  const [isloading, setisloading] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const {
    cachedData,
    isVisible,
    setisVisible,
    setshowFloatButton,
    showFloatButton,
  } = useGlobalContext();

  const handleClick = () => {
    handleCloseMenu();
    if (cachedData) {
      AsyncStorage.removeItem('chordlyrics_userData');
      props.navigation.navigate('Home');
    } else {
      props.navigation.navigate('Auth');
    }
  };
  const handleCloseModal = () => {
    setisOpen(false);
  };
  const handleCloseMenu = () => {
    setisVisible(false);
  };
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Menu
          contentStyle={{backgroundColor: '#C7D7E0'}}
          visible={isVisible}
          onDismiss={() => setisVisible(false)}
          anchor={
            cachedData ? (
              <TouchableOpacity
                onPress={() => setisVisible(true)}
                style={{marginRight: 10}}>
                <Avatar.Image
                  size={40}
                  source={require('../assets/avatar.jpg')}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setisVisible(true)}
                style={{marginRight: 10}}>
                <EntypoIcon
                  size={20}
                  name="dots-three-vertical"
                  color="#3683AF"
                />
              </TouchableOpacity>
            )
          }>
          <Menu.Item
            titleStyle={{color: '#3683AF', fontWeight: 'bold'}}
            leadingIcon={() => (
              <View>
                {isloading ? (
                  <ActivityIndicator animating={true} />
                ) : (
                  <AntDesignIcons
                    name={cachedData ? 'logout' : 'login'}
                    size={24}
                    color="#3683AF"
                  />
                )}
              </View>
            )}
            title={cachedData ? 'Logout' : 'Login'}
            // titleStyle={{color: jersAppTheme.title}}
            onPress={handleClick}
          />
        </Menu>
      ),
    });
  }, [isVisible, cachedData]);
  const [searchText, setsearchText] = useState('');
  const handleSearchText = (value: string) => {
    setsearchText(value);
  };
  const {
    data: AllSongs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['searchResults', searchText],
    queryFn: retrieveSearchDataLocally,
  });
  useFocusEffect(
    useCallback(() => {
      if (!searchText && cachedData) {
        setshowFloatButton(true);
      } else {
        setshowFloatButton(false);
      }
      if (searchText) {
        setTimeout(() => {
          refetch();
        }, 1000);
      }
    }, [showFloatButton, searchText]),
  );

  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          marginBottom: searchText ? 10 : 0,
        }}>
        <Searchbar
          placeholder="Search "
          onChangeText={val => handleSearchText(val)}
          value={searchText}
          style={{
            width: '95%',
            position: 'relative',
            zIndex: 1,
          }}
        />
      </View>
      {searchText ? (
        <SurfaceLayout>
          {isLoading ? (
            <Loader />
          ) : AllSongs.length > 0 ? (
            <FlatList
              data={AllSongs}
              keyExtractor={key => key._id}
              renderItem={({item, index}) => {
                return (
                  <SongCard
                    props={{
                      variant: 'Songs',
                      name: item.title,
                      data: item,
                      s_no: index + 1,
                    }}
                    isPinned={item.isPinned}
                    onPress={() =>
                      props.navigation.navigate('ViewSong', {
                        id: item._id,
                      })
                    }
                    onPressEdit={() =>
                      props.navigation.navigate('AddSong', {
                        key: 'edit',
                        data: item,
                      })
                    }
                    isAdmin={
                      cachedData &&
                      (cachedData.role == 'admin' || cachedData.role == 'ADMIN')
                    }
                  />
                );
              }}
              contentContainerStyle={styles.container}
            />
          ) : (
            <Loader empty={true} />
          )}
        </SurfaceLayout>
      ) : (
        <TopNavigation props={props} />
      )}
      <AuthModal isVisible={isOpen} handleDismiss={handleCloseModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#C3E0F0',
  },
  container: {
    padding: 10,
    gap: 10,
    paddingBottom: 100,
  },
});

export default Home;
