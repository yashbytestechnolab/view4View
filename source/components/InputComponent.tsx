import { StyleProp, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { Colors, F50012 } from '../Theme'
import { EyeIcon } from '../assets/icons/EyeIcon'


interface props {
    placeholder: string,
    value: string | number|undefined ,
    inputTitle: string
    onChangeText: () =>  void ,
    viewStyle?: StyleProp<ViewStyle>,
    isSecureIcon?: boolean,
    isSecureEntry?: boolean,
    onPrees?: () => void;
}

export const InputComponent = (props: props) => {
    const { inputTitle, viewStyle, onChangeText, value, placeholder, isSecureIcon, isSecureEntry, onPrees } = props
    return (
        <View style={[innerStyles.main, viewStyle]}>
            <Text style={F50012.main}>{inputTitle}</Text>
            <TextInput
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
        height: 44,
        marginTop: 8,
        borderWidth: 1,
        borderColor: Colors.GrayLightC2C9D1
    },
    eye: { position: "absolute", right: 12, top: 37 }
})