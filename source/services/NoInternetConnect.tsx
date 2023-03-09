import React, { useEffect, useState, } from 'react'
import { View, Text, Modal, StyleSheet } from 'react-native'
import AnimatedLottieView from 'lottie-react-native'
import { Colors, F60016, F60024, colorBackGround, darkBackGround } from '../Theme'
import { ButtonComponent } from '../components';
import NetInfo from "@react-native-community/netinfo";
import { String } from '../constants';
export const NoInternetConnect = ({ darkModeTheme, isInternetBack, setIsInternetBack }: any) => {
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
                <View style={[style.main, darkBackGround(darkModeTheme)]}>
                    <AnimatedLottieView
                        style={style.animation}
                        source={require('../assets/noInternet.json')} autoPlay />

                    <Text style={[F60024?.textStyle, { marginTop: 10 }, colorBackGround(darkModeTheme)]}>{String?.noInterNetScreen?.title}</Text>
                    <Text style={[F60016?.semiBolt, style.subText, colorBackGround(darkModeTheme)]}>{String?.noInterNetScreen?.subTitle}</Text>
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
    button: { width: 312, marginTop: 75, backgroundColor: Colors.primaryRed }

})