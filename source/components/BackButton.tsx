import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Back } from '../assets/icons'
import { useNavigation } from '@react-navigation/native'
interface IBackProps {
    onPrees?: () => void,
}
export const BackButton = (props: IBackProps) => {
    const { onPrees } = props
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={style.headerBack} activeOpacity={1} onPress={() => { onPrees ? onPrees : navigation.goBack() }}>
            <Back />
        </TouchableOpacity>
    )
}
const style = StyleSheet.create({
    headerBack: { position: "absolute", zIndex: 999, top: 8, left: 20, padding: 5 },

})