import { View, Text, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { LocalStorageKeys, String } from '../../constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Header } from '../../components';
import { colorBackGround, Colors, darkBackGround, F40012, F60016, lightBackGround } from '../../Theme';
import { NextIcon } from '../../assets/icons';
import { EarnCoinData } from '../../services/jsonfile';
import { style } from './style';
import { InputContextProvide } from '../../context/CommonContext';
import { EarnCoin, } from '../../services';
import { type as keys, } from '../../constants/types';
import { AdsClass } from '../../services/AdsLoad';
import * as LocalStorage from '../../services/LocalStorage';

import { CamptionConformationModel } from '../../components/CamptionConformationModel';
import { Anaylitics } from '../../constants/analytics';
import { AdsCount } from '../../services/AdsCount';

export const EarnCoinLanding = () => {
  const navigation = useNavigation()
  const [isAdsAlertDisplay, setIsAlertDisplay] = useState(false);
  const [maxAdsShow, setMaxAdsShow] = useState(10)
  const route = useRoute()

  let remotValue = async () => {
    let adsCountValue = await AdsCount()
    setMaxAdsShow(adsCountValue || 10)
  }
  useEffect(() => {
    remotValue()
  }, [])


  /**
   * InputContextProvide is get current coin and darktheame flag 
   */
  const { storeCreator: { adsWatchCount, setAdsWatchCount, reward, adsCount, setAdsCount, coinBalance: { getBalance }, dispatchCoin, darkModeTheme } }: any = useContext(InputContextProvide)

  /***
   * showRewardAd is load the ad and show ad
   */

  const rewardCoin = () => {
    let adsObj = {
      dataTime: new Date().toDateString(),
      adsCount: adsWatchCount?.adsCount + 1,
    }
    let rewarShare: rewardShare = { reward: (reward?.adsReward || 100), adsCount, getBalance }

    EarnCoin(rewarShare)?.then((res) => {
      setAdsCount(adsCount + 1)
      dispatchCoin({ types: keys.GET_CURRENT_COIN, payload: getBalance + (reward?.adsReward || 100) })
      Anaylitics("earn_coin_show_ads_completed", {
        current_user_balance: getBalance + (reward?.adsReward || 100)
      })
      LocalStorage.setValue(LocalStorageKeys.adsDetail, adsObj)
      setAdsWatchCount(adsObj)
    }).catch((err) => {
      navigation.goBack()
    })

  }
  console.log("adsWatchCount", adsWatchCount,maxAdsShow);


  const showRewardAd = () => {
    if (adsWatchCount?.adsCount < maxAdsShow) {
      Anaylitics("earn_coin_show_ads", {
        current_user_balance: getBalance
      })
      AdsClass.showAds(() => {
        setIsAlertDisplay(true);
      }, rewardCoin);
    } else {
      Alert.alert("No More Ads")
    }
  }

  return (
    <>
      <SafeAreaView style={{ backgroundColor: Colors?.gradient1 }} />
      <View style={[style.main, darkModeTheme && darkBackGround(darkModeTheme)]}>
        <Header title={String?.headerTitle?.earnCoin} showBacKIcon={route?.params?.outOfCoin == true ? true : false}
        />
        <View style={style.wrapperView}>
          {EarnCoinData.length > 0 && EarnCoinData?.map((item: any, index) => {
            return (
              <TouchableOpacity key={index.toString()} style={[style.card,
              lightBackGround(darkModeTheme), { shadowColor: darkModeTheme ? Colors.black : Colors.cardshadow, elevation: darkModeTheme ? 0 : 8 }]} activeOpacity={1}
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
                  <NextIcon />
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
      {isAdsAlertDisplay &&
        <CamptionConformationModel
          titleText={'Warning!!'}
          descriptionText={`We don't have any rewards ads to display. Please try again!!`}
          isVisible={isAdsAlertDisplay}
          descriptionStyle={{ paddingHorizontal: 20 }}
          setIsVisible={setIsAlertDisplay}
          actionTitle={"Close"}
          onPress={() => {
            setIsAlertDisplay(false)
          }
          }
        />
      }

    </>
  );
};
