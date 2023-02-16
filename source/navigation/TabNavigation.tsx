import React, { useContext, useEffect } from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { String, ROUTES } from '../constants';
import { ViewStack, EarnCoinStack, SettingStack, MyCampaignLanding } from '.';
import { Home, MyCampaign, Setting, TabEarnCoin } from '../assets/icons';
import { SvgProps } from 'react-native-svg';
import { ActiveTabText, Colors, F50010 } from '../Theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { InputContextProvide } from '../context/CommonContext';
import VersionInfo from 'react-native-version-info';
import { AdsClass } from '../services/AdsLoad';
import { person } from '../modules/View/increment';
import { HomeAdsEnable } from '../services/HomeAdsEnable';

export const TabNavigation = () => {
  const appVersion: any = VersionInfo.appVersion;
  const Tab = createBottomTabNavigator();
  const { storeCreator: { darkModeTheme, reviewVersionIos } }: any = useContext(InputContextProvide)

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
  // console.log("me"||"ji");

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
        {
          !(Platform.OS === "ios" && appVersion == reviewVersionIos) &&
          <Tab.Screen
            name={ROUTES.VIEW}
            component={ViewStack}
            options={{
              tabBarLabel: ({ focused }) => (
                <Text style={[focused ? ActiveTabText.main : F50010.main]}>
                  {String?.headerTitle?.view}
                </Text>
              ),
            }}
          />
        }
        <Tab.Screen
          name={ROUTES.MYCAMPAIGN}
          component={MyCampaignLanding}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text style={[focused ? ActiveTabText.main : F50010.main]}>
                {String?.headerTitle?.myCampaign}
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name={ROUTES.EARNCOINS}
          component={EarnCoinStack}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text style={[focused ? ActiveTabText.main : F50010.main]}>
                {String?.headerTitle?.earnCoin}
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
                {String?.headerTitle?.setting}
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
