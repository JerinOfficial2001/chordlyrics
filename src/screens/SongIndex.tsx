// src/screens/Home.tsx
import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import TopNavigation from '../navigation/TabNavigation';
import SongCard from '../components/SongCard';
import SurfaceLayout from '../layouts/SurfaceLayout';
interface SongIndexProps {
  props: any;
}
const SongIndex = ({...props}) => {
  return (
    <SurfaceLayout>
      <View style={styles.container}>
        {[
          {title: 'A', total_songs: 10, _id: '1'},
          {title: 'B', total_songs: 20, _id: '2'},
          {title: 'C', total_songs: 30, _id: '3'},
          {title: 'D', total_songs: 40, _id: '4'},
          {title: 'E', total_songs: 20, _id: '5'},
          {title: 'F', total_songs: 60, _id: '6'},
          {title: 'G', total_songs: 60, _id: '7'},
          {title: 'H', total_songs: 70, _id: '8'},
          {title: 'I', total_songs: 90, _id: '9'},
          {title: 'J', total_songs: 15, _id: '10'},
          {title: 'K', total_songs: 15, _id: '11'},
          {title: 'L', total_songs: 15, _id: '12'},
          {title: 'M', total_songs: 15, _id: '13'},
          {title: 'N', total_songs: 15, _id: '14'},
          {title: 'O', total_songs: 15, _id: '15'},
          {title: 'P', total_songs: 15, _id: '16'},
          {title: 'Q', total_songs: 15, _id: '17'},
          {title: 'R', total_songs: 15, _id: '18'},
          {title: 'S', total_songs: 15, _id: '19'},
          {title: 'T', total_songs: 15, _id: '20'},
          {title: 'U', total_songs: 15, _id: '21'},
          {title: 'V', total_songs: 15, _id: '22'},
          {title: 'W', total_songs: 15, _id: '23'},
          {title: 'X', total_songs: 15, _id: '24'},
          {title: 'Y', total_songs: 15, _id: '25'},
          {title: 'Z', total_songs: 15, _id: '26'},
        ].map(item => {
          return (
            <SongCard
              key={item._id}
              props={{
                variant: 'Index',
                name: item.title,
                total_songs: item.total_songs,
              }}
              onPress={() => {
                props.navigation.navigate('Songs', {
                  id: item._id,
                });
              }}
            />
          );
        })}
      </View>
    </SurfaceLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 23,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    flex: 1,
    padding: 10,
    justifyContent: 'flex-start',
  },
});

export default SongIndex;
