import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import React, {useState, useEffect} from 'react';
import TextField from '../TextField';
import ButtonComponent from '../ButtonComponent';
import {useNavigation} from '@react-navigation/native';

type Props = {
  isVisible: boolean;
  handleDismiss: any;
  name: string;
  data?: any;
};

const AddDataModal = ({name, isVisible, handleDismiss, data}: Props) => {
  const navigation = useNavigation<any>();
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
    },

    {
      name: 'keyboardModal',
      value: inputDatas.keyboardModal,
      label: 'Keyboard Modal',
      onChange: (value: any) => handleOnchange('keyboardModal', value),
      type: 'text',
      keyboardtype: 'default',
    },
    {
      name: 'language',
      value: inputDatas.language,
      label: 'Song Language',
      onChange: (value: any) => handleOnchange('language', value),
      type: 'text',
      keyboardtype: 'default',
    },
    {
      name: 'style',
      value: inputDatas.style,
      label: 'Style/Rhythm',
      onChange: (value: any) => handleOnchange('style', value),
      type: 'text',
      keyboardtype: 'default',
    },
    {
      name: 'scale',
      value: inputDatas.scale,
      label: 'Scale',
      onChange: (value: any) => handleOnchange('scale', value),
      type: 'merge',
      keyboardtype: 'default',
    },
    {
      name: 'tempo',
      value: inputDatas.tempo,
      label: 'Tempo',
      onChange: (value: any) => handleOnchange('tempo', value),
      type: 'merge',
      keyboardtype: 'number-pad',
    },

    {
      name: 'beat',
      value: inputDatas.beat,
      label: 'Beat',
      onChange: (value: any) => handleOnchange('beat', value),
      type: 'choose',
      keyboardtype: 'default',
    },
  ];

  const Beats = ['1/4', '2/4', '3/4', '4/4', '6/8', '7/8'];
  const [selectedBeat, setselectedBeat] = useState(
    Beats.map(() => ({isSelected: false})),
  );
  useEffect(() => {
    setselectedBeat(Beats.map((_, index) => ({isSelected: index === 0})));
    setinputDatas({
      title: data ? data.title : '',
      scale: data ? data.scale : '',
      tempo: data ? data.tempo : '',
      style: data ? data.style : '',
      beat: data ? data.beat : '1/4',
      status: data ? data.status : 'pending',
      isPinned: data ? data.isPinned : false,
      language: data ? data.language : '',
      keyboardModal: data ? data.keyboardModal : '',
    });
  }, [isVisible]);

  const handleBeatSelection = (index: any) => {
    const prevBeats = selectedBeat.map(() => ({isSelected: false}));
    prevBeats[index].isSelected = !prevBeats[index].isSelected;
    setselectedBeat(prevBeats);
    handleFormDatas('beat', Beats[index]);
  };
  const handleSubmit = () => {
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
      });
      handleDismiss();
    } else {
      Alert.alert('All fields are mandatory');
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
                  />
                );
              } else if (elem.type == 'choose') {
                return (
                  <View style={styles.chipContainer}>
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
                  />
                );
              }
            })}
          </View>
          <ButtonComponent onPress={handleSubmit} name="Next" />
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
