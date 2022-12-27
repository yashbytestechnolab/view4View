import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors, F40014 } from '../Theme';

interface socialMediaProps {
    buttonTitle: string;
    onPress?: () => {} | any;
    socialMediaIcon?: any
}

export const SocialMediaButton = (props: socialMediaProps) => {
    const { buttonTitle, onPress, socialMediaIcon } = props
    return (
        <View style={innerStyle.main}>
            <TouchableOpacity
                onPress={onPress}
                style={innerStyle.buttonView}>
                <View style={innerStyle.logo}>
                    {socialMediaIcon}
                </View>
                <Text style={[F40014.main, F40014.colorBlack]}>
                    {buttonTitle}
                </Text>
            </TouchableOpacity>
        </View>
    )
}


const innerStyle = StyleSheet.create({
    main: { marginTop: 35 },
    buttonView: {
        marginHorizontal: 16,
        height: 55,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: 160,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: Colors.redFF8377
    },
    logo: { right: 8 }
})