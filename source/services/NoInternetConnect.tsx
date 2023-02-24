import React, { useEffect, useState, } from 'react'
import { View, Text, Modal, StyleSheet } from 'react-native'
import { ButtonComponent } from '../components';
import NetInfo from "@react-native-community/netinfo";
import { String } from '../constants';
export const NoInternetConnect = ({ isInternetBack, setIsInternetBack }: any) => {
    const [isConncectLoading, setIsConncectLoading] = useState(false)

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            if (state !== null) {
                setIsInternetBack(state?.isConnected)
            }
        });
        return () => { unsubscribe(); }
    }, [])

    const HandleTryAgain = () => {
        setIsConncectLoading(true)
        NetInfo.refresh().then(state => {
            if (state !== null) {

            }
        }).finally(() => setTimeout(() => setIsConncectLoading(false), 3000));
    }

    return (
        <>
            <Modal
                transparent
                visible={!isInternetBack}
                animationType="none"
                supportedOrientations={['portrait', 'landscape']}>
                <View style={[style.main,]}>
                    <Text style={[{ marginTop: 10 }]}>{String?.noInterNetScreen?.title}</Text>
                    <Text style={[style.subText,]}>{String?.noInterNetScreen?.subTitle}</Text>
                    <ButtonComponent loading={isConncectLoading} buttonTitle={String?.noInterNetScreen?.buttonTitle} onPrees={() => { HandleTryAgain() }}
                        wrapperStyle={style.button} />
                </View>
            </Modal>
        </>

    )
}
const style = StyleSheet.create({
    main: {
        flex: 1, alignItems: 'center', paddingTop: 150, paddingHorizontal: 16,
    }, animation: {
        height: 100, width: 100
    },
    subText: { textAlign: 'center', marginTop: 20 },
    button: { width: 312, marginTop: 75, backgroundColor: '#2E8B79' }

})