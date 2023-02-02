import { View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import React, { useContext, useState } from 'react';
import { Header } from '../../components';
import { ROUTES, String } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { colorBackGround, Colors, darkBackGround, F40012, F60016, lightBackGround } from '../../Theme';
import { NextIcon } from '../../assets/icons';
import { CellType, EarnCoinData } from '../../services/jsonfile';
import { style } from './style';
import { InputContextProvide } from '../../context/CommonContext';
import { TestIds, RewardedAd, RewardedAdEventType } from '@react-native-firebase/admob';
import { EarnCoin, } from '../../services';
import { type as keys, } from '../../constants/types';
import { Anaylitics } from '../../constants/analytics';
import { crashlyticslog } from '../../services/crashlyticslog';

export const EarnCoinLanding = () => {
  const navigation = useNavigation()
  /**
   * InputContextProvide is get current coin and darktheame flag 
   */
  const { storeCreator: { reward, coinBalance: { getBalance }, dispatchCoin, darkModeTheme } }: any = useContext(InputContextProvide)
  const [loading, setLoading] = useState(false)

  /***
   * showRewardAd is load the ad and show ad
   */
  const showRewardAd = () => {
    setLoading(true)
    crashlyticslog(`user watch video ${ROUTES.EARNCOINS_LANDING}`)
    Anaylitics("show_add", { getBalance });
    setLoading(true)
    const rewardAd = RewardedAd.createForAdRequest(TestIds.REWARDED);
    rewardAd.onAdEvent((type, error) => {
      if (type === RewardedAdEventType.LOADED) {
        rewardAd.show();
        setLoading(false)
      } if (error?.name?.length > 0) {
        setLoading(false)
      }

      if (type === RewardedAdEventType.EARNED_REWARD) {
        EarnCoin(getBalance, 100)?.then((res) => {
          dispatchCoin({ types: keys.GET_CURRENT_COIN, payload: getBalance + (reward?.adsReward || 100) })
          setLoading(false)
        }).catch((err) => {
          navigation.goBack()
        })
      }

      if (type === "closed") {
        setLoading(false)
      }
    });
    rewardAd.load();
  }

  return (
    <>
      <SafeAreaView style={{ backgroundColor: Colors?.gradient1 }} />
      <View style={[style.main, darkModeTheme && darkBackGround(darkModeTheme)]}>
        <Header title={String?.headerTitle?.earnCoin} titleStyle={{  paddingRight: 10 }}
        />
        <View style={style.wrapperView}>
          {EarnCoinData.length > 0 && EarnCoinData?.map((item: any, index) => {
            return (
              <TouchableOpacity disabled={loading} key={index.toString()} style={[style.card,
              lightBackGround(darkModeTheme), { shadowColor: darkModeTheme ? Colors.black : Colors.cardshadow, elevation: darkModeTheme ?0:8 }]} activeOpacity={1}
                onPress={() => {
                  item?.onPress == "SHOWADDS" ? showRewardAd() :
                    navigation.navigate(item?.onPress)
                }}>
                <View style={style.leftRow}>
                  <item.svg />
                  <View style={style.textWrapper}>
                    <Text style={[F60016?.textStyle, style.title]}>{item?.title}</Text>
                    <Text style={[F40012?.main, { color: Colors?.black, opacity: 0.6 }, colorBackGround(darkModeTheme)]}>{item?.subTitle}</Text>
                  </View>
                </View>
                <View>
                  {(loading && item?.type == CellType.ads) ? <ActivityIndicator color={Colors?.primaryRed} /> : <NextIcon />}
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>

    </>
  );
};
