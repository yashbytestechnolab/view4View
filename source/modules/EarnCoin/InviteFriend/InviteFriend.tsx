import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { Colors, F40014, F60024 } from '../../../Theme'
import { String } from '../../../constants'
import { InviteFrdSvg } from '../../../assets/icons'
import { ButtonComponent, Header } from '../../../components'
import { style } from './style'

export const InviteFriend = () => {
    return (
        <>
            <SafeAreaView style={{ backgroundColor: Colors?.gradient1 }} />
            <Header title={String?.inviteFrd?.headerTitle} showCoin={false} showBacKIcon={true} />
            <ScrollView
                style={style.main}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={String.commonString.handled}
                scrollEnabled={true}
                contentContainerStyle={style.scrollContain}>
                <Text style={[F60024?.textStyle, style.title]}>{String?.inviteFrd?.title}</Text>
                <Text style={[F40014?.main, style.subText]}>{String?.inviteFrd?.subTitle}</Text>
                <View>
                    <InviteFrdSvg />
                </View>
                <ButtonComponent wrapperStyle={style.button} buttonTitle={String?.inviteFrd?.button} onPrees={() => { }} />
            </ScrollView>
        </>

    )
}

