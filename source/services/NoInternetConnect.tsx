import React, { useState } from 'react'
import { View, Text, Appearance, StyleSheet } from 'react-native'
import AnimatedLottieView from 'lottie-react-native'
import { F60016, F60024, colorBackGround, darkBackGround } from '../Theme'
import * as LocalStorage from '../services/LocalStorage';
import { LocalStorageKeys, String } from '../constants'
import { ButtonComponent } from '../components';
import NetInfo from "@react-native-community/netinfo";

export const NoInternetConnect = () => {
    let colorScheme = LocalStorage.getValue(LocalStorageKeys.DarkMode);
    const [isLoading, setIsLoading] = useState(false);
    (colorScheme == null || colorScheme == undefined) && Appearance.getColorScheme();
    const HandleTryAgain = () => {
        setIsLoading(true)

        setTimeout(() => {
            NetInfo.fetch().then(state => {
                setIsLoading(false)
            }).catch((err) => {
                setIsLoading(false)
            }).finally(() => {
                setIsLoading(false)
            })
        }, 3000)


    }
    return (
        <>

            <View style={[style.main, darkBackGround(colorScheme)]}>
                <AnimatedLottieView
                    style={style.animation}
                    source={require('../assets/noInternet.json')} autoPlay />

                <Text style={[F60024?.textStyle, { marginTop: 10 }, colorBackGround(colorScheme)]}>{String?.noInterNetScreen?.title}</Text>
                <Text style={[F60016?.semiBolt, style.subText, colorBackGround(colorScheme)]}>{String?.noInterNetScreen?.subTitle}</Text>
                <ButtonComponent loading={isLoading} buttonTitle={String?.noInterNetScreen?.buttonTitle} onPrees={() => { HandleTryAgain() }}
                    wrapperStyle={style.button} />
            </View>
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