import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Favorites from '../screens/Favorites';
import Keyboards from '../screens/Keyboards';
import PinnedSongs from '../screens/PinnedSongs';
import {StackScreenProps} from '@react-navigation/stack';

const Tab = createMaterialTopTabNavigator();
interface TabNavigatorProps {
  props: any;
}

const TopNavigation: React.FC<TabNavigatorProps> = ({props}: any) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#C3E0F0',
          elevation: 0,
        },
        tabBarIndicatorStyle: {
          width: '20%',
          borderRadius: 20,
          height: 5,
          marginLeft: 29,
        },
        tabBarActiveTintColor: '#3683AF',
        tabBarLabelStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Tab.Screen
        name="Keyboard"
        children={() => <Keyboards props={props} />}
      />
      <Tab.Screen
        name="Favorites"
        children={() => <Favorites props={props} />}
      />
      <Tab.Screen name="Pinned Songs" children={() => <PinnedSongs />} />
    </Tab.Navigator>
  );
};
export default TopNavigation;
