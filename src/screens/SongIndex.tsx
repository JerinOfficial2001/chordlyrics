// src/screens/Home.tsx
import React, {useCallback} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import TopNavigation from '../navigation/TabNavigation';
import SongCard from '../components/SongCard';
import SurfaceLayout from '../layouts/SurfaceLayout';
import {useGlobalContext} from '../utils/isAuthenticated';
import {useFocusEffect} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {getIndexs} from '../controllers/songs';
interface SongIndexProps {
  props: any;
}
const SongIndex = ({...props}) => {
  const {setcurrentRoute} = useGlobalContext();
  useFocusEffect(
    useCallback(() => {
      setcurrentRoute('SongIndex');
    }, []),
  );
  const {data: SongIndex} = useQuery({
    queryKey: ['SongIndexs'],
    queryFn: getIndexs,
  });

  return (
    <SurfaceLayout>
      <View style={styles.container}>
        {SongIndex?.map((item: any, index: any) => {
          return (
            <SongCard
              key={index}
              props={{
                variant: 'Index',
                name: item.title,
                total_songs: item.totalSongs,
              }}
              onPress={() => {
                props.navigation.navigate('Songs', {
                  index: item.title,
                });
              }}
            />
          );
        })}
      </View>
    </SurfaceLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 23,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    flex: 1,
    padding: 10,
    justifyContent: 'flex-start',
  },
});

export default SongIndex;
