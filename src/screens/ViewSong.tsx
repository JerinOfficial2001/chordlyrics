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
import {useQuery} from '@tanstack/react-query';
import {getLyrics} from '../controllers/songs';

const ViewSong: React.FC<any> = ({navigation, route, ...props}) => {
  const {id} = route.params;

  const {setshowFloatButton, showFloatButton} = useGlobalContext();
  const [isPinned, setisPinned] = useState(false);
  useFocusEffect(
    useCallback(() => {
      setshowFloatButton(false);
    }, [showFloatButton]),
  );
  const {data: songData} = useQuery({
    queryKey: ['SongLyrics', id],
    queryFn: getLyrics,
  });
  console.log(JSON.stringify(songData, null, 2));

  //   const songData = {
  //     title: 'தடைகளை உடைப்பவரே',
  //     lyrics: `Gm               Gm                 F
  // தடைகளை உடைப்பவரே
  // F                                            Gm
  // எனக்கு முன் செல்கின்றீரே – 2

  // Eb                                                  F
  // நீர் கோணலானவைகளைச் செவ்வையாக்குவீர்
  // Dm            Cm                     F                   Gm
  // கரடானவைகளைச் சமமாக்குவீர்
  // Eb                               F
  // நீர் வெண்கல கதவுகள் உடைத்தெறிவீர்
  // Dm            Cm                     F                   Gm
  // மறைத்த பொக்கிஷங்களை வெளித்தருவீர் – 2
  // Gm               Gm                 F
  // தடைகளை உடைப்பவரே
  // F                                            Gm
  // எனக்கு முன் செல்கின்றீரே – 2
  // Eb                                                  F
  // நீர் கோணலானவைகளைச் செவ்வையாக்குவீர்
  // Dm            Cm                     F                   Gm
  // கரடானவைகளைச் சமமாக்குவீர்
  // Eb                               F
  // நீர் வெண்கல கதவுகள் உடைத்தெறிவீர்
  // Dm            Cm                     F                   Gm
  // மறைத்த பொக்கிஷங்களை வெளித்தருவீர் – 2
  // Gm               Gm                 F
  // தடைகளை உடைப்பவரே
  // F                                            Gm
  // எனக்கு முன் செல்கின்றீரே – 2
  // Eb                                                  F
  // நீர் கோணலானவைகளைச் செவ்வையாக்குவீர்
  // Dm            Cm                     F                   Gm
  // கரடானவைகளைச் சமமாக்குவீர்
  // Eb                               F
  // நீர் வெண்கல கதவுகள் உடைத்தெறிவீர்
  // Dm            Cm                     F                   Gm
  // மறைத்த பொக்கிஷங்களை வெளித்தருவீர் – 2
  // Gm               Gm                 F
  // தடைகளை உடைப்பவரே
  // F                                            Gm
  // எனக்கு முன் செல்கின்றீரே – 2
  // Eb                                                  F
  // நீர் கோணலானவைகளைச் செவ்வையாக்குவீர்
  // Dm            Cm                     F                   Gm
  // கரடானவைகளைச் சமமாக்குவீர்
  // Eb                               F
  // நீர் வெண்கல கதவுகள் உடைத்தெறிவீர்
  // Dm            Cm                     F                   Gm
  // மறைத்த பொக்கிஷங்களை வெளித்தருவீர் – 2`,
  //     _id: '1',
  //     scale: 'G',
  //     tempo: '120',
  //     style: '123 (Disco)',
  //     beat: '3/4',
  //     status: 'completed',
  //     isPinned: false,
  //   };
  useEffect(() => {
    navigation.setOptions({
      title: songData?.title,
      headerRight: () => (
        <TouchableOpacity onPress={handlePinSong} style={{marginRight: 10}}>
          <EntypoIcon
            size={20}
            name="pin"
            color={isPinned ? '#3683AF' : 'gray'}
          />
        </TouchableOpacity>
      ),
    });
    if (songData?.isPinned) {
      setisPinned(true);
    }
  }, [isPinned, songData]);
  const handlePinSong = () => {
    setisPinned(!isPinned);
  };
  return (
    <SurfaceLayout>
      <View style={styles.container}>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>{songData?.scale} </Text>
          <Text style={styles.subtitle}>{songData?.beat} </Text>
          <Text style={styles.subtitle}>R-{songData?.style} </Text>
          <Text style={styles.subtitle}>T-{songData?.tempo} </Text>
        </View>
        <ScrollView contentContainerStyle={{}}>
          <Text
            style={{
              color: '#3683AF',
              fontSize: 20,
              textAlign: 'justify',
            }}>
            {songData?.lyrics}
          </Text>
        </ScrollView>
      </View>
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
