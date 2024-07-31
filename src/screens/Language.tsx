// src/screens/Home.tsx
import React, {useCallback} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import TopNavigation from '../navigation/TabNavigation';
import SongCard from '../components/SongCard';
import SurfaceLayout from '../layouts/SurfaceLayout';
import {useFocusEffect} from '@react-navigation/native';
import {useGlobalContext} from '../utils/isAuthenticated';

const Language: React.FC = ({...props}: any) => {
  const {setcurrentRoute} = useGlobalContext();
  useFocusEffect(
    useCallback(() => {
      setcurrentRoute('Language');
    }, []),
  );
  return (
    <SurfaceLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <SongCard
          props={{variant: 'Keyboard', name: 'Tamil songs'}}
          onPress={() => props.navigation.navigate('SongIndex')}
        />
        <SongCard
          props={{variant: 'Keyboard', name: 'English songs'}}
          onPress={() => props.navigation.navigate('SongIndex')}
        />
      </ScrollView>
    </SurfaceLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
});

export default Language;
