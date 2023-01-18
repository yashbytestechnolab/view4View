import { View, Text, SafeAreaView, ScrollView, Platform, Linking, StatusBar, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import remoteConfig from '@react-native-firebase/remote-config';
import Share from 'react-native-share';
import { colorBackGround, Colors, darkBackGround, F40014, F60024 } from '../../../Theme'
import { String } from '../../../constants'
import { InviteFrdSvg } from '../../../assets/icons'
import { ButtonComponent, Header } from '../../../components'
import { style } from './style'
import { InputContextProvide } from '../../../context/CommonContext';
import Clipboard from '@react-native-clipboard/clipboard';
import { handleFirebaseError } from '../../../services/AlertMessage';

export const InviteFriend = ({ notifyUpdate }: any) => {
    const { storeCreator: { darkModeTheme } }: any = useContext(InputContextProvide)
    const d = "8140835436"
    const getConfigValue: any = remoteConfig().getValue("UpdateDescription").asString()
    const data = JSON?.parse(getConfigValue)
    const ReferEarn = `View4view is very usefull app and you increase your view and earn coins.\n\nDownload now:  \n\niOS App: ${data?.Upadte?.ios} \n\nAndroid App: ${data?.Upadte?.android}
    Referral code: ${d}`;
    const option = {
        title: 'Title',
        message: ReferEarn,
        subject: 'Subject',
    };
    const handleButton = (notifyUpdate: boolean) => {
        notifyUpdate ?
            Platform?.OS == 'android' ?
                Linking.openURL(data?.Upadte?.android) : Linking.openURL(data?.Upadte?.ios) :
            Share.open(option)
                .then((res: any) => {
                })
                .catch((err: any) => {
                });
    }
    const copyToClipboard = () => {
        Clipboard.setString(d?.toString());
    };

    return (
        <>
            <SafeAreaView style={{ backgroundColor: Colors?.gradient1 }} />
            <StatusBar backgroundColor={Colors?.gradient1} barStyle={'light-content'} />
            {!notifyUpdate && <Header title={String?.inviteFrd?.headerTitle} showCoin={false} showBacKIcon={true} />}
            <ScrollView
                style={[style.main, darkBackGround(darkModeTheme)]}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={String.commonString.handled}
                scrollEnabled={true}
                contentContainerStyle={[style.scrollContain, darkBackGround(darkModeTheme)]}>
                <Text style={[F60024?.textStyle, style.title,]}>{notifyUpdate ? data?.title : String?.inviteFrd?.title}</Text>
                <Text style={[F40014?.main, style.subText, colorBackGround(darkModeTheme)]}>{notifyUpdate ? data?.subTtile : String?.inviteFrd?.subTitle}</Text>
                <View>
                    <InviteFrdSvg />
                </View>
                <TouchableOpacity
                    activeOpacity={1}
                    style={{
                        paddingHorizontal: 8,
                        height: 50, marginTop: 25,
                        marginHorizontal: 16,
                        backgroundColor: Colors?.shadowPink,
                        borderWidth: 1,
                        justifyContent: 'center',
                        borderStyle: 'dashed',
                        alignItems: 'center',
                        borderColor: 'red',
                    }} onPress={() => {
                        copyToClipboard()
                        handleFirebaseError("refCode")

                    }}>
                    <Text style={[F60024?.textStyle, { textAlign: 'center', color: Colors?.gray, }]} numberOfLines={1}>8140835436</Text>

                </TouchableOpacity>
                <ButtonComponent wrapperStyle={style.button} buttonTitle={notifyUpdate ? "Update" : String?.inviteFrd?.button} onPrees={() => {
                    handleButton(notifyUpdate)

                }} />
            </ScrollView>
        </>

    )
}

