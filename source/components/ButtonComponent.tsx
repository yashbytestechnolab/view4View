import { ActivityIndicator, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { useContext } from 'react'
import EarnCoin from '../assets/icons/BuyCoinIcon'
import { Colors, F60016 } from '../Theme'

interface buttonProps {
    buttonTitle: string,
    onPrees: () => void,
    isRewardIconShow?: boolean,
    wrapperStyle?: StyleProp<ViewStyle>,
    loading?: boolean,
    disable?: boolean,
    spinnerColor?: boolean
}
export const ButtonComponent = (props: buttonProps) => {
    const { isRewardIconShow, onPrees, buttonTitle = false, wrapperStyle, loading, disable, spinnerColor } = props


    return (
        <TouchableOpacity
            disabled={disable}
            activeOpacity={0.8}
            onPress={!loading ? onPrees : null}
            style={[innerStyles.main, wrapperStyle, { backgroundColor: disable ? Colors?.DisbaleButton : Colors.primaryRed }]}>
            {
                loading ? (
                    <ActivityIndicator color={spinnerColor || Colors.white} />
                ) : <>
                    {
                        isRewardIconShow &&
                        <View style={innerStyles.reward}>
                            <EarnCoin />
                        </View>
                    }
                    < Text style={[F60016.textStyle,]} numberOfLines={1} >
                        {buttonTitle}
                    </Text></>
            }

        </TouchableOpacity >
    )
}

const innerStyles = StyleSheet.create({
    main: {
        padding: 16,
        borderRadius: 8,
        marginHorizontal: 10,
        paddingHorizontal: 12, justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    reward: { right: 11 },

})