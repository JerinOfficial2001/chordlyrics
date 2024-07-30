import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import React, {useCallback, useEffect, useState} from 'react';
import SurfaceLayout from '../layouts/SurfaceLayout';
import {useGlobalContext} from '../utils/isAuthenticated';
import {useFocusEffect} from '@react-navigation/native';
import TextField from '../components/TextField';
import EntypoIcon from 'react-native-vector-icons/Entypo';

type Props = {};

const Auth = (props: Props) => {
  const {setshowFloatButton, showFloatButton} = useGlobalContext();
  const [inputDatas, setinputDatas] = useState({
    email: '',
    password: '',
  });
  const [isVisible, setisVisible] = useState(false);
  useFocusEffect(
    useCallback(() => {
      setshowFloatButton(false);
    }, [showFloatButton]),
  );
  const handleOnchange = (key: string, value: any) => {
    setinputDatas(prev => ({...prev, [key]: value}));
  };
  return (
    <SurfaceLayout>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>CHORDLYRICS</Text>

        <TextField
          isVisible={true}
          label="Email"
          value={inputDatas.email}
          onChange={(value: any) => handleOnchange('email', value)}
          type="email-address"
        />

        <TextField
          isVisible={isVisible}
          label="Password"
          value={inputDatas.password}
          onChange={(value: any) => handleOnchange('password', value)}
          type="email-address"
          Icon={
            <TouchableOpacity
              onPress={() => setisVisible(!isVisible)}
              style={{position: 'absolute', right: 10}}>
              <EntypoIcon
                size={25}
                name={isVisible ? 'eye-with-line' : 'eye'}
                color="#3683AF"
              />
            </TouchableOpacity>
          }
        />

        <Button
          mode="contained"
          textColor="#3683AF"
          contentStyle={styles.button}>
          Submit
        </Button>
      </View>
    </SurfaceLayout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 10,
  },
  content: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    position: 'relative',
    width: '100%',
  },
  headerTitle: {
    color: '#3683AF',
    fontWeight: 'bold',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#C3E0F0',
  },
});
export default Auth;
