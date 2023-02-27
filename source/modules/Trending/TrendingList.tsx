import { FlatList, Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { colorBackGround, Colors, darkBackGround, F50013, lightBackGround, topYTlist } from '../../Theme'
import { InputContextProvide } from '../../context/CommonContext'
import { Header } from '../../components'
import { String } from '../../constants'
import { Fonts } from '../../assets/fonts'
import { NextIcon } from '../../assets/icons'
import { firebase } from '@react-native-firebase/firestore'
import { kFormatter } from '../../services/CoinValueFormat'

export const TrendingList = () => {
    const { storeCreator: { darkModeTheme } }: any = useContext(InputContextProvide)
    const { commonString } = String
    const [trendingList, setTrendingList] = useState({ trendingData: [], trendingLoading: false })
    const { trendingLoading, trendingData } = trendingList
    const [channelList, setchannelList] = useState<Array<object>>([{}])

    const getTrendignVideoList = async () => {
        setTrendingList({ ...trendingList, trendingLoading: true })
        let videoList: any = await firebase.firestore().collection("top_youtubers").doc("OzkH1I63F6n5la6Fltrm").get()
        setTrendingList({ ...trendingList, trendingData: videoList?._data?.trending_video, trendingLoading: false })
        channels()
    }

    const channels = async () => {
        let yList: any = await firebase.firestore().collection("top_youtubers").doc("nP5enC3GzDJPxglsih1T").get()
        setchannelList(yList?._data?.list_of_channel)
    }

    useEffect(() => {
        getTrendignVideoList()
    }, [])

    const renderCampaignList = ({ item, index }: any) => {
        console.log("item", item?.snippet?.channelId);
        return (
            <>
                <View key={index?.toString()} style={[styles.container, lightBackGround(darkModeTheme), { shadowColor: darkModeTheme ? Colors.darkModeColor1 : Colors.whiteShadow, elevation: darkModeTheme ? 0 : 8 }]}>
                    <Image
                        style={styles.thumbNilImage}
                        source={{ uri: item?.snippet?.thumbnails?.medium?.url }} />
                    <View style={{
                        flex: 1,
                        paddingLeft: 17,
                        paddingRight: 22,
                        justifyContent: "space-between", marginVertical: 11
                    }}>
                        <Text style={[F50013.main, colorBackGround(darkModeTheme)]}>
                            {item?.snippet?.channelTitle}
                        </Text>
                        <Text numberOfLines={2} style={[F50013.main, colorBackGround(darkModeTheme)]}>
                            {item?.snippet?.title}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => Linking.openURL(`vnd.youtube://c/' + '${item?.snippet?.channelId}'`)} style={{ alignSelf: "center" }}>
                        <NextIcon />
                    </TouchableOpacity>
                </View>
            </>
        )
    }

    const handleEmptyData = () => {
        return (
            <>
                {
                    !trendingLoading && trendingData?.length <= 0 &&
                    <View style={[styles.emptyList, darkBackGround(darkModeTheme)]}>
                        <Text style={[F50013.main, styles.textAlign, colorBackGround(darkModeTheme)]}>
                            {commonString?.emptyList}
                        </Text>
                    </View>
                }
            </>
        )
    }

    return (
        <>
            <SafeAreaView style={styles.safeAreaView} />
            <Header title={String?.headerTitle?.Trending} showCoin={false} />
            <ScrollView nestedScrollEnabled={true} style={[styles.mainWrapper, darkBackGround(darkModeTheme),]}>
                <FlatList
                    keyExtractor={(item: any) => item?.toString()}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled
                    style={[styles.flatList, darkBackGround(darkModeTheme)]}
                    data={trendingData}
                    renderItem={renderCampaignList}
                    ListEmptyComponent={handleEmptyData}
                    contentContainerStyle={styles.flatlistContain}
                />
                <View style={[{ flex: 1, },]}>
                    {channelList?.length > 0 && channelList?.map((res: any,) => {
                        return (
                            <View style={[{

                                marginVertical: 8,
                                paddingVertical: 8,
                                marginHorizontal: 16,
                                paddingHorizontal: 8,
                                backgroundColor: Colors.shadowPink,
                                borderRadius: 8,
                                flexDirection: "row"
                            }, topYTlist(darkModeTheme)]}>
                                <Image style={{ height: 90, width: 90 }} source={{ uri: res?.user_channel_logo }} />
                                <View style={{ marginHorizontal: 20, }}>
                                    <Text
                                        numberOfLines={1}
                                        style={[{ fontWeight: "700", textAlign: "left", }, colorBackGround(darkModeTheme)]}>
                                        {`${res?.channelName}`}
                                    </Text>
                                    <Text
                                        numberOfLines={1}
                                        style={[{ marginTop: 6, }, colorBackGround(darkModeTheme)]}>
                                        {`Subscriber: ${kFormatter(Number(res?.subscriber?.replaceAll(",", "")))}`}
                                    </Text>
                                    <Text
                                        numberOfLines={1}
                                        style={[{ marginTop: 6, }, colorBackGround(darkModeTheme)]}>
                                        {`Views: ${kFormatter(Number(res?.Views?.replaceAll(",", "")))}`}
                                    </Text>
                                    <Text
                                        numberOfLines={1}
                                        style={[{ marginTop: 6, }, colorBackGround(darkModeTheme)]}>
                                        {`Videos: ${kFormatter(Number(res?.Videos?.replaceAll(",", "")))}`}
                                    </Text>
                                </View>
                            </View>
                        )

                    })
                    }
                </View>
            </ScrollView>
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
    disWrapper: { flex: 1 },
    breakker: { height: 0.5, backgroundColor: Colors.GrayLightC2C9D1, marginTop: 3 },
    alignSelf: { alignSelf: "flex-end" },
    loader: { flex: 1, justifyContent: "center", alignItems: "center" },
    mainContainer: {
        flex: 1,
        backgroundColor: '#FCFBFF',
        paddingBottom: 55,
    },
    container: {
        height: 80,
        marginVertical: 10,
        paddingHorizontal: 16,
        marginHorizontal: 16,
        flexDirection: "row",
        justifyContent: "center",
        shadowColor: "#E2E2E2",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 4,
        shadowRadius: 4,
        borderRadius: 16,
        backgroundColor: '#1A1A1A'
    },
    discription: { flex: 1, marginLeft: 13, marginTop: 12 },
    thumbNilImage: { height: 61, width: 83, borderRadius: 4, alignSelf: "center" },
    fillContainer: { height: 4, marginTop: 8, backgroundColor: "#EAEAEA", borderRadius: 60 },
    fillView: {
        height: 4,
        borderRadius: 60,
        backgroundColor: "red"
    },
    countOfView: { flexDirection: "row", alignItems: "center", marginTop: 6 },
    views: { left: 6, top: 1 },
    height: { height: 5, backgroundColor: Colors?.lightWhite },
    flatList: { backgroundColor: '#FCFBFF', flex: 0.6 },
    safeArea: { backgroundColor: Colors.linear_gradient },
    addIcon: {
        position: "absolute",
        height: 60,
        width: 60,
        bottom: 90,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        right: 20,
        backgroundColor: Colors.primaryRed
    },
    emptyList: { flexGrow: 1, backgroundColor: "#FCFBFF", justifyContent: "center", alignItems: "center", paddingHorizontal: 16 },
    flatlistContain: { flexGrow: 1, },
    textAlign: { textAlign: "center" },
    stickeyHeaderView: { height: 34, justifyContent: "center", paddingLeft: 12 },
    stickeyText: { color: "black", fontSize: 16, fontWeight: "500", fontFamily: Fonts.InterMedium },
})





// Upload for youTube channel
// firebase.firestore().collection("top_youtubers").add({
//     trending_video_list: "Trending Video List",
//     trending_video: trendingData
// })




    // const result = () => {
    //     setTrendingList({ ...trendingList, trendingLoading: true })
    //     axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&chart=mostPopular&maxResults=10&regionCode=in&key=AIzaSyCglZ_qEJK8qP0Uf8qcvyySEfh78q_Tf3k`).then((res: any) => {
    //         console.log("res", res);

    //         setTrendingList({ ...trendingList, trendingData: res?.data?.items, trendingLoading: false })
    //     }).catch((err: any) => {
    //         console.log("err", err);
    //         setTrendingList({ ...trendingList, trendingLoading: false })
    //     })
    // }