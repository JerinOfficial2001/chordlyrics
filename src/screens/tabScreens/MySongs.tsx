import {View, Text, StyleSheet, FlatList, ToastAndroid} from 'react-native';
import React, {useCallback, useState} from 'react';
import SongCard from '../../components/SongCard';
import SurfaceLayout from '../../layouts/SurfaceLayout';
import {deleteSong, getMySongs} from '../../controllers/songs';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useGlobalContext} from '../../utils/isAuthenticated';
import Loader from '../../components/Loader';
import {useFocusEffect} from '@react-navigation/native';
import DeleteModal from '../../components/Modals/DeleteModal';
import {ActivityIndicator, Portal} from 'react-native-paper';
import {queryClient} from '../../App';

type Props = {};

const MySongs = ({props}: any) => {
  const {cachedData, deleteSongFunctions} = useGlobalContext();
  const {handleOpenDeleteModal, deletionLoading} = deleteSongFunctions;
  const [open, setopen] = useState('');
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
      {deletionLoading && (
        <Portal>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#00000087',
              flexDirection: 'column',
              gap: 5,
            }}>
            <ActivityIndicator color="#3683AF" size={'large'} />
            <Text style={{marginLeft: 10}}>Deleting...</Text>
          </View>
        </Portal>
      )}
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
                onPressDelete={() => {
                  handleOpenDeleteModal(item._id);
                }}
                onPressEdit={() =>
                  props.navigation.navigate('AddSong', {
                    key: 'edit',
                    data: item,
                  })
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
    flex: 1,
    gap: 10,
  },
});
export default MySongs;
