import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import SongCard from '../components/SongCard';
import SurfaceLayout from '../layouts/SurfaceLayout';

type Props = {};

const Keyboards = ({props}: any) => {
  return (
    <SurfaceLayout>
      <View style={styles.container}>
        <SongCard
          props={{variant: 'Keyboard', name: 'YAMAHA i455'}}
          onPress={() => props.navigation.navigate('Language')}
        />
      </View>
    </SurfaceLayout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
});
export default Keyboards;
