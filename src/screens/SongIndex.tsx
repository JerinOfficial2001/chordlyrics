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
import Loader from '../components/Loader';
interface SongIndexProps {
  props: any;
  route: any;
}
const SongIndex = ({route, ...props}: any) => {
  const {setcurrentRoute} = useGlobalContext();
  const {key} = route.params;

  useFocusEffect(
    useCallback(() => {
      setcurrentRoute('SongIndex');
    }, []),
  );
  const {data: SongIndex, isLoading} = useQuery({
    queryKey: ['SongIndex', key],
    queryFn: getIndexs,
  });

  return (
    <SurfaceLayout>
      {isLoading ? (
        <Loader />
      ) : (
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
      )}
    </SurfaceLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    gap: 15,
  },
});

export default SongIndex;
