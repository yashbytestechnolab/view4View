import { Image, SafeAreaView, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useContext } from 'react'
import { useRoute } from '@react-navigation/native'
import { colorBackGround, Colors, darkBackGround, F50018, } from '../../../Theme'
import { String } from '../../../constants'
import { Header } from '../../../components'
import { InputContextProvide } from '../../../context/CommonContext'
import RenderHtml, { HTMLContentModel, HTMLElementModel } from 'react-native-render-html';

export const TipsDescription = () => {
    const route = useRoute()
    const { params: { routeData, number } }: any = route
    const { width } = useWindowDimensions();
    const { storeCreator: { darkModeTheme } }: any = useContext(InputContextProvide)
    const source = {
        html: `${routeData?.tips_format?.tips_description}`
    };
    const textStyle = {
        p: {
            ...colorBackGround(darkModeTheme)
        }
    }

    return (
        <>
            <SafeAreaView style={[{ backgroundColor: Colors.gradient1 }]} />
            <View style={{ flex: 1, ...darkBackGround(darkModeTheme), }}>
                <Header title={String?.headerTitle?.TipsDescription} showCoin={false} showBacKIcon />
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }} style={{ marginHorizontal: 16, marginTop: 20, flex: 1, ...darkBackGround(darkModeTheme) }}>
                    <Text style={[F50018.main, F50018.color, colorBackGround(darkModeTheme)]}>
                        {number + ". " + routeData?.tips_format?.tips_title}
                    </Text>
                    <View style={{ marginTop: 20 }}>
                        <RenderHtml
                            baseStyle={{ fontSize: 12, color: Colors.darkRed }}
                            contentWidth={width}
                            source={source}
                            tagsStyles={textStyle}
                        />
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({})