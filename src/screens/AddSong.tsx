import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import SurfaceLayout from '../layouts/SurfaceLayout';
import TextField from '../components/TextField';
import {useGlobalContext} from '../utils/isAuthenticated';
import {useFocusEffect} from '@react-navigation/native';
import ButtonComponent from '../components/ButtonComponent';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import AddDataModal from '../components/Modals/AddDataModal';
import {QueryClient, useMutation} from '@tanstack/react-query';
import {
  addSong,
  approveSongs,
  isNetworkAvailable,
  updateSong,
} from '../controllers/songs';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ActivityIndicator} from 'react-native-paper';

type Props = {};

const AddSong = ({route, navigation}: any) => {
  const {data, key} = route.params;
  const [lyrics, setlyrics] = useState('');
  const {setshowFloatButton, showFloatButton, cachedData} = useGlobalContext();
  const [isOpen, setisOpen] = useState(false);
  const handleDismiss = () => {
    setisOpen(false);
  };
  useFocusEffect(
    useCallback(() => {
      setshowFloatButton(false);
      if (data?.lyrics) {
        setlyrics(
          key == 'approve' || key == 'edit'
            ? typeof data?.lyrics == 'string'
              ? JSON.parse(data.lyrics)
              : data?.lyrics
            : '',
        );
      }
    }, [showFloatButton]),
  );
  const queryClient = new QueryClient();
  const {mutate, isPending} = useMutation({
    mutationFn: addSong,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['MySongs']});
      navigation.navigate('Home', {screen: 'My songs'});
    },
    onError: error => {
      ToastAndroid.show('Unable to add', ToastAndroid.SHORT);
    },
  });
  const {mutate: update, isPending: updationPending} = useMutation({
    mutationFn: updateSong,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['updateSongs']});
      navigation.navigate('Home', {screen: 'AllSongs'});
    },
    onError: error => {
      ToastAndroid.show('Unable to add', ToastAndroid.SHORT);
    },
  });
  const {mutate: approve, isPending: approvalPending} = useMutation({
    mutationFn: approveSongs,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['approveSongs']});
      navigation.navigate('Home', {screen: 'SongRequests'});
    },
    onError: error => {
      console.log(error);

      ToastAndroid.show('Unable to approve', ToastAndroid.SHORT);
    },
  });
  const handleSubmit = () => {
    const requiredField = [
      'title',
      'scale',
      'tempo',
      'style',
      'beat',
      'language',
      'keyboardModal',
      'lyrics',
    ];
    data.lyrics = JSON.stringify(lyrics);

    const isVerified = requiredField.every(key => data[key] != '');
    if (isVerified) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]: any) => {
        formData.append(key, value);
      });
      if (key == 'approve' || key == 'edit') {
        update({
          id: cachedData._id,
          data,
          token: cachedData.accessToken,
          songId: data._id,
        });
      } else {
        mutate({
          id: cachedData._id,
          data,
          token: cachedData.accessToken,
        });
      }
    } else {
      ToastAndroid.show('All fields are mandatory', ToastAndroid.SHORT);
    }
  };
  const handleApprove = async () => {
    const networkAvailable = await isNetworkAvailable();
    if (networkAvailable) {
      approve({
        id: cachedData._id,
        songId: data._id,
        token: cachedData.accessToken,
      });
    } else {
      ToastAndroid.show('You are offline', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: data?.title,
      headerRight: () =>
        key != 'edit' ? (
          <View style={{flexDirection: 'row'}}>
            {approvalPending ? (
              <ActivityIndicator style={{marginRight: 10}} color="#3683AF" />
            ) : (
              <TouchableOpacity
                onPress={handleApprove}
                style={{
                  marginRight: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 2,
                }}>
                <EntypoIcon size={20} name="check" color={'green'} />
                <Text
                  style={{fontWeight: 'bold', fontSize: 15, color: 'green'}}>
                  APPROVE
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : null,
    });
  }, [data]);

  return (
    <SurfaceLayout>
      <View style={styles.container}>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>{data?.scale} </Text>
          <Text style={styles.subtitle}>{data?.beat} </Text>
          <Text style={styles.subtitle}>R-{data?.style} </Text>
          <Text style={styles.subtitle}>T-{data?.tempo} </Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setisOpen(true)}>
            <AntDesignIcon size={15} name="edit" color={'#3683AF'} />
          </TouchableOpacity>
        </View>
        <TextField
          isBigInput={true}
          label="Lyrics"
          value={lyrics}
          onChange={(val: any) => setlyrics(`${val}`)}
          placeholder={'type here...'}
        />
        <View style={styles.floatButton}>
          <ButtonComponent
            name="Submit"
            onPress={handleSubmit}
            isLoading={isPending}
          />
        </View>
      </View>
      <AddDataModal
        handleDismiss={handleDismiss}
        isVisible={isOpen}
        name="Edit Notes"
        data={data}
        keyData={key}
      />
    </SurfaceLayout>
  );
};

export default AddSong;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    color: '#357FA896',
    fontSize: 13,
    fontWeight: 'bold',
  },
  subtitleContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  floatButton: {
    width: '100%',
  },
  editButton: {
    backgroundColor: '#C7D7E0',
    borderRadius: 10,
    padding: 5,
  },
});
