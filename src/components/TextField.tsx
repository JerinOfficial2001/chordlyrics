import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';

type Props = {
  label: string;
  value: any;
  type: any;
  onChange: any;
  isVisible: boolean;
  Icon?: any;
};

const TextField = ({label, type, value, onChange, isVisible, Icon}: Props) => {
  return (
    <TextInput
      secureTextEntry={isVisible}
      onChangeText={onChange}
      label={label}
      keyboardType={type}
      value={value}
      outlineStyle={{
        borderColor: '#C3E0F0',
      }}
      theme={{colors: {primary: '#3683AF'}}}
      mode="outlined"
      style={styles.inputField}
      right={<TextInput.Icon icon={() => Icon} />}
    />
  );
};
const styles = StyleSheet.create({
  inputField: {
    height: 50,
    width: '100%',
  },
});
export default TextField;
