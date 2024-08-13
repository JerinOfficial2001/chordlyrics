// src/screens/Songs.tsx
import React, {useCallback} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import TopNavigation from '../navigation/TabNavigation';
import SongCard from '../components/SongCard';
import SurfaceLayout from '../layouts/SurfaceLayout';
import {useFocusEffect} from '@react-navigation/native';
import {useGlobalContext} from '../utils/isAuthenticated';
import {getTitles} from '../controllers/songs';
import {useQuery} from '@tanstack/react-query';
import Loader from '../components/Loader';

interface SongsProps {
  props: any;
  routes: any;
}
const Songs = ({route, ...props}: any) => {
  const {index} = route.params;

  const {setcurrentRoute, cachedData} = useGlobalContext();
  useFocusEffect(
    useCallback(() => {
      setcurrentRoute('Songs');
    }, []),
  );
  const {data: SongTitles, isLoading} = useQuery({
    queryKey: ['SongIndexs', index],
    queryFn: getTitles,
  });

  return (
    <SurfaceLayout>
      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={SongTitles}
          keyExtractor={key => key._id}
          renderItem={({item, index}) => {
            return (
              <SongCard
                props={{
                  variant: 'Songs',
                  name: item.title,
                  data: item,
                  s_no: index + 1,
                }}
                isPinned={item.isPinned}
                onPress={() =>
                  props.navigation.navigate('ViewSong', {
                    id: item._id,
                  })
                }
                onPressEdit={() =>
                  props.navigation.navigate('AddSong', {
                    key: 'edit',
                    data: item,
                  })
                }
                isAdmin={
                  cachedData &&
                  (cachedData.role == 'admin' || cachedData.role == 'ADMIN')
                }
              />
            );
          }}
          contentContainerStyle={styles.container}
        />
      )}
    </SurfaceLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
  },
});

export default Songs;
