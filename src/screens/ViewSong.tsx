// src/screens/Songs.tsx
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import TopNavigation from '../navigation/TabNavigation';
import SongCard from '../components/SongCard';
import SurfaceLayout from '../layouts/SurfaceLayout';
const ViewSong: React.FC<any> = ({navigation, ...props}) => {
  const songData = {
    title: 'தடைகளை உடைப்பவரே',
    lyrics: `Gm               Gm                 F
தடைகளை உடைப்பவரே 
F                                            Gm
எனக்கு முன் செல்கின்றீரே – 2

Eb                                                  F
நீர் கோணலானவைகளைச் செவ்வையாக்குவீர்
Dm            Cm                     F                   Gm
கரடானவைகளைச் சமமாக்குவீர்
Eb                               F
நீர் வெண்கல கதவுகள் உடைத்தெறிவீர்
Dm            Cm                     F                   Gm
மறைத்த பொக்கிஷங்களை வெளித்தருவீர் – 2
Gm               Gm                 F
தடைகளை உடைப்பவரே 
F                                            Gm
எனக்கு முன் செல்கின்றீரே – 2 
Eb                                                  F
நீர் கோணலானவைகளைச் செவ்வையாக்குவீர்
Dm            Cm                     F                   Gm
கரடானவைகளைச் சமமாக்குவீர்
Eb                               F
நீர் வெண்கல கதவுகள் உடைத்தெறிவீர்
Dm            Cm                     F                   Gm
மறைத்த பொக்கிஷங்களை வெளித்தருவீர் – 2
Gm               Gm                 F
தடைகளை உடைப்பவரே 
F                                            Gm
எனக்கு முன் செல்கின்றீரே – 2 
Eb                                                  F
நீர் கோணலானவைகளைச் செவ்வையாக்குவீர்
Dm            Cm                     F                   Gm
கரடானவைகளைச் சமமாக்குவீர்
Eb                               F
நீர் வெண்கல கதவுகள் உடைத்தெறிவீர்
Dm            Cm                     F                   Gm
மறைத்த பொக்கிஷங்களை வெளித்தருவீர் – 2
Gm               Gm                 F
தடைகளை உடைப்பவரே 
F                                            Gm
எனக்கு முன் செல்கின்றீரே – 2 
Eb                                                  F
நீர் கோணலானவைகளைச் செவ்வையாக்குவீர்
Dm            Cm                     F                   Gm
கரடானவைகளைச் சமமாக்குவீர்
Eb                               F
நீர் வெண்கல கதவுகள் உடைத்தெறிவீர்
Dm            Cm                     F                   Gm
மறைத்த பொக்கிஷங்களை வெளித்தருவீர் – 2`,
    _id: '1',
    scale: 'G',
    tempo: '120',
    style: '123 (Disco)',
    beat: '3/4',
  };
  useEffect(() => {
    navigation.setOptions({
      title: songData.title,
    });
  }, []);
  return (
    <SurfaceLayout>
      <View style={styles.container}>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>{songData.scale} </Text>
          <Text style={styles.subtitle}>{songData.beat} </Text>
          <Text style={styles.subtitle}>R-{songData.style} </Text>
          <Text style={styles.subtitle}>T-{songData.tempo} </Text>
        </View>
        <ScrollView>
          <Text style={{color: '#3683AF'}}>{songData.lyrics}</Text>
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
