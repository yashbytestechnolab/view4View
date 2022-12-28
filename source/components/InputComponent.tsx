import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { String } from '../constants'
import { Colors, F50012 } from '../Theme'
import { EyeIcon } from '../assets/icons/EyeIcon'

interface props {
    placeholder: string,
    value: string | number | any,
    inputTitle: string
    onChangeText: (value: any) => {} | any,
    viewStyle?: any,
    isSecureIcon?: boolean,
    isSecureEntry?: boolean,
    onPrees?: (value: any) => {},
    errorMessage?: string
}

export const InputComponent = (props: props) => {
    const { errorMessage, inputTitle, viewStyle, onChangeText, value, placeholder, isSecureIcon, isSecureEntry, onPrees } = props
    return (
        <View style={[innerStyles.main, viewStyle]}>
            <Text style={F50012.main}>{inputTitle}</Text>
            <TextInput
                placeholderTextColor={Colors.GrayLightC2C9D1}
                secureTextEntry={isSecureEntry}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                style={innerStyles.textInput}
            />
            {
                isSecureIcon &&
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={onPrees}
                    style={innerStyles.eye}>
                    <EyeIcon />
                </TouchableOpacity>
            }
            {
                errorMessage?.length > 0 &&
                <Text style={{ color: "red", marginTop: 5 }}>
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
        color: Colors.GrayLightC2C9D1,
        height: 44,
        marginTop: 8,
        borderWidth: 1,
        borderColor: Colors.GrayLightC2C9D1
    },
    eye: { position: "absolute", right: 12, top: 37 }
})