// AppNavigator.tsx
import React, {useState} from 'react';
import {
  NavigationContainer,
  useNavigationState,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import Home from '../screens/Home';
import SongIndex from '../screens/SongIndex';
import Language from '../screens/Language';
import Songs from '../screens/Songs';
import ViewSong from '../screens/ViewSong';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Auth from '../screens/Auth';
import {useGlobalContext} from '../utils/isAuthenticated';
import AddDataModal from '../components/Modals/AddDataModal';
import AddSong from '../screens/AddSong';

type RootStackParamList = {
  Home: undefined;
  SongIndex: undefined;
  Language: undefined;
  Songs: undefined;
  ViewSong: undefined;
  Auth: undefined;
  AddSong: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const [isOpen, setisOpen] = useState(false);
  const {showFloatButton, currentRoute, isAuthenticated} = useGlobalContext();

  const styles = StyleSheet.create({
    FloatableButton: {
      borderRadius: 50,
      backgroundColor: '#C3E0F0',
      position: 'absolute',
      right: 20,
      bottom: 20,
      padding: 20,
    },
    cardShadow: {
      borderRadius: 16,
      backgroundColor: 'transparent',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
  });
  const handleClose = () => {
    setisOpen(false);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({route, navigation}) => ({
          headerStyle: {
            backgroundColor: '#C3E0F0',
          },
          headerTitleStyle: {
            color: '#3683AF',
          },
          headerLeft: () => {
            return route.name !== 'Home' ? (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{marginLeft: 20}}>
                <EntypoIcon size={26} name="chevron-left" color="#3683AF" />
              </TouchableOpacity>
            ) : null;
          },
        })}
        initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{
            title: 'Chordlyrics',
            headerTitleStyle: {
              color: '#3683AF',
              fontWeight: 'bold',
              textTransform: 'uppercase',
            },
          }}
          component={Home}
        />
        <Stack.Screen name="Language" component={Language} />
        <Stack.Screen
          name="SongIndex"
          options={{
            title: 'Song Index',
          }}
          component={SongIndex}
        />
        <Stack.Screen name="Songs" component={Songs} />
        <Stack.Screen name="ViewSong" component={ViewSong} />
        <Stack.Screen
          name="Auth"
          options={{
            title: 'Authentication',
          }}
          component={Auth}
        />
        <Stack.Screen
          name="AddSong"
          options={{
            title: 'Add Lyrics',
          }}
          component={AddSong}
        />
      </Stack.Navigator>
      {showFloatButton && isAuthenticated && (
        <TouchableOpacity
          onPress={() => setisOpen(true)}
          style={styles.FloatableButton}>
          <EntypoIcon size={26} name="plus" color="#3683AF" />
        </TouchableOpacity>
      )}
      <AddDataModal
        name={currentRoute}
        isVisible={isOpen}
        handleDismiss={handleClose}
      />
    </NavigationContainer>
  );
};

export default AppNavigator;
