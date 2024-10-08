import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import SurfaceLayout from '../../layouts/SurfaceLayout';
import {useGlobalContext} from '../../utils/isAuthenticated';
import {useFocusEffect} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import Loader from '../../components/Loader';
import SongCard from '../../components/SongCard';
import {getAllSongs} from '../../controllers/songs';
import {ActivityIndicator, Portal} from 'react-native-paper';

type Props = {};

const AllSongs = ({props}: any) => {
  const {setcurrentRoute, cachedData, deleteSongFunctions} = useGlobalContext();
  const {handleOpenDeleteModal, deletionLoading} = deleteSongFunctions;
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
      ) : AllSongs?.length > 0 ? (
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
                onPressDelete={() => handleOpenDeleteModal(item._id)}
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
    gap: 10,
    paddingBottom: 100,
  },
});
export default AllSongs;
