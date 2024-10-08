// src/screens/Songs.tsx
import React, {useEffect, useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import SurfaceLayout from '../layouts/SurfaceLayout';
import {useGlobalContext} from '../utils/isAuthenticated';
import {useFocusEffect} from '@react-navigation/native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useQuery} from '@tanstack/react-query';
import {getLyrics, isNetworkAvailable, pinSong} from '../controllers/songs';
import Loader from '../components/Loader';
import {pinSongsOffline} from '../controllers/pinSongs';
import {queryClient} from '../App';

const ViewSong: React.FC<any> = ({navigation, route, ...props}) => {
  const {id, mySong} = route.params;

  const {setshowFloatButton, showFloatButton, cachedData} = useGlobalContext();
  const [isPinned, setisPinned] = useState(false);
  useFocusEffect(
    useCallback(() => {
      setshowFloatButton(false);
    }, [showFloatButton]),
  );
  const {data: songData, isLoading} = useQuery({
    queryKey: ['SongLyrics', id],
    queryFn: getLyrics,
  });

  useEffect(() => {
    if (songData?.isPinned) {
      setisPinned(songData?.isPinned);
    } else {
      setisPinned(false);
    }

    navigation.setOptions({
      title: songData?.title,
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          {mySong && (
            <MaterialCommunityIcons
              size={20}
              name={
                songData?.status == 'pending'
                  ? 'progress-clock'
                  : 'check-decagram'
              }
              color="#3683AF"
              style={{marginRight: 10}}
            />
          )}

          <TouchableOpacity onPress={handlePinSong} style={{marginRight: 10}}>
            <EntypoIcon
              size={20}
              name="pin"
              color={isPinned ? 'blue' : '#3683AF'}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [songData, isPinned]);
  const handlePinSong = async () => {
    setisPinned(!isPinned);
    const networkAvailable = await isNetworkAvailable();

    if (cachedData && networkAvailable) {
      pinSong(id, !isPinned);
      queryClient.invalidateQueries({queryKey: ['SongIndexs']});
      queryClient.invalidateQueries({queryKey: ['MySongs']});
      queryClient.invalidateQueries({queryKey: ['SongLyrics']});
    } else {
      pinSongsOffline(id, songData, !isPinned);
    }
  };

  return (
    <SurfaceLayout>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>{songData?.scale} </Text>
            <Text style={styles.subtitle}>{songData?.beat} </Text>
            <Text style={styles.subtitle}>R-{songData?.style} </Text>
            <Text style={styles.subtitle}>T-{songData?.tempo} </Text>
          </View>
          <ScrollView
            contentContainerStyle={{alignItems: 'center', marginTop: 10}}>
            <Text
              style={{
                color: '#3683AF',
                fontSize: 18,
                textAlign: 'justify',
              }}>
              {typeof songData?.lyrics == 'string'
                ? JSON.parse(songData?.lyrics)
                : songData?.lyrics}
            </Text>
          </ScrollView>
        </View>
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
});

export default ViewSong;
