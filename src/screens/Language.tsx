// src/screens/Home.tsx
import React, {useCallback} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import TopNavigation from '../navigation/TabNavigation';
import SongCard from '../components/SongCard';
import SurfaceLayout from '../layouts/SurfaceLayout';
import {useFocusEffect} from '@react-navigation/native';
import {useGlobalContext} from '../utils/isAuthenticated';
import {useQuery} from '@tanstack/react-query';
import {getLanguages} from '../controllers/songs';
import Loader from '../components/Loader';
import {Button} from 'react-native-paper';

const Language: React.FC = ({route, ...props}: any) => {
  const {key} = route.params;

  const {setcurrentRoute} = useGlobalContext();
  useFocusEffect(
    useCallback(() => {
      setcurrentRoute('Language');
    }, []),
  );
  const {data: Languages, isLoading} = useQuery({
    queryKey: ['languages', key],
    queryFn: getLanguages,
  });

  return (
    <SurfaceLayout>
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          {Languages?.map((elem: string, index: any) => {
            return (
              <SongCard
                key={index}
                props={{variant: 'Keyboard', name: elem}}
                onPress={() =>
                  props.navigation.navigate('SongIndex', {key: elem})
                }
              />
            );
          })}
        </ScrollView>
      )}
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
