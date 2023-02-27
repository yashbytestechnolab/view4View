import React from "react";
import { View, Image, Text, Dimensions, StatusBar } from 'react-native';
import { Fonts, Images } from '../../assets';
import { Colour } from "../../theme";
import {
    responsiveHeight as rh,
    responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import { Centavizer } from "../../assets/icons/Centavizer";
import { SplashScreenLogo } from "../../assets/icons/SplashScreenLogo";
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
const SplashScreen = () => {
    return (
        <>
        <StatusBar
         barStyle="light-content"
        backgroundColor={Colour?.PrimaryBlue}
      />
            <View style={{
                flex: 1,
                width: width,
                height: height,
                backgroundColor: Colour.PrimaryBlue,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <View>
              <SplashScreenLogo/>
                </View>
                {/* <Image source={Images.logoCentavizer} style={{ height:122, width:256 }} /> */}
            </View>
            <View style={{
                position: 'absolute', bottom: rh(10), right: 0, left: 0, justifyContent: "center",
                alignItems: "center",
            }}>
                <Text style={{ color: Colour.primaryGreen, fontFamily: Fonts.QuicksandMedium, fontWeight: '700', fontSize: 23 }}>
                    Be active.
                </Text>
                <Text style={{ color: Colour.blueBarry, fontFamily: Fonts.QuicksandMedium, fontWeight: '700', fontSize: 23 }}>
                    Be rewarded.
                </Text>
            </View>
        </>
    )
}
export default SplashScreen;