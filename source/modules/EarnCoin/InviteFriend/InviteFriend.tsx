import { View, Text, SafeAreaView, ScrollView, Platform, Linking, StatusBar } from 'react-native'
import React from 'react'
import remoteConfig from '@react-native-firebase/remote-config';
import Share from 'react-native-share';

import { Colors, F40014, F60024 } from '../../../Theme'
import { String } from '../../../constants'
import { InviteFrdSvg } from '../../../assets/icons'
import { ButtonComponent, Header } from '../../../components'
import { style } from './style'

export const InviteFriend = ({ notifyUpdate }: any) => {
    const getConfigValue: any = remoteConfig().getValue("UpdateDescription").asString()
    const data = JSON?.parse(getConfigValue)
    const ReferEarn = `View4view is very usefull app and you increase your view and earn coins.\n\nDownload now:  \n\niOS App: ${data?.Upadte?.ios} \n\nAndroid App: ${data?.Upadte?.android}`;
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

    return (
        <>
            <SafeAreaView style={{ backgroundColor: Colors?.gradient1 }} />
            <StatusBar backgroundColor={Colors?.gradient1} barStyle={'light-content'} />
            {!notifyUpdate && <Header title={String?.inviteFrd?.headerTitle} showCoin={false} showBacKIcon={true} />}
            <ScrollView
                style={style.main}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={String.commonString.handled}
                scrollEnabled={true}
                contentContainerStyle={style.scrollContain}>
                <Text style={[F60024?.textStyle, style.title]}>{notifyUpdate ? data?.title : String?.inviteFrd?.title}</Text>
                <Text style={[F40014?.main, style.subText]}>{notifyUpdate ? data?.subTtile : String?.inviteFrd?.subTitle}</Text>
                <View>
                    <InviteFrdSvg />
                </View>
                <ButtonComponent wrapperStyle={style.button} buttonTitle={notifyUpdate ? "Update" : String?.inviteFrd?.button} onPrees={() => {
                    handleButton(notifyUpdate)

                }} />
            </ScrollView>
        </>

    )
}

