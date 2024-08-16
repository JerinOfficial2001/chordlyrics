import {View, Text} from 'react-native';
import {ActivityIndicator, Button, Modal, Portal} from 'react-native-paper';
import React from 'react';

type Props = {
  isVisible: boolean;
  handleDismiss: any;
  id: any;
  handleDelete: any;
};

const DeleteModal = ({isVisible, handleDismiss, id, handleDelete}: Props) => {
  return (
    <Portal>
      <Modal
        style={{alignItems: 'center', justifyContent: 'center'}}
        visible={isVisible}
        onDismiss={handleDismiss}>
        <View
          style={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 5,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>
            Are you sure?
          </Text>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>
            Your song cannot be restored
          </Text>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              minWidth: 300,
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <Button onPress={handleDismiss}>Cancel</Button>
            <Button
              onPress={() => {
                handleDelete(id);
              }}>
              Delete
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default DeleteModal;
