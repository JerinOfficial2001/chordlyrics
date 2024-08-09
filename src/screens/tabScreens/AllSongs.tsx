import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import SurfaceLayout from '../../layouts/SurfaceLayout';
import {useGlobalContext} from '../../utils/isAuthenticated';
import {useFocusEffect} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import Loader from '../../components/Loader';
import SongCard from '../../components/SongCard';
import {getAllSongs} from '../../controllers/songs';

type Props = {};

const AllSongs = ({props}: any) => {
  const {setcurrentRoute, cachedData} = useGlobalContext();
  const {
    data: AllSongs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['AllSongs'],
    queryFn: getAllSongs,
  });

  useFocusEffect(
    useCallback(() => {
      setcurrentRoute('Songs');

      refetch();
    }, []),
  );

  return (
    <SurfaceLayout>
      {isLoading ? (
        <Loader />
      ) : AllSongs.length > 0 ? (
        <FlatList
          data={AllSongs}
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
                isAdmin={cachedData && cachedData.role == 'admin'}
              />
            );
          }}
          contentContainerStyle={styles.container}
        />
      ) : (
        <Loader empty={true} />
      )}
    </SurfaceLayout>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});
export default AllSongs;
