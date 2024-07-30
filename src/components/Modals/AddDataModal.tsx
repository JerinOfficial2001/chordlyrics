import {View, Text, StyleSheet} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import React from 'react';

type Props = {
  isVisible: boolean;
  handleDismiss: any;
};

const AddDataModal = ({isVisible, handleDismiss}: Props) => {
  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={handleDismiss}
        style={styles.container}>
        <View style={styles.modal}>
          <Text>AddDataModal</Text>
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
    backgroundColor: '#C7D7E0',
    borderRadius: 10,
    padding: 10,
  },
});
export default AddDataModal;
