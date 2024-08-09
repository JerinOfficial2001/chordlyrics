import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useCallback} from 'react';
import SongCard from '../../components/SongCard';
import SurfaceLayout from '../../layouts/SurfaceLayout';
import {getMySongs} from '../../controllers/songs';
import {useQuery} from '@tanstack/react-query';
import {useGlobalContext} from '../../utils/isAuthenticated';
import Loader from '../../components/Loader';
import {useFocusEffect} from '@react-navigation/native';

type Props = {};

const MySongs = ({props}: any) => {
  const {cachedData} = useGlobalContext();

  const {
    data: MySongs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['MySongs', {id: cachedData._id, token: cachedData.accessToken}],
    queryFn: getMySongs,
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
      ) : (
        <FlatList
          data={MySongs}
          keyExtractor={key => key._id}
          renderItem={({item, index}) => {
            return (
              <SongCard
                key={item._id}
                props={{
                  variant: 'MySongs',
                  name: item.title,
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
                  props.navigation.navigate('ViewSong', {
                    id: item._id,
                    mySong: true,
                  });
                }}
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
    flex: 1,
    gap: 10,
  },
});
export default MySongs;
