import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useCallback, useState} from 'react';
import SurfaceLayout from '../layouts/SurfaceLayout';
import TextField from '../components/TextField';
import {useGlobalContext} from '../utils/isAuthenticated';
import {useFocusEffect} from '@react-navigation/native';
import ButtonComponent from '../components/ButtonComponent';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import AddDataModal from '../components/Modals/AddDataModal';

type Props = {};

const AddSong = ({route}: any) => {
  const {data} = route.params;
  const [lyrics, setlyrics] = useState('');
  const {setshowFloatButton, showFloatButton} = useGlobalContext();
  const [isOpen, setisOpen] = useState(false);
  const handleDismiss = () => {
    setisOpen(false);
  };
  useFocusEffect(
    useCallback(() => {
      setshowFloatButton(false);
    }, [showFloatButton]),
  );
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
          <ButtonComponent name="Submit" />
        </View>
      </View>
      <AddDataModal
        handleDismiss={handleDismiss}
        isVisible={isOpen}
        name="Edit Notes"
        data={data}
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
