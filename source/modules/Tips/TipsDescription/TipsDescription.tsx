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
            <SafeAreaView style={styles.safeAreaView} />
            <View style={[styles.mainWrapper, darkBackGround(darkModeTheme)]}>
                <Header title={String?.headerTitle?.TipsDescription} showCoin={false} showBacKIcon />
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.containStyle} style={[styles.scrollView, darkBackGround(darkModeTheme)]}>
                    <Text style={[F50018.main, F50018.color, colorBackGround(darkModeTheme)]}>
                        {number + ". " + routeData?.tips_format?.tips_title}
                    </Text>
                    <View style={styles.html}>
                        <RenderHtml
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

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: Colors.gradient1
    },
    mainWrapper: { flex: 1, },
    containStyle: { paddingBottom: 80 },
    html: { marginTop: 20 },
    scrollView: { marginHorizontal: 16, marginTop: 20, flex: 1 }
})