import { Image, Platform, StyleProp, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { Colors, F50012 } from '../Theme'
import { EyeIcon } from '../assets/icons/EyeIcon'
import { Images } from '../assets/image'
interface props {
    placeholder: string,
    value: string | number | undefined,
    inputTitle?: string,
    onChangeText: (value: string | number | any) => void,
    viewStyle?: StyleProp<ViewStyle>,
    isSecureIcon?: boolean,
    isSecureEntry?: boolean,
    onPrees?: void,
    errorMessage?: string
    keyboardType?: string
    editable?:boolean
}

export const InputComponent = (props: props) => {
    const { errorMessage, inputTitle, viewStyle, onChangeText, value, placeholder, isSecureIcon, isSecureEntry, onPrees, keyboardType,editable } = props
    return (
        <View style={[innerStyles.main, viewStyle]}>
            {inputTitle && <Text style={F50012.main}>{inputTitle}</Text>}
            <TextInput
                placeholderTextColor={Colors.GrayLightC2C9D1}
                secureTextEntry={isSecureEntry}
                onChangeText={onChangeText}
                value={value}
                editable={editable}
                keyboardType={keyboardType}
                placeholder={placeholder}
                style={[innerStyles.textInput, isSecureIcon && innerStyles.paddingExtra]}
            />
            {
                isSecureIcon &&
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={onPrees}
                    style={innerStyles.eye}>
                    {isSecureEntry ? <Image source={Images.hidePass} style={innerStyles.hidePass} /> : <EyeIcon />}
                </TouchableOpacity>
            }
            {
                errorMessage?.length > 0 &&
                <Text numberOfLines={1} style={innerStyles.validationError}>
                    {errorMessage}
                </Text>
            }
        </View>
    )
}



const innerStyles = StyleSheet.create({
    main: {
        marginTop: 16,
        marginHorizontal: 16
    },
    textInput: {
        paddingHorizontal: 16,
        fontSize: 14,
        fontWeight: "400",
        borderRadius: 8,
        color: Colors.placeHolderTextBlack,
        height: 44,
        marginTop: 8,
        borderWidth: 1,
        borderColor: Colors.GrayLightC2C9D1
    },
    paddingExtra: {
        paddingRight: 40
    },
    eye: {
        position: "absolute",
        right: 12,
        top: Platform.OS === "ios" ? 35.5 : 37
    },
    hidePass: {
        height: 20,
        width: 20,
        right: 2.5
    },
    validationError: { color: "red", marginTop: 5 }
})