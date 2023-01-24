import { View, Text, SafeAreaView, StyleSheet, Platform, TouchableOpacity, ScrollView, } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { String } from '../../../constants';
import { Colors, darkBackGround, F40014, } from '../../../Theme';
import { EarnCoin, } from '../../../assets/icons';
import { ButtonComponent, Header } from '../../../components';
import { InputContextProvide } from '../../../context/CommonContext';
import makeRemoteConfig from "@react-native-firebase/remote-config";
export const BuyCoin = () => {
    const { storeCreator: { darkModeTheme } }: any = useContext(InputContextProvide)
    const [selectRB, setSelectRB] = useState(0)
    const [parseData, setParseData] = useState()



    const InAppPurches = () => {
        const remoteConfig: any = makeRemoteConfig();

        remoteConfig
            .setDefaults({
                someValue: {
                    name: "1000 Coins",
                    price: "89 ₹",
                    subInfo: "MOST POPULAR"
                }
            })
            .then(() => remoteConfig.fetchAndActivate())
            .then(() => {
                const getConfigValue: any = remoteConfig.getValue("inApp_purchase_description").asString()
                const d = JSON.parse(getConfigValue)
                setParseData(d)
            })
            .catch((error: any) => { console.error("error", error) });
    }
    useEffect(() => {
        InAppPurches()
    }, [])


    const onReadioButtonPress = (idx) => {
        setSelectRB(idx);
    };

    return (
        <>
            <SafeAreaView style={{ backgroundColor: Colors?.gradient1 }} />
            <View style={style.main}>
                <Header title={String?.headerTitle?.buyCoin} showBacKIcon={true} />

                <ScrollView showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={String.commonString.handled}
                    style={[style.scroll, darkBackGround(darkModeTheme)]}
                    scrollEnabled={true}
                    contentContainerStyle={[style.scrollContain,]}>
                    <EarnCoin />

                    {
                        parseData && parseData?.map((res, index) => {
                            let isChecked = selectRB === index ? true : false;


                            return (
                                <TouchableOpacity activeOpacity={1} style={[style.card, isChecked && {
                                    borderWidth: 1, borderColor: Colors?.primaryRed,
                                }]} onPress={() => {
                                    onReadioButtonPress(index)

                                }}>
                                    <View style={style.rbWrapper}>
                                        <TouchableOpacity activeOpacity={1} style={style.isChecked} >
                                            {isChecked && <View
                                                style={style.selectRB} />}
                                        </TouchableOpacity>
                                        <View style={{ paddingLeft: 12 }}>
                                            <Text style={[F40014?.main,]}>{res?.name}</Text>
                                            <Text style={[F40014.main, { color: Colors?.primaryRed }]}>{res?.subInfo}</Text>
                                        </View>
                                    </View>

                                    <Text style={[F40014?.main,]}>{res?.price}</Text>
                                </TouchableOpacity>)

                        })
                    }
                    <Text style={[F40014.main, style.subTextWrapper]}>{String?.commonString?.buyCoinSubText}</Text>
                    <ButtonComponent buttonTitle={"Buy" +" "+parseData?.[selectRB]?.name} onPrees={() => { }} wrapperStyle={style.buttonWrapper} />
                </ScrollView>
            </View>
        </>
    );
};
const style = StyleSheet.create({
    scroll: {
        backgroundColor: Colors.lightWhite,
        flex: 1
    },
    scrollContain: {
        flexGrow: 1,
        backgroundColor: Colors?.lightWhite,

        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 40,

        paddingBottom: Platform.OS === "ios" ? 100 : 70
    },
    logoWrapper: {},

    main: { flex: 1, backgroundColor: Colors?.lightWhite, height: '100%' },
    card: {
        shadowColor: Colors?.whiteShadow,
        width: '100%',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 4,
        backgroundColor: Colors?.white,
        padding: 16,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 30,
        alignItems: 'center',
        borderRadius: 8,
        shadowRadius: 4,
        elevation: 8,

    },
    subTextWrapper: { width: '100%', position: 'absolute', bottom: 180 },
    rbWrapper: { flexDirection: 'row', alignItems: 'center' },
    isChecked: { height: 22, width: 22, borderRadius: 13, borderColor: Colors?.primaryRed, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
    buttonWrapper: { width: '100%', position: 'absolute', bottom: 85 },
    selectRB: { height: 10, width: 10, borderRadius: 8, backgroundColor: Colors.primaryRed, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }
})

