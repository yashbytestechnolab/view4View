import { ActivityIndicator, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import EarnCoin from '../assets/icons/EarnCoin'
import { Colors, F60016 } from '../Theme'

interface buttonProps {
    buttonTitle: string,
    onPrees: () => void,
    isRewardIconShow?: boolean,
    wrapperStyle?: StyleProp<ViewStyle|TouchableOpacity>,
    loading?: boolean
}

export const ButtonComponent = (props: buttonProps) => {
    const { isRewardIconShow, onPrees, buttonTitle = false, wrapperStyle, loading } = props
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPrees}
            style={[innerStyles.main, wrapperStyle]}>
            {
                isRewardIconShow &&
                <View style={innerStyles.reward}>
                    <EarnCoin />
                </View>
            }
            {loading ? <ActivityIndicator color={Colors.white} /> :
                < Text style={F60016.textStyle} >
                    {buttonTitle}
                </Text>}
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