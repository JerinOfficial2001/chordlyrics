import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useGlobalContext} from '../utils/isAuthenticated';
import {useFocusEffect} from '@react-navigation/native';

type Props = {};
interface SurfaceLayoutProps {
  children: any;
}
const SurfaceLayout: React.FC<SurfaceLayoutProps> = ({children}) => {
  const {setshowFloatButton, showFloatButton} = useGlobalContext();

  useFocusEffect(
    useCallback(() => {
      setshowFloatButton(true);
    }, [showFloatButton]),
  );
  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

export default SurfaceLayout;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C3E0F0',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  content: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    position: 'relative',
    width: '100%',
  },
});
