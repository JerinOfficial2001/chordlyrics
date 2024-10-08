import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import React, {useState, useEffect} from 'react';
import TextField from '../TextField';
import ButtonComponent from '../ButtonComponent';
import {useNavigation} from '@react-navigation/native';
import {isNetworkAvailable} from '../../controllers/songs';

type Props = {
  isVisible: boolean;
  handleDismiss: any;
  name: string;
  data?: any;
  keyData?: any;
};

const AddDataModal = ({
  name,
  isVisible,
  handleDismiss,
  data,
  keyData,
}: Props) => {
  const navigation = useNavigation<any>();
  const [isLoading, setisLoading] = useState(false);
  const [inputDatas, setinputDatas] = useState({
    title: '',
    scale: '',
    tempo: '',
    style: '',
    beat: '1/4',
    status: 'pending',
    isPinned: false,
    language: '',
    keyboardModal: '',
    _id: '',
    user_id: '',
  });
  const handleOnchange = (key: string, value: any) => {
    setinputDatas(prev => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleFormDatas = (name: string, value: any) => {
    setinputDatas(prev => ({...prev, [name]: value}));
  };
  const InputFields = [
    {
      name: 'title',
      value: inputDatas.title,
      label: 'Song Name',
      onChange: (value: any) => handleOnchange('title', value),
      type: 'text',
      keyboardtype: 'default',
      placeholder: 'type title here',
    },

    {
      name: 'keyboardModal',
      value: inputDatas.keyboardModal,
      label: 'Keyboard Model',
      onChange: (value: any) => handleOnchange('keyboardModal', value),
      type: 'text',
      keyboardtype: 'default',
      placeholder: 'eg:Yamaha i455',
    },
    {
      name: 'language',
      value: inputDatas.language,
      label: 'Song Language',
      onChange: (value: any) => handleOnchange('language', value),
      type: 'text',
      keyboardtype: 'default',
      placeholder: 'eg:Tamil',
    },
    {
      name: 'style',
      value: inputDatas.style,
      label: 'Style/Rhythm',
      onChange: (value: any) => handleOnchange('style', value),
      type: 'text',
      keyboardtype: 'default',
      placeholder: 'eg:Disco or index',
    },
    {
      name: 'scale',
      value: inputDatas.scale,
      label: 'Scale',
      onChange: (value: any) => handleOnchange('scale', value),
      type: 'merge',
      keyboardtype: 'default',
      placeholder: 'eg:D',
    },
    {
      name: 'tempo',
      value: inputDatas.tempo,
      label: 'Tempo',
      onChange: (value: any) => handleOnchange('tempo', value),
      type: 'merge',
      keyboardtype: 'number-pad',
      placeholder: 'eg:120',
    },

    {
      name: 'beat',
      value: inputDatas.beat,
      label: 'Beat',
      onChange: (value: any) => handleOnchange('beat', value),
      type: 'choose',
      keyboardtype: 'default',
      placeholder: '',
    },
  ];

  const Beats = ['1/4', '2/4', '3/4', '4/4', '6/8', '7/8'];
  const [selectedBeat, setselectedBeat] = useState(
    Beats.map(() => ({isSelected: false})),
  );

  useEffect(() => {
    setselectedBeat(
      Beats.map((_, index) => ({
        isSelected: index === Beats.indexOf(inputDatas.beat),
      })),
    );
    setinputDatas({
      title: data ? data.title : '',
      scale: data ? data.scale : '',
      tempo: data
        ? typeof data.tempo == 'number'
          ? JSON.stringify(data.tempo)
          : data.tempo
        : '',
      style: data ? data.style : '',
      beat: data ? data.beat : '1/4',
      status: data ? data.status : 'pending',
      isPinned: data ? data.isPinned : false,
      language: data ? data.language : '',
      keyboardModal: data ? data.keyboardModal : '',
      _id: data ? data._id : '',
      user_id: data ? data.user_id : '',
    });
  }, [isVisible]);

  const handleBeatSelection = (index: any) => {
    const prevBeats = selectedBeat.map(() => ({isSelected: false}));
    prevBeats[index].isSelected = !prevBeats[index].isSelected;
    setselectedBeat(prevBeats);
    handleFormDatas('beat', Beats[index]);
  };
  const handleSubmit = async () => {
    const networkAvailable = await isNetworkAvailable();
    if (networkAvailable) {
      setisLoading(true);
      const data: any = {
        title: inputDatas.title,
        scale: inputDatas.scale,
        tempo: inputDatas.tempo,
        style: inputDatas.style,
        beat: inputDatas.beat,
        language: inputDatas.language,
        keyboardModal: inputDatas.keyboardModal,
      };
      const requiredField = [
        'title',
        'scale',
        'tempo',
        'style',
        'beat',
        'language',
        'keyboardModal',
      ];
      const isFilled = requiredField.every(elem => data[elem] != '');
      if (isFilled) {
        navigation.navigate('AddSong', {
          data: inputDatas,
          key: keyData,
        });
        handleDismiss();
      } else {
        ToastAndroid.show('All fields are mandatory', ToastAndroid.SHORT);
      }
      setisLoading(false);
    } else {
      ToastAndroid.show('You are offline', ToastAndroid.SHORT);
    }
  };
  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={handleDismiss}
        style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.header}>Add Song</Text>
          <View style={styles.inputsContainer}>
            {InputFields.map((elem, index) => {
              if (elem.type == 'merge') {
                return (
                  <TextField
                    key={index}
                    label={elem.label}
                    onChange={elem.onChange}
                    value={elem.value}
                    type={elem.keyboardtype}
                    width={'48.5%'}
                    placeholder={elem.placeholder}
                  />
                );
              } else if (elem.type == 'choose') {
                return (
                  <View key={index} style={styles.chipContainer}>
                    <Text style={styles.chipHeader}>{elem.label}</Text>
                    <View style={styles.chipInput}>
                      {Beats.map((beat, beat_index) => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              handleBeatSelection(beat_index);
                            }}
                            style={[
                              styles.chip,
                              {
                                backgroundColor: selectedBeat[beat_index]
                                  .isSelected
                                  ? '#C7D7E0'
                                  : '#D9D9D9',
                                borderWidth: selectedBeat[beat_index].isSelected
                                  ? 2
                                  : 0,
                              },
                            ]}
                            key={beat_index}>
                            <Text style={styles.chipLabel}>{beat}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                );
              } else {
                return (
                  <TextField
                    key={index}
                    label={elem.label}
                    onChange={elem.onChange}
                    value={elem.value}
                    type={elem.keyboardtype}
                    placeholder={elem.placeholder}
                  />
                );
              }
            })}
          </View>
          <ButtonComponent
            onPress={handleSubmit}
            name="Next"
            isLoading={isLoading}
          />
        </View>
      </Modal>
    </Portal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontWeight: 'bold',
    color: '#3683AF',
    textTransform: 'uppercase',
    fontSize: 20,
  },
  inputsContainer: {
    width: 350,
    gap: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chipContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    gap: 5,
  },
  chipHeader: {
    color: 'grey',
    marginLeft: 10,
  },
  chipInput: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    gap: 10,
  },
  chip: {
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 13,
    borderColor: '#3683AF',
  },
  chipLabel: {
    color: '#357FA896',
    fontWeight: 'bold',
  },
});
export default AddDataModal;
