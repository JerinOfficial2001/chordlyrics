import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import React, {useCallback, useEffect, useState} from 'react';
import SurfaceLayout from '../layouts/SurfaceLayout';
import {useGlobalContext} from '../utils/isAuthenticated';
import {useFocusEffect} from '@react-navigation/native';
import TextField from '../components/TextField';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import ButtonComponent from '../components/ButtonComponent';
import {login, register} from '../controllers/auth';

type Props = {};

const Auth = ({...props}: any) => {
  const {setshowFloatButton, showFloatButton, setcachedData} =
    useGlobalContext();
  const [isProcessing, setisProcessing] = useState(false);
  const [inputDatas, setinputDatas] = useState<any>({
    email: '',
    password: '',
    role: '',
    name: '',
    image: '',
  });
  const [isRegister, setisRegister] = useState(false);

  const inputfields = [
    {
      name: 'email',
      label: 'Email',
      value: inputDatas.email,
      onChange: (value: any) => handleOnchange('email', value),
      keyboard: 'email-address',
      type: 'text',
      isVisible: true,
    },
    {
      name: 'password',
      label: 'Password',
      value: inputDatas.password,
      onChange: (value: any) => handleOnchange('password', value),
      keyboard: 'email-address',
      type: 'password',
      isVisible: true,
    },
    {
      name: 'name',
      label: 'Name',
      value: inputDatas.name,
      onChange: (value: any) => handleOnchange('name', value),
      keyboard: 'email-address',
      type: 'name',
      isVisible: isRegister,
    },
    // {
    //   name: 'image',
    //   label: 'Image',
    //   value: inputDatas.image,
    //   onChange: (value: any) => handleOnchange('image', value),
    //   keyboard: 'email-address',
    //   type: 'image',
    //   isVisible: isRegister,
    // },
  ];
  const [isVisible, setisVisible] = useState(false);
  useFocusEffect(
    useCallback(() => {
      setshowFloatButton(false);
    }, [showFloatButton]),
  );
  const handleOnchange = (key: string, value: any) => {
    setinputDatas((prev: any) => ({...prev, [key]: value}));
  };

  const handleSubmit = async () => {
    const requiredDatas = ['email', 'password'];
    const isVerified = requiredDatas.every(key => inputDatas[key] !== '');

    if ((isVerified && !isRegister) || (inputDatas.name != '' && isRegister)) {
      setisProcessing(true);
      try {
        const res = !isRegister
          ? await login(inputDatas)
          : await register(inputDatas);

        if (res) {
          if (res.status === 'ok' && res.data) {
            const userDatas =
              typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            setcachedData(userDatas);
            props.navigation.navigate('Home');
          } else if (res.status == 'ok' && res.message) {
            setisRegister(true);
          } else {
            console.error('Login failed:', res.message || 'Unknown error');
          }
        } else {
          console.error('No response from login function');
        }
      } catch (error) {
        console.error('Error during login:', error);
      } finally {
        setisProcessing(false);
      }
    } else {
      ToastAndroid.show('All fields are mandatory', ToastAndroid.SHORT);
    }
  };
  return (
    <SurfaceLayout>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>CHORDLYRICS</Text>
        {inputfields.map((elem, index) => {
          if (elem.type == 'password') {
            return (
              <TextField
                key={index}
                isVisible={isVisible}
                label={elem.label}
                value={elem.value}
                onChange={elem.onChange}
                type={elem.keyboard}
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
            );
          } else if (elem.isVisible) {
            return (
              <TextField
                key={index}
                isVisible={true}
                label={elem.label}
                value={elem.value}
                onChange={elem.onChange}
                type={elem.keyboard}
              />
            );
          }
        })}

        <ButtonComponent
          name="Submit"
          onPress={handleSubmit}
          isLoading={isProcessing}
        />
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
