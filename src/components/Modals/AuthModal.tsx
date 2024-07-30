import {View, Text} from 'react-native';
import {Modal} from 'react-native-paper';
import React from 'react';

type Props = {
  isVisible: boolean;
  handleDismiss: any;
};

const AuthModal = ({isVisible, handleDismiss}: Props) => {
  return (
    <Modal visible={isVisible} onDismiss={handleDismiss}>
      <Text>AuthModal</Text>
    </Modal>
  );
};

export default AuthModal;
