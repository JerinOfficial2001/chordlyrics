import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import SurfaceLayout from '../../layouts/SurfaceLayout';
import {useGlobalContext} from '../../utils/isAuthenticated';
import {useQuery} from '@tanstack/react-query';
import Loader from '../../components/Loader';
import SongCard from '../../components/SongCard';
import {useFocusEffect} from '@react-navigation/native';
import {getPendingSongs} from '../../controllers/songs';

type Props = {};

const SongRequests = ({props}: any) => {
  const {cachedData} = useGlobalContext();

  const {
    data: MySongs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      'PendingSongs',
      {id: cachedData._id, token: cachedData.accessToken},
    ],
    queryFn: getPendingSongs,
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
                key={item._id}
                props={{
                  variant: 'PendingSongs',
                  name: item.userName,
                  songTitle: item.title,
                  data: {
                    scale: item.scale,
                    tempo: item.tempo,
                    beat: item.beat,
                    style: item.style,
                    status: item.status,
                  },
                  s_no: index + 1,
                }}
                onPress={() => {
                  props.navigation.navigate('AddSong', {
                    data: item,
                    key: 'approve',
                  });
                }}
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
    gap: 10,
    paddingBottom: 100,
  },
});
export default SongRequests;
