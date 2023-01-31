import React, { useEffect, useState } from 'react'
import { View, Text, Appearance } from 'react-native'
import AnimatedLottieView from 'lottie-react-native'
import { F60016, F60024, colorBackGround, darkBackGround, Colors } from '../Theme'
import * as LocalStorage from '../services/LocalStorage';
import { LocalStorageKeys } from '../constants'
import { ButtonComponent } from '../components';
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
export const NoInternetConnect = () => {
    let colorScheme = LocalStorage.getValue(LocalStorageKeys.DarkMode);
    const [isLoading, setIsLoading] = useState(false);
    (colorScheme == null || colorScheme == undefined) && Appearance.getColorScheme();
    const netInfoStaus = useNetInfo()
    const status = netInfoStaus?.isConnected
    const HandleTryAgain = () => {
        // setIsLoading(true)
        // LocalStorage?.getValue(LocalStorageKeys?.UserId).then((res) => {
        //     res && setIsLoading(false)
        // }).catch((error) => { error && setIsLoading(false) }).finally(() => { setIsLoading(false) })
        setIsLoading(false)
        // LocalStorage?.getValue(LocalStorageKeys?.UserId).then((res) => {
        //     res && setIsLoading(false)
        // }).catch((error) => { error && setIsLoading(false) }).finally(() => { setIsLoading(false) })

        // setIsLoading(true)
        // NetInfo.fetch().then(state => {
        //     console.log("ssssss", state)
        //     setIsLoading(false)
        // }).catch((err) => {
        //     console.log("err", err);
        //     setIsLoading(false)
        // }).finally(() => {
        //     setIsLoading(false)
        // })

    }
    // useEffect(() => {
    //     const unsubscribe = NetInfo.addEventListener(currentState => {
    //         console.log(`Device is ${currentState.isConnected ? 'Connected' : 'not connected'}`);
    //     });

    //     return () => unsubscribe();
    // }, [])
    return (
        <>

            <View style={[{ flex: 1, alignItems: 'center', paddingTop: 150, paddingHorizontal: 16, }, darkBackGround(colorScheme)]}>
                <AnimatedLottieView
                    style={{ height: 100, width: 100 }}
                    source={require('../assets/noInternet.json')} autoPlay />

                <Text style={[F60024?.textStyle, { marginTop: 10 }, colorBackGround(colorScheme)]}>No Internet Connection</Text>
                <Text style={[F60016?.semiBolt, { textAlign: 'center', marginTop: 20 }, colorBackGround(colorScheme)]}>Make sure Wi-Fi or Mobile data is Turned on {`\n`} then try agin</Text>
                <ButtonComponent loading={isLoading} buttonTitle={'Try again'} onPrees={() => { HandleTryAgain() }}
                    wrapperStyle={{ width: 312, marginTop: 75, backgroundColor: '#2E8B79' }} />
            </View>
        </>

    )
}