import { ActivityIndicator, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React  from 'react'
import { Colors } from '../Theme'

interface buttonProps {
    buttonTitle: string,
    onPrees: () => void,
    isRewardIconShow?: boolean,
    wrapperStyle?: StyleProp<ViewStyle>,
    loading?: boolean,
    disable?: boolean,
    spinnerColor?: boolean,
    buttonTextStyle?: any
}
export const ButtonComponent = (props: buttonProps) => {
    const { isRewardIconShow, onPrees, buttonTitle = false, wrapperStyle, loading, disable, spinnerColor, buttonTextStyle } = props
    return (
        <TouchableOpacity
            disabled={disable}
            activeOpacity={0.8}
            onPress={!loading ? onPrees : null}
            style={[innerStyles.main, { backgroundColor: disable ? Colors?.DisbaleButton : Colors?.primaryRed }, wrapperStyle,]}>
            {
                loading ? (
                    <ActivityIndicator color={spinnerColor || Colors.white} />
                ) : <>
                   <Text style={[{ color: disable ? Colors?.DisbaleButtonText : Colors?.white }, buttonTextStyle]} numberOfLines={1} >
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