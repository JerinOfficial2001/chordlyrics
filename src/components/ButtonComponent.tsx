import React from 'react';
import {Button} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const ButtonComponent = ({name, onPress}: any) => {
  return (
    <Button
      onPress={onPress}
      mode="contained"
      textColor="#3683AF"
      contentStyle={styles.button}>
      {name}
    </Button>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#C3E0F0',
  },
});

export default ButtonComponent;
