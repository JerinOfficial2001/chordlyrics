import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import SurfaceLayout from '../../layouts/SurfaceLayout';
import {useGlobalContext} from '../../utils/isAuthenticated';
import {useQuery} from '@tanstack/react-query';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../components/Loader';
import SongCard from '../../components/SongCard';
import {getPinnedOfflineSongs} from '../../controllers/pinSongs';

type Props = {};

const PinnedSongs = ({props}: any) => {
  const {cachedData} = useGlobalContext();

  const {
    data: MySongs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['PinnedSongs'],
    queryFn: getPinnedOfflineSongs,
  });
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  return (
    <SurfaceLayout>
      {isLoading ? (
        <Loader />
      ) : MySongs.length > 0 ? (
        <FlatList
          data={MySongs}
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
                // isPinned={item.isPinned}
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
      ) : (
        <Loader empty={true} />
      )}
    </SurfaceLayout>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 100,
    gap: 10,
  },
});
export default PinnedSongs;
