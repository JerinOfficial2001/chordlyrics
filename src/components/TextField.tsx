import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';

type Props = {
  label: string;
  value: any;
  type?: any;
  onChange: any;
  isVisible?: boolean;
  Icon?: any;
  background?: any;
  width?: any;
  placeholder?: any;
  isBigInput?: boolean;
};

const TextField = ({
  label,
  type,
  value,
  onChange,
  isVisible,
  Icon,
  width,
  isBigInput,
  placeholder,
}: Props) => {
  const styles = StyleSheet.create({
    inputField: {
      width: width ? width : '100%',
    },
  });
  return (
    <TextInput
      multiline={isBigInput}
      secureTextEntry={isVisible}
      onChangeText={onChange}
      label={label}
      keyboardType={type ? type : 'default'}
      value={value}
      outlineStyle={{
        borderColor: '#C3E0F0',
      }}
      theme={{
        colors: {primary: '#3683AF'},
      }}
      mode="outlined"
      style={[
        styles.inputField,
        isBigInput ? {flex: 1, textAlignVertical: 'top'} : {height: 50},
      ]}
      right={<TextInput.Icon icon={() => Icon} />}
      placeholder={placeholder}
    />
  );
};

export default TextField;
