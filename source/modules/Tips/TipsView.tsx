import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
        let tipsDetail: object | any = await firebase.firestore()?.collection("tips").get()
        let tipsFormat = tipsDetail?._docs?.map((result: any) => result?._data)
        dispatchTips({ types: type.TIPSDATA, payload: tipsFormat })
    }
    useEffect(() => {
        fetchTipsData()
    }, [])

    const navigation = useNavigation()

    const onAddDescription = () => {
        const onAddDes = {
            tips_description: "Get More “Suggested Video” Views",
            tips_format: {
                tips_title: "Get More “Suggested Video” Views",
                tips_description: `
                <p style="text-align: left;color: #121212; font-size:16px; ">
                  <b>
                  Over the last few years I’ve studied dozens of YouTube channels.
                  And I’ve noticed one consistent pattern:
                  </br>   </br>
                  Successful channels get lots of views from Suggested Video.
                  </b>
                <p style="text-align: left;color: #121212; font-size:16px; ">
                As a reminder, “Suggested Videos” are related videos that YouTube promotes next to the video you’re watching:
                </p>
                <img src="https://api.backlinko.com/app/uploads/2019/04/suggested-videos-768x602.webp" width="100%" height="auto">
            
                <p style="text-align: left;color: #121212; font-size:16px; ">
                And as it turns out, Suggested Video can bring in MORE views than YouTube search.
                </p>
                <img src="https://api.backlinko.com/app/uploads/2019/04/youtube-search-traffic-e1555076579348-640x482.webp" width="100%" height="auto">
                
                <p style="text-align: left;color: #121212; font-size:16px; ">
                …and 38.2% from Suggested Video:
                </p>                
                <img src="https://api.backlinko.com/app/uploads/2019/04/youtube-suggested-traffic-e1555076602776-640x482.webp" width="100%" height="auto">
                <p style="text-align: left;color: #121212; font-size:16px; ">
                So:
                </p>
                <p style="text-align: left;color: #121212; font-size:16px; ">
                How can you get more views from Suggested Video?
                </p>
                <p style="text-align: left;color: #121212; font-size:16px; ">
                Use the same tags as your competitors.
                </p>
                <p style="text-align: left;color: #121212; font-size:16px; ">
                In fact, YouTube has stated that they use your video content metadata (like your title, description and tags) for Suggested Video rankings.
                </p>
                <img src="https://api.backlinko.com/app/uploads/2019/04/youtube-increase-traffic-e1555076722194-640x359.webp" width="100%" height="auto">
                <p style="text-align: left;color: #121212; font-size:16px; ">
                So when your tags match the tags in a popular video, you have a good chance of showing up next to that video:
                </p>
                `
            }
        }
        firebase.firestore().collection("tips").add(onAddDes)
    }

    return (
        <>
            <SafeAreaView style={[{ backgroundColor: Colors.gradient1 }]} />
            <View style={{ flex: 1, ...darkBackGround(darkModeTheme), }}>
                <Header title={String?.headerTitle?.Tips} showCoin={false} />
                <View style={{ marginHorizontal: 16, marginTop: 20, flex: 1, ...darkBackGround(darkModeTheme) }}>
                    {
                        tipsData?.map((item: any, index: number) => {
                            return (
                                <>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate(ROUTES.TIPSDESCRIPTION, {
                                            routeData: item,
                                            number: index + 1
                                        })}
                                        style={{ flexDirection: "row", alignItems: "center", marginVertical: 12, justifyContent: "space-between" }}>
                                        <Text style={{ ...colorBackGround(darkModeTheme) }}>
                                            {index + 1 + ". "}
                                        </Text>
                                        <View style={{flex:1}}>
                                        <Text style={{marginLeft:8, alignSelf: "flex-start", ...colorBackGround(darkModeTheme) }}>
                                            {item?.tips_description}
                                        </Text>
                                        </View>
                                        <View style={{ alignSelf: "flex-end" }}>
                                            <NextIcon />
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ height: 0.5, backgroundColor: Colors.GrayLightC2C9D1, marginTop: 3 }} />
                                </>
                            )
                        })
                    }
                </View>
                {/* <TouchableOpacity
                    onPress={() => onAddDescription()}
                    style={{ padding: 20, backgroundColor: "red", marginBottom: 100 }}>
                    <Text>
                        On Add Description
                    </Text>
                </TouchableOpacity> */}
            </View>
        </>
    )
}

const styles = StyleSheet.create({})