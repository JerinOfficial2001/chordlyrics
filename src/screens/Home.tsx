// src/screens/Home.tsx
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Menu, ActivityIndicator, Avatar} from 'react-native-paper';
import TopNavigation from '../navigation/TabNavigation';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useGlobalContext} from '../utils/isAuthenticated';
import AuthModal from '../components/Modals/AuthModal';

interface HomepageProps {
  props: any;
  navigation: any;
}
const Home = ({...props}) => {
  const [isVisible, setisVisible] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const {isAuthenticated} = useGlobalContext();

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Menu
          contentStyle={{backgroundColor: '#C7D7E0'}}
          visible={isVisible}
          onDismiss={() => setisVisible(false)}
          anchor={
            isAuthenticated ? (
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
                    name={isAuthenticated ? 'logout' : 'login'}
                    size={24}
                    color="#3683AF"
                  />
                )}
              </View>
            )}
            title={isAuthenticated ? 'Logout' : 'Login'}
            // titleStyle={{color: jersAppTheme.title}}
            onPress={handleClick}
          />
        </Menu>
      ),
    });
  }, [isVisible]);
  const handleClick = () => {
    if (isAuthenticated) {
      undefined;
    } else {
      props.navigation.navigate('Auth');
    }
    handleCloseMenu();
  };
  const handleCloseModal = () => {
    setisOpen(false);
  };
  const handleCloseMenu = () => {
    setisVisible(false);
  };
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
