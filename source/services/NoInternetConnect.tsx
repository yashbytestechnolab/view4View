import { View, Text } from 'react-native'
import React from 'react'
import AnimatedLottieView from 'lottie-react-native'
import { F60012, F60012Bold, F60016, F60024 } from '../Theme'

export const NoInternetConnect = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', marginTop: 150 }}>
            <AnimatedLottieView
                style={{ height: 100, width: 100 }}
                source={require('../assets/noInternet.json')} autoPlay />

            <Text style={[F60024?.textStyle, { marginTop: 10 }]}>No Internet Connection</Text>
            <Text style={[F60016?.semiBolt, { textAlign: 'center',marginTop:20 }]}>Make sure Wi-Fi or Mobile data is Turned on {`\n`} then try agin</Text>
        </View>
    )
}