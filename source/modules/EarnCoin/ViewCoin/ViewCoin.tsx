import { SafeAreaView, StatusBar, ScrollView, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { colorBackGround, Colors, darkBackGround, F40012Black, F60016, F60024, F70032 } from '../../../Theme'
import { ButtonComponent, Header } from '../../../components'
import { ROUTES, String } from '../../../constants'
import { BuyCoinIcon, ViewCoinIcon } from '../../../assets/icons'
import { useNavigation } from '@react-navigation/native'
import { style } from './style'
import { InputContextProvide } from '../../../context/CommonContext'
import { person } from '../../View/increment'

export const ViewCoin = () => {
    const { storeCreator: { coinBalance: { getBalance }, darkModeTheme } }: any = useContext(InputContextProvide)
    const navigation: any = useNavigation()

    const handleSubTitle = (text: string) => {
        return (
            <View style={style.subTextWrapper}>
                <View style={[style.dot, { backgroundColor: darkModeTheme ? Colors.white : Colors?.black }]} />
                <Text style={[F40012Black?.main, colorBackGround(darkModeTheme)]}>{text}</Text>
            </View>
        )
    }

    return (
        <>
            <SafeAreaView style={style.safearea} />
            <StatusBar backgroundColor={Colors?.gradient1} barStyle={String?.StatusBar?.lightContent} />
            <SafeAreaView style={[style.main, darkBackGround(darkModeTheme)]}>
                <Header title={String?.headerTitle?.YourCoin} showCoin={false} showBacKIcon={true} />
                <ScrollView style={style.scrollWrapper} showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={String.commonString.handled}
                    scrollEnabled={true}
                    contentContainerStyle={[style.scrollContain, darkBackGround(darkModeTheme)]}>
                    <Text style={[F60024?.textStyle, style.textAlign, colorBackGround(darkModeTheme)]}> {String?.viewCoinScreen?.yourCoins}</Text>
                    <View style={style.coinTextWrapper}>
                        <BuyCoinIcon height={40} width={32} />
                        <Text style={[F70032.textStyle, style.paddingLeft,]}>{getBalance}</Text>
                    </View>
                    <Text style={[F60016?.textStyle, { color: Colors?.black }, colorBackGround(darkModeTheme)]}>{String?.viewCoinScreen?.title}</Text>
                    <View style={style.subTextMargin}>
                        {handleSubTitle(String?.viewCoinScreen?.subLine1)}
                        {handleSubTitle(String?.viewCoinScreen?.subLine2)}
                        {handleSubTitle(String?.viewCoinScreen?.subLine3)}
                        {handleSubTitle(String?.viewCoinScreen?.subLine4)}
                        {handleSubTitle(String?.viewCoinScreen?.subLine5)}
                    </View>
                    <View style={style.viewCoinWrapper}>
                        <ViewCoinIcon />
                        <Text style={[F60016?.textStyle, style.viewCoinText]}>{String?.viewCoinScreen?.bottomsubLine}</Text>
                    </View>
                    <ButtonComponent onPrees={() => navigation?.navigate(person?.routesName == "VIEWCOIN" ? ROUTES?.EARNCOINS_LANDING : ROUTES?.EARNCOINS)} buttonTitle={String?.viewCoinScreen?.buttonText} />
                </ScrollView>
            </SafeAreaView>
        </>

    )
}
