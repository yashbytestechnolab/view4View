import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Back } from '../assets/icons'
import { useNavigation } from '@react-navigation/native'

export const BackButton = () => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={style.headerBack} activeOpacity={1} onPress={() => { navigation.goBack() }}>
            <Back />
        </TouchableOpacity>
    )
}
const style = StyleSheet.create({
    headerBack: { position: "absolute", zIndex: 999, top: 34, left: 11, padding: 5 },

})