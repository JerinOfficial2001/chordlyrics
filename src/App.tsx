import {View, Text} from 'react-native';
import React from 'react';
import {PaperProvider, DefaultTheme} from 'react-native-paper';
import AppNavigator from './navigation/AppNavigation';
import AuthContextAPI from './utils/isAuthenticated';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3683AF',
  },
};
export const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextAPI>
        <PaperProvider theme={theme}>
          <AppNavigator />
        </PaperProvider>
      </AuthContextAPI>
    </QueryClientProvider>
  );
}
