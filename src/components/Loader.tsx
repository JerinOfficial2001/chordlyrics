import {View, Text, Image} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import FastImage from 'react-native-fast-image';

type Props = {
  empty?: boolean;
};

const Loader = ({empty}: Props) => {
  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      {empty ? (
        <Image
          source={require('../assets/GIFs/Empty.webp')}
          style={{width: 300, height: 400}}
        />
      ) : (
        <FastImage
          style={{width: 300, height: 300, borderRadius: 100}}
          source={require('../assets/GIFs/piano.gif')}
          resizeMode={FastImage.resizeMode.contain}
        />
        // <ActivityIndicator color="#3683AF" size={'large'} />
      )}
    </View>
  );
};

export default Loader;
