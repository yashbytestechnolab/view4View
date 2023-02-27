import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Colour } from '../../theme';



interface Iprops {
    errorText: any;
    wrapperStyle?: any
}

const ValidationError = (props: Iprops) => {
    const { errorText , wrapperStyle} = props
    return (
        <View style={[wrapperStyle,styles.textStyle]}>
            <Text style={{color:Colour.red}} >{errorText}</Text>
        </View>
    )
}

export default ValidationError

const styles = StyleSheet.create({
 textStyle:{
    textAlign:'left'
 }
})
