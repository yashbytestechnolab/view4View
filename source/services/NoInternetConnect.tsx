import React, { useEffect, useState, } from 'react'
import { View, Text, Modal } from 'react-native'
import AnimatedLottieView from 'lottie-react-native'
import { F60016, F60024, colorBackGround, darkBackGround } from '../Theme'
import { ButtonComponent } from '../components';
import NetInfo from "@react-native-community/netinfo";
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
                <View style={[{ flex: 1, alignItems: 'center', paddingTop: 150, paddingHorizontal: 16, }, darkBackGround(darkModeTheme)]}>
                    <AnimatedLottieView
                        style={{ height: 100, width: 100 }}
                        source={require('../assets/noInternet.json')} autoPlay />
                    <Text style={[F60024?.textStyle, { marginTop: 10 }, colorBackGround(darkModeTheme)]}>No Internet Connection</Text>
                    <Text style={[F60016?.semiBolt, { textAlign: 'center', marginTop: 20 }, colorBackGround(darkModeTheme)]}>Make sure Wi-Fi or Mobile data is Turned on {`\n`} then try agin</Text>
                    <ButtonComponent loading={isConncectLoading} buttonTitle={'Try again'} onPrees={() => { HandleTryAgain() }}
                        wrapperStyle={{ width: 312, marginTop: 75, backgroundColor: '#2E8B79' }} />
                </View>
            </Modal>
        </>

    )
}