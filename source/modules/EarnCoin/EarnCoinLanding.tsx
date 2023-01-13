import { View, Text, TouchableOpacity, SafeAreaView, Button, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Header } from '../../components';
import { String } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { Colors, F40012, F60016 } from '../../Theme';
import { NextIcon } from '../../assets/icons';
import { EarnCoinData } from '../../services/jsonfile';
import { style } from './style';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.GAM_REWARDED_INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';


export const EarnCoinLanding = () => {
  const [loaded, setLoaded] = useState(false);

  const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(true);
    });
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        loadAdd()
        console.log('User earned reward of ', reward);
      },
    );

    // Start loading the rewarded ad straight away
    // rewarded.load();
    loadAdd()
    //  RewardedAd.createForAdRequest(TestIds.GAM_REWARDED);

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  });

const loadAdd = () =>{
  rewarded.load();

}

  if (!loaded) {
    return <ActivityIndicator />;
  }

  const navigation = useNavigation()
  return (
    <>
      <SafeAreaView style={{ backgroundColor: Colors?.gradient1 }} />
      <View style={style.main}>
        <Header title={String?.headerTitle?.earnCoin} />
        <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
          {
            EarnCoinData.length > 0 && EarnCoinData?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index.toString()}
                  style={style.card}
                  activeOpacity={1}
                  onPress={() => {
                    item?.onPress === "showAdd" ?
                      loaded ? rewarded.show() : null :
                      navigation.navigate(item?.onPress)
                  }}>
                  <View style={style.leftRow}>
                    <item.svg />
                    <View style={{ marginLeft: 16 }}>
                      <Text style={[F60016?.textStyle, { color: Colors?.primaryRed }]}>{item?.title}</Text>
                      <Text style={[F40012?.main, { color: Colors?.black, opacity: 0.6, }]}>{item?.subTitle}</Text>
                    </View>
                  </View>
                  <View>
                    <NextIcon />
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
