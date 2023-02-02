import React, { useContext, useEffect, useState } from 'react'
import {  useNavigation } from '@react-navigation/native';
import { SafeAreaView, StatusBar, ActivityIndicator } from 'react-native'
import { Header } from '../../../components';
import { InputContextProvide } from '../../../context/CommonContext';
import { EarnCoin } from '../../../services';
import { Colors, darkBackGround } from '../../../Theme';
import { style } from './style';
import { TestIds, RewardedAd, RewardedAdEventType } from '@react-native-firebase/admob';
import { type as keys } from '../../../constants/types';
import GiftModel from '../../../components/GiftModel';



export const ShowAdds = () => {
    const [loaded, setLoaded]: any = useState(true);
    const [isVisible, setIsVisible] = useState(false)
    const navigation = useNavigation()
    const { storeCreator: { coinBalance: { getBalance }, dispatchCoin, darkModeTheme } }: any = useContext(InputContextProvide)

    useEffect(() => {
        showRewardAd()
    }, [])

    const showRewardAd = () => {
        const rewardAd = RewardedAd.createForAdRequest(TestIds.REWARDED);
        rewardAd.onAdEvent((type, error) => {

            if (type === RewardedAdEventType.LOADED) {
                setLoaded(false)
                rewardAd.show();
            }

            if (type === RewardedAdEventType.EARNED_REWARD) {
                EarnCoin(getBalance)?.then((res) => {
                    dispatchCoin({ types: keys.GET_CURRENT_COIN, payload: getBalance + 100 })
                    setIsVisible(true)
                }).catch((err) => {
                    console.log("err", err);
                    navigation.goBack()
                })
            }

            if (type === "closed") {
                // navigation.goBack()
            }
        });
        rewardAd.load();
    }

    return (
        <>
            <SafeAreaView style={style.safearea} />
            <StatusBar backgroundColor={Colors?.gradient1} barStyle={String?.StatusBar?.lightContent} />
            <SafeAreaView style={[style.main, darkBackGround(darkModeTheme)]}>
                <Header title={"Adds"} showCoin={false} showBacKIcon={true} />
                {loaded && <ActivityIndicator style={{ alignSelf: 'center', flex: 1 }} />}
                {isVisible &&
                    <GiftModel
                        fromAdds
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        onPress={() => { setIsVisible(false), navigation.goBack() }} />
                }
            </SafeAreaView>
        </>

    )
}
