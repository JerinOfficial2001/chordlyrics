import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {StackScreenProps} from '@react-navigation/stack';
import {useGlobalContext} from '../utils/isAuthenticated';
import SongRequests from '../screens/tabScreens/SongRequests';
import PinnedSongs from '../screens/tabScreens/PinnedSongs';
import MySongs from '../screens/tabScreens/MySongs';
import Keyboards from '../screens/tabScreens/Keyboards';
import AllSongs from '../screens/tabScreens/AllSongs';

const Tab = createMaterialTopTabNavigator();
interface TabNavigatorProps {
  props: any;
}

const TopNavigation: React.FC<TabNavigatorProps> = ({props}: any) => {
  const {cachedData} = useGlobalContext();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#C3E0F0',
          elevation: 0,
        },
        tabBarIndicatorStyle: {
          width: '15%',
          borderRadius: 20,
          height: 5,
          marginLeft: !cachedData ? 40 : 22,
        },
        tabBarActiveTintColor: '#3683AF',
        tabBarLabelStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Tab.Screen name="Songs" children={() => <AllSongs props={props} />} />

      <Tab.Screen
        name="Keyboard"
        children={() => <Keyboards props={props} />}
      />
      {cachedData && cachedData.role != 'ADMIN' && (
        <Tab.Screen
          name="My songs"
          children={() => <MySongs props={props} />}
        />
      )}
      {cachedData && cachedData.role == 'ADMIN' && (
        <Tab.Screen
          name="Requests"
          children={() => <SongRequests props={props} />}
        />
      )}
      <Tab.Screen
        name="Pinned"
        children={() => <PinnedSongs props={props} />}
      />
    </Tab.Navigator>
  );
};
export default TopNavigation;
