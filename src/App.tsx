import {View, Text} from 'react-native';
import React from 'react';
import {PaperProvider} from 'react-native-paper';
import AppNavigator from './navigation/AppNavigation';
import AuthContextAPI from './utils/isAuthenticated';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();
export default function App() {
  return (
    <AuthContextAPI>
      <PaperProvider>
        <QueryClientProvider client={queryClient}>
          <AppNavigator />
        </QueryClientProvider>
      </PaperProvider>
    </AuthContextAPI>
  );
}
