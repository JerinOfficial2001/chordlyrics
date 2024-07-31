import {View, Text, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import SongCard from '../components/SongCard';
import SurfaceLayout from '../layouts/SurfaceLayout';
import {useGlobalContext} from '../utils/isAuthenticated';
import {useFocusEffect} from '@react-navigation/native';

type Props = {};

const Keyboards = ({props}: any) => {
  const {setcurrentRoute} = useGlobalContext();
  useFocusEffect(
    useCallback(() => {
      setcurrentRoute('Keyboards');
    }, []),
  );
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
