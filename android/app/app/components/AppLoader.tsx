import React, {useContext} from 'react';
import {View, Modal, StyleSheet, ActivityIndicator} from 'react-native';
import {CommonContext} from '../context/AppContext';
import { Colour } from '../theme';

const AppLoader = () => {
  const {loading} = useContext(CommonContext);
  return (
    <Modal
      transparent
      visible={loading}
      animationType="none"
      supportedOrientations={['portrait', 'landscape']}>
      <View style={style.overlayStyle}>
        <ActivityIndicator size="large" color={Colour.primaryGreen} />
      </View>
    </Modal>
  );
};

export default AppLoader;

const style = StyleSheet.create({
  overlayStyle: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
