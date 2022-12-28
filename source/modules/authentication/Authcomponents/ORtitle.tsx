import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, F40012 } from '../../../Theme'

export const ORtitle = () => {
    return (
        <View style={innerStyles.bottomLine}>
        <View style={innerStyles.line} />
        <Text style={[F40012.main, F40012.bottom]} >
          OR
        </Text>
        <View style={innerStyles.line} />
      </View>
    )
}


const innerStyles = StyleSheet.create({
    bottomLine: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 29, marginHorizontal: 16,
    },
    line: {
        height: 1,
        width: 143,
        marginTop: 4,
        backgroundColor: Colors.greyD8D8D8,
    },
})