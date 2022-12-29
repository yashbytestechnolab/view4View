import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import EarnCoin from '../assets/icons/EarnCoin'
import { Colors, F60016 } from '../Theme'

interface buttonProps {
    buttonTitle: string,
    onPrees: () => {} | any,
    isRewardIconShow?: boolean
    wrapperStyle?:object
}

export const ButtonComponent = (props: buttonProps) => {
    let { isRewardIconShow, onPrees, buttonTitle = false,wrapperStyle } = props
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={onPrees}
            style={[innerStyles.main,wrapperStyle]}>
            {
                isRewardIconShow &&
                <View style={innerStyles.reward}>
                    <EarnCoin />
                </View>
            }
            <Text style={F60016.textStyle} >
                {buttonTitle}
            </Text>
        </TouchableOpacity>
    )
}

const innerStyles = StyleSheet.create({
    main: {
        padding: 16,
        backgroundColor: Colors?.primaryRed,
        borderRadius: 8,
        marginHorizontal: 10,
        paddingHorizontal: 12, justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    reward: { right: 11 },

})