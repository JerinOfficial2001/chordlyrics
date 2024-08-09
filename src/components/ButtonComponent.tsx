import React from 'react';
import {ActivityIndicator, Button} from 'react-native-paper';
import {StyleSheet} from 'react-native';
type Props = {
  name: string;
  onPress: any;
  isLoading: boolean;
};
const ButtonComponent = ({name, onPress, isLoading}: Props) => {
  return (
    <Button
      onPress={isLoading ? undefined : onPress}
      mode="contained"
      textColor="#3683AF"
      contentStyle={styles.button}>
      {isLoading ? <ActivityIndicator color="#3683AF" /> : name}
    </Button>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#C3E0F0',
  },
});

export default ButtonComponent;
