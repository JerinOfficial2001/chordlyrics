// src/screens/Home.tsx
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Menu, ActivityIndicator, Avatar} from 'react-native-paper';
import TopNavigation from '../navigation/TabNavigation';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useGlobalContext} from '../utils/isAuthenticated';
import AuthModal from '../components/Modals/AuthModal';
import {useFocusEffect} from '@react-navigation/native';

interface HomepageProps {
  props: any;
  navigation: any;
}
const Home = ({...props}) => {
  const [isloading, setisloading] = useState(false);
  const [isOpen, setisOpen] = useState(false);

  const {cachedData, isVisible, setisVisible} = useGlobalContext();

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

  return (
    <View style={styles.container}>
      <TopNavigation props={props} />
      <AuthModal isVisible={isOpen} handleDismiss={handleCloseModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
