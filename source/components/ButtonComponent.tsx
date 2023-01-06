import { ActivityIndicator, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import EarnCoin from '../assets/icons/EarnCoin'
import { Colors, F60016 } from '../Theme'

interface buttonProps {
    buttonTitle: string,
    onPrees: () => void,
    isRewardIconShow?: boolean,
    wrapperStyle?: StyleProp<ViewStyle>,
    loading?: boolean,
    disable?: boolean
}

export const ButtonComponent = (props: buttonProps) => {
    const { isRewardIconShow, onPrees, buttonTitle = false, wrapperStyle, loading, disable } = props
    console.log("disable",disable);
    
    return (
        <TouchableOpacity
            disabled={disable}
            activeOpacity={0.8}
            onPress={onPrees}
            style={[innerStyles.main, wrapperStyle]}>
            {
                isRewardIconShow &&
                <View style={innerStyles.reward}>
                    <EarnCoin />
                </View>
            }
            < Text style={F60016.textStyle} >
                {buttonTitle}
            </Text>
        </TouchableOpacity >
    )
}

const innerStyles = StyleSheet.create({
    main: {
        padding: 16,
        backgroundColor: Colors.primaryRed,
        borderRadius: 8,
        marginHorizontal: 10,
        paddingHorizontal: 12, justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    reward: { right: 11 },

})