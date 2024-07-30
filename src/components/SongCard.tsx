import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';

// type Props = {
//   variant: string;
// };

const SongCard = ({props, onPress}: any) => {
  const styles = StyleSheet.create({
    cardShadow: {
      borderRadius: 16,
      backgroundColor: 'transparent',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      width: props.variant == 'Index' ? 80 : '100%',
    },
    container: {
      borderRadius: 16,
      backgroundColor: '#C7D7E0',
      overflow: 'hidden',
      height:
        props.variant == 'Index' ? 80 : props.variant == 'Songs' ? 90 : 60,
      justifyContent: 'center',
      alignItems: props.variant == 'Songs' ? 'flex-start' : 'center',
      flexDirection: 'column',
      padding: 10,
      gap: props.variant == 'Songs' ? 10 : 0,
    },
    title: {
      color: '#3683AF',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginTop: props.total_songs ? 10 : 0,
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
  return (
    <Pressable
      onPress={onPress}
      style={{width: props.variant == 'Index' ? 80 : '100%'}}>
      <View style={styles.cardShadow}>
        <View style={styles.container}>
          {props.s_no ? (
            <Text style={styles.title}>
              {props.s_no} . {props.name}
            </Text>
          ) : (
            <Text style={styles.title}>{props.name}</Text>
          )}
          {props.total_songs && (
            <Text style={styles.subtitle}>{props.total_songs} Songs</Text>
          )}
          {props.variant == 'Songs' && (
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>{props.data.scale} </Text>
              <Text style={styles.subtitle}>{props.data.beat} </Text>
              <Text style={styles.subtitle}>R-{props.data.style} </Text>
              <Text style={styles.subtitle}>T-{props.data.tempo} </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default SongCard;
