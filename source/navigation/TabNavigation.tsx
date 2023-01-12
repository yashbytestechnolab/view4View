import React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { String, ROUTES } from '../constants';
import { ViewStack, EarnCoinStack, SettingStack, MyCampaignLanding } from '.';
import { Home, MyCampaign, Setting, TabEarnCoin } from '../assets/icons';
import { SvgProps } from 'react-native-svg';
import { ActiveTabText, Colors, F50010 } from '../Theme';

export const TabNavigation = () => {
  const Tab = createBottomTabNavigator();

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
    <Tab.Navigator
      initialRouteName={ROUTES.VIEW}
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: styles.tab,
        tabBarIcon: ({ focused }) => {
          const Icon = getRouteIcon(route.name);
          return <Icon color={focused ? Colors?.primaryRed : Colors?.GrayLightC2C9D1} />;
        },

      })}>
      <Tab.Screen
        name={ROUTES?.VIEW}
        component={ViewStack}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={[focused ? ActiveTabText.main : F50010.main]}>
              {String?.headerTitle?.view}
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES?.MYCAMPAIGN}
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
        name={ROUTES?.EARNCOINS}
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
        name={ROUTES?.SETTING}
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
  );
};
const styles = StyleSheet.create({
  tab: {
    marginTop: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    elevation: 7,
    shadowColor: Colors?.blackShadow,
    shadowOpacity: 0.8,
    shadowRadius: 4,
    shadowOffset: {
      height: 1,
      width: 1
    },
    borderTopWidth: 1,
    height: 63,
    paddingTop: '2%',
    paddingBottom: "3%",
    alignSelf: 'center',
    alignItems: 'center',
  },
});
