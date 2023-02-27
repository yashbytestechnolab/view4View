import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { Colour } from '../theme'

 interface loder{
    spinnerColor?:String

}
export const Loder =(props:loder) =>{
    const {spinnerColor}=props
  return (
    <View style={style.main}>
      <ActivityIndicator color={spinnerColor || Colour.PrimaryBlue}  size={'large'}/>

    </View>
  )
}
const style= StyleSheet.create({
    main:{
      backgroundColor:Colour.borderGray2,
        alignItems:'center',justifyContent:'center',
        position:'absolute',
        width:'100%',
        height:'100%',
        //flex:1

    }

})