import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { String } from '../../../constants';
import { F40014, F60024 } from '../../../Theme';

interface headerProps {
    mainTitle: string;
    miniTitle: string;
    actionTitle: string
    onPress: () => {} | void
}

export const AuthHeader = (pros: headerProps) => {
    const { mainTitle, miniTitle, onPress, actionTitle } = pros
    return (
        <>
            <View style={innerStyles.welcomeHeader}>
                <Text style={F60024.textStyle}>
                    {mainTitle}
                </Text>
            </View>

            <View style={innerStyles.signUpHeader}>
                <Text style={F40014.main}>
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