import {View, Text} from 'react-native';
import React from 'react';
import {PaperProvider} from 'react-native-paper';
import AppNavigator from './navigation/AppNavigation';
import AuthContextAPI from './utils/isAuthenticated';

export default function App() {
  return (
    <AuthContextAPI>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </AuthContextAPI>
  );
}
