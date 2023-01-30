import React from 'react'
import { View, Text, Appearance } from 'react-native'
import AnimatedLottieView from 'lottie-react-native'
import { F60016, F60024, colorBackGround, darkBackGround } from '../Theme'
import * as LocalStorage from '../services/LocalStorage';
import { LocalStorageKeys } from '../constants'

export const NoInternetConnect = () => {
    let colorScheme = LocalStorage.getValue(LocalStorageKeys.DarkMode);
    (colorScheme == null || colorScheme == undefined) && Appearance.getColorScheme();
    return (
        <View style={[{ flex: 1, alignItems: 'center', paddingTop: 150, paddingHorizontal: 16, }, darkBackGround(colorScheme)]}>
            <AnimatedLottieView
                style={{ height: 100, width: 100 }}
                source={require('../assets/noInternet.json')} autoPlay />

            <Text style={[F60024?.textStyle, { marginTop: 10 }, colorBackGround(colorScheme)]}>No Internet Connection</Text>
            <Text style={[F60016?.semiBolt, { textAlign: 'center', marginTop: 20 }, colorBackGround(colorScheme)]}>Make sure Wi-Fi or Mobile data is Turned on {`\n`} then try agin</Text>
        </View>
    )
}