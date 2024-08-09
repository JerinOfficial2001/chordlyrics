import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useCallback} from 'react';
import SongCard from '../../components/SongCard';
import SurfaceLayout from '../../layouts/SurfaceLayout';
import {useGlobalContext} from '../../utils/isAuthenticated';
import {useFocusEffect} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {getKeyboards} from '../../controllers/songs';
import Loader from '../../components/Loader';

type Props = {};

const Keyboards = ({props}: any) => {
  const {setcurrentRoute} = useGlobalContext();
  const {
    data: Keyboards,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['keyboards'],
    queryFn: getKeyboards,
  });
  useFocusEffect(
    useCallback(() => {
      setcurrentRoute('Keyboards');
      refetch();
    }, []),
  );

  return (
    <SurfaceLayout>
      {isLoading ? (
        <Loader />
      ) : Keyboards.length > 0 ? (
        <FlatList
          data={Keyboards}
          keyExtractor={key => key._id}
          renderItem={({item, index}) => {
            return (
              <SongCard
                key={index}
                props={{variant: 'Keyboard', name: item}}
                onPress={() =>
                  props.navigation.navigate('Language', {
                    key: item,
                  })
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
    flex: 1,
    gap: 10,
  },
});
export default Keyboards;
