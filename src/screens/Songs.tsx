// src/screens/Songs.tsx
import React, {useCallback} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import TopNavigation from '../navigation/TabNavigation';
import SongCard from '../components/SongCard';
import SurfaceLayout from '../layouts/SurfaceLayout';
import {useFocusEffect} from '@react-navigation/native';
import {useGlobalContext} from '../utils/isAuthenticated';
interface SongsProps {
  props: any;
}
const Songs = ({...props}) => {
  const {setcurrentRoute} = useGlobalContext();
  useFocusEffect(
    useCallback(() => {
      setcurrentRoute('Songs');
    }, []),
  );
  return (
    <SurfaceLayout>
      <FlatList
        data={[
          {
            title: 'God is Good',
            scale: 'G',
            tempo: '120',
            style: '123 (Disco)',
            beat: '2/4',
            _id: '1',
            isPinned: true,
          },
          {
            title: 'Bless up be the name of the lord',
            scale: 'G',
            tempo: '120',
            style: '123 (Disco)',
            beat: '3/4',
            _id: '2',
            isPinned: false,
          },
        ]}
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
            />
          );
        }}
        contentContainerStyle={styles.container}
      />
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

export default Songs;
