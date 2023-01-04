import { SafeAreaView, StatusBar, ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, F40012Black, F60016, F60024, F70032 } from '../../../Theme'
import { ButtonComponent, Header } from '../../../components'
import { ROUTES, String } from '../../../constants'
import { EarnCoin, ViewCoinIcon } from '../../../assets/icons'
import { get_coins } from '../../../services/FireStoreServices'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { style } from './style'

export const ViewCoin = () => {
    const [getCoin, setGetCoin] = useState<number>(0);
    const focus: boolean = useIsFocused();
    const navigation: any = useNavigation()

    /**
     * return total coins
     */
    useEffect(() => {
        get_coins().then((res) => {
            setGetCoin(res?._data?.coin)
        })
    }, [focus, getCoin]);

    const handleSubTitle = (text: string) => {
        return (
            <View style={style.subTextWrapper}>
                <View style={style.dot} />
                <Text style={F40012Black?.main}>{text}</Text>
            </View>
        )
    }
    return (
        <>
            <SafeAreaView style={style.safearea} />

            <StatusBar backgroundColor={Colors?.gradient1} barStyle={String?.StatusBar?.lightContent} />
            <SafeAreaView style={style.main}>
                <Header title={String?.headerTitle?.YourCoin} showBacKIcon={true} />
                <ScrollView style={style.scrollWrapper} showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={String.commonString.handled}
                    scrollEnabled={true}
                    contentContainerStyle={style.scrollContain}>
                    <Text style={[F60024?.textStyle, style.textAlign]}> {String?.viewCoinScreen?.yourCoins}</Text>
                    <View style={style.coinTextWrapper}>
                        <EarnCoin height={40} width={32} />
                        <Text style={[F70032.textStyle, style.paddingLeft]}>{getCoin}</Text>
                    </View>
                    <Text style={[F60016?.textStyle, { color: Colors?.black }]}>{String?.viewCoinScreen?.title}</Text>
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
                    <ButtonComponent onPrees={() => { navigation?.navigate(ROUTES?.CREATECAMP) }} buttonTitle={String?.viewCoinScreen?.buttonText} />

                </ScrollView>
            </SafeAreaView>
        </>

    )
}
