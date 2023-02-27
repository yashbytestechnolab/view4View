import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { colorBackGround, Colors, darkBackGround } from '../../Theme'
import { InputContextProvide } from '../../context/CommonContext'
import { Header } from '../../components'
import { ROUTES, String } from '../../constants'
import { firebase } from '@react-native-firebase/firestore'
import { type } from '../../constants/types'
import { useNavigation } from '@react-navigation/native'
import { NextIcon } from '../../assets/icons'

export const TipsView = () => {
    const { storeCreator: { dispatchTips,
        tips: { tipsData, tipsError, tipsLoading
        }, loading, setLoading, darkModeTheme } }: any = useContext(InputContextProvide)

    const fetchTipsData = async () => {
        dispatchTips({ types: type.TIPSLOADING, payload: true })
        let tipsDetail: object | any = await firebase.firestore()?.collection("tips").get().catch((err: any) => console.log("err", err)
        )
        let tipsFormat = tipsDetail?._docs?.map((result: any) => result?._data)
        dispatchTips({ types: type.TIPSDATA, payload: tipsFormat })
    }
    useEffect(() => {
        fetchTipsData()
    }, [])

    const navigation = useNavigation()

    return (
        <>
            <SafeAreaView style={styles.safeAreaView} />
            <View style={[darkBackGround(darkModeTheme), styles.mainWrapper]}>
                <Header title={String?.headerTitle?.Tips} showCoin={false} />
                {
                    tipsLoading ? <View style={styles.loader}>
                        <ActivityIndicator color={Colors.pink} />
                    </View> :

                        <View style={[styles.tipsWrapper, darkBackGround(darkModeTheme)]}>
                            {
                                tipsData?.map((item: any, index: number) => {
                                    return (
                                        <>
                                            <TouchableOpacity
                                                key={index.toString()}
                                                onPress={() => navigation.navigate(ROUTES.TIPSDESCRIPTION, {
                                                    routeData: item,
                                                    number: index + 1
                                                })}
                                                style={styles.onPress}>
                                                <Text style={colorBackGround(darkModeTheme)}>
                                                    {index + 1 + ". "}
                                                </Text>
                                                <View style={styles.disWrapper}>
                                                    <Text style={[styles.discription, colorBackGround(darkModeTheme)]}>
                                                        {item?.tips_description}
                                                    </Text>
                                                </View>
                                                <View style={styles.alignSelf}>
                                                    <NextIcon />
                                                </View>
                                            </TouchableOpacity>
                                            <View style={styles.breakker} />
                                        </>
                                    )
                                })
                            }
                        </View>
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: Colors.gradient1
    },
    mainWrapper: { flex: 1 },
    tipsWrapper: { marginHorizontal: 16, marginTop: 20, flex: 1, },
    onPress: { flexDirection: "row", alignItems: "center", marginVertical: 12, justifyContent: "space-between" },
    discription: { marginLeft: 8, alignSelf: "flex-start", },
    disWrapper: { flex: 1 },
    breakker: { height: 0.5, backgroundColor: Colors.GrayLightC2C9D1, marginTop: 3 },
    alignSelf: { alignSelf: "flex-end" },
    loader: { flex: 1, justifyContent: "center", alignItems: "center" }
})