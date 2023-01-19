import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { String } from '../../../constants';
import { colorBackGround, F40014, F60024 } from '../../../Theme';
import { InputContextProvide } from '../../../context/CommonContext';

interface headerProps {
    mainTitle: string;
    miniTitle: string;
    actionTitle: string,
    onPress: (value:string|any|number) => {} | void
}

export const AuthHeader = (pros: headerProps) => {
    const { storeCreator: { darkModeTheme } }: any = useContext(InputContextProvide)
    const { mainTitle, miniTitle, onPress, actionTitle } = pros
    return (
        <>
            <View style={innerStyles.welcomeHeader}>
                <Text style={[F60024.textStyle,colorBackGround(darkModeTheme)]}>
                    {mainTitle}
                </Text>
            </View>

            <View style={innerStyles.signUpHeader}>
                <Text style={[F40014.main,colorBackGround(darkModeTheme)]}>
                    {miniTitle}
                </Text>
                <Text
                    onPress={onPress}
                    style={[F40014.main, F40014.color]}>
                    {actionTitle}
                </Text>
            </View></>
    )
}

const innerStyles = StyleSheet.create({
    welcomeHeader: {
        alignItems: "center"
    },
    signUpHeader: {
        marginTop: 12,
        justifyContent: "center",
        flexDirection: "row"
    },
})