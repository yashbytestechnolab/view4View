import { View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import React, { useContext, useState } from 'react';
import { Header } from '../../components';
import { String } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { colorBackGround, Colors, darkBackGround, F40012, F60016, lightBackGround } from '../../Theme';
import { NextIcon } from '../../assets/icons';
import { CellType, EarnCoinData } from '../../services/jsonfile';
import { style } from './style';
import { InputContextProvide } from '../../context/CommonContext';
import { TestIds, RewardedAd, RewardedAdEventType } from '@react-native-firebase/admob';
import { EarnCoin } from '../../services';
import { type as keys } from '../../constants/types';

export const EarnCoinLanding = () => {
  const navigation = useNavigation()
  const { storeCreator: { coinBalance: { getBalance }, dispatchCoin, darkModeTheme } }: any = useContext(InputContextProvide)
  const [loading, setLoading] = useState(false)

  const showRewardAd = () => {
    setLoading(true)
    const rewardAd = RewardedAd.createForAdRequest(TestIds.REWARDED);
    rewardAd.onAdEvent((type, error) => {
      console.log("type", type, error);
      if (type === RewardedAdEventType.LOADED) {
        rewardAd.show();
        setLoading(false)
      }

      if (type === RewardedAdEventType.EARNED_REWARD) {
        EarnCoin(getBalance)?.then((res) => {
          dispatchCoin({ types: keys.GET_CURRENT_COIN, payload: getBalance + 100 })
          setLoading(false)
        }).catch((err) => {
          navigation.goBack()
        })
      }

      if (type === "closed") {
      }
    });
    rewardAd.load();
  }

  return (
    <>
      <SafeAreaView style={{ backgroundColor: Colors?.gradient1 }} />
      <View style={[style.main, darkModeTheme && darkBackGround(darkModeTheme)]}>
        <Header title={String?.headerTitle?.earnCoin} />
        <View style={[{ paddingHorizontal: 16, paddingTop: 20 },]}>
          {
            EarnCoinData.length > 0 && EarnCoinData?.map((item, index) => {
              return (
                <TouchableOpacity key={index.toString()} style={[style.card, lightBackGround(darkModeTheme), { shadowColor: darkModeTheme ? '#000' : Colors.cardshadow }]} activeOpacity={1} onPress={() => { item?.onPress == "SHOWADDS" ? showRewardAd() : navigation.navigate(item?.onPress) }}>
                  <View style={style.leftRow}>
                    <item.svg />
                    <View style={{ marginLeft: 16 }}>
                      <Text style={[F60016?.textStyle, { color: Colors?.primaryRed },]}>{item?.title}</Text>
                      <Text style={[F40012?.main, { color: Colors?.black, opacity: 0.6 }, colorBackGround(darkModeTheme)]}>{item?.subTitle}</Text>
                    </View>
                  </View>
                  <View>
                    {(loading && item?.type == CellType.ads) ? <ActivityIndicator /> : <NextIcon />}
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>

    </>
  );
};
