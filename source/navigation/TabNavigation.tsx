import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ROUTES, LocalStorageKeys } from '../constants';
import { ViewStack, EarnCoinStack, SettingStack, MyCampaignLanding } from '.';
import { Home, MyCampaign, Setting, TabEarnCoin } from '../assets/icons';
import { SvgProps } from 'react-native-svg';
import { ActiveTabText, Colors, F50010 } from '../Theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { InputContextProvide } from '../context/CommonContext';
import { AdsClass } from '../services/AdsLoad';
import { person } from '../modules/View/increment';
import { HomeAdsEnable } from '../services/HomeAdsEnable';
import * as LocalStorage from '../services/LocalStorage';
import { useTranslation } from 'react-i18next';

export const TabNavigation = () => {  
  const { t } = useTranslation()

  const Tab = createBottomTabNavigator();
  const { storeCreator: { darkModeTheme, setAdsWatchCount } }: any = useContext(InputContextProvide)

  const adsCheckFnc = async () => {
    let adsWatchParameter: adsWatch | any = { dataTime: new Date().toDateString(), adsCount: 0 }
    const adsProvider: adsWatch | any = await LocalStorage.getValue(LocalStorageKeys.adsDetail)
    if (adsProvider?.dataTime !== new Date().toDateString() || adsProvider == null) {
      LocalStorage.setValue(LocalStorageKeys.adsDetail, adsWatchParameter)
      setAdsWatchCount(adsWatchParameter)
    } else {
      setAdsWatchCount(adsProvider)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      AdsClass.loadAds();
    }, 2000);
  }, [AdsClass.isLoadead])

  const onShowAdsHome = async () => {
    let homeConfigData = await HomeAdsEnable()
    person?.getHomeConfigData(homeConfigData)
  }

  useEffect(() => {
    onShowAdsHome()
    adsCheckFnc()
  }, [person?.home_ads])

  const getRouteIcon = (
    routeName: string,
  ): (({ color, ...props }: SvgProps) => JSX.Element) => {
    let Icon = Home;
    switch (routeName) {
      case ROUTES.VIEW:
        Icon = Home;
        break;
      case ROUTES.MYCAMPAIGN:
        Icon = MyCampaign;
        break;
      case ROUTES.EARNCOINS:
        Icon = TabEarnCoin;
        break;
      case ROUTES.SETTING:
        Icon = Setting;
        break;
    }
    return Icon;
  };

  return (
    <>
      <Tab.Navigator
        initialRouteName={ROUTES.VIEW}
        screenOptions={({ route }) => ({
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarStyle: [styles.tab, { backgroundColor: darkModeTheme ? Colors?.darkModeColor : Colors?.white }],
          tabBarIcon: ({ focused }) => {
            const Icon = getRouteIcon(route.name);
            return <Icon color={focused ? Colors?.primaryRed : Colors?.GrayLightC2C9D1} />;
          },
        })}>
        <Tab.Screen
          name={ROUTES.VIEW}
          component={ViewStack}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text style={[focused ? ActiveTabText.main : F50010.main]}>
                {t("view")}
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name={ROUTES.MYCAMPAIGN}
          component={MyCampaignLanding}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text numberOfLines={1} style={[focused ? ActiveTabText.main : F50010.main]}>
                {t("myCampaign")}
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name={ROUTES.EARNCOINS}
          component={EarnCoinStack}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text numberOfLines={1} style={[focused ? ActiveTabText.main : F50010.main]}>
                {t("earnCoin")}
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name={ROUTES.SETTING}
          component={SettingStack}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text style={[focused ? ActiveTabText.main : F50010.main]}>
                {t("setting")}
              </Text>
            ),
          }}
        />
      </Tab.Navigator>
      <SafeAreaView style={{ backgroundColor: darkModeTheme ? Colors?.darkModeColor : Colors?.white }} edges={["bottom"]} />
    </>
  );
};
const styles = StyleSheet.create({
  tab: {
    position: 'absolute',
    borderTopWidth: 1,
    height: 55,
    paddingBottom: "1%",
  },
});
