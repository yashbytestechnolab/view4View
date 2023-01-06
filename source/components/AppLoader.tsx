import React, { useContext } from 'react';
import { View, Modal, StyleSheet, ActivityIndicator } from 'react-native';

import { InputContextProvide } from '../context/CommonContext';
import { Colors } from '../Theme';

const AppLoader = () => {
    const { storeCreator: { loading} }: any = useContext(InputContextProvide)
    return (
        <Modal
            transparent
            visible={loading}
            animationType="none"
            supportedOrientations={['portrait', 'landscape']}>
            <View style={style.overlayStyle}>
                <ActivityIndicator size="large" color={Colors.primaryRed} />
            </View>
        </Modal>
    );
};

export default AppLoader;

const style = StyleSheet.create({
    overlayStyle: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});