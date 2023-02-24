import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { String, ROUTES } from '../constants';
import { ViewStack, EarnCoinStack, SettingStack, MyCampaignLanding } from '.';
import { Home, MyCampaign, Setting, TabEarnCoin } from '../assets/icons';
import { SvgProps } from 'react-native-svg';
import { ActiveTabText, Colors, } from '../Theme';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    <>
      <Tab.Navigator
        initialRouteName={ROUTES.VIEW}
        screenOptions={({ route }) => ({
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarStyle: [styles.tab],
          tabBarIcon: ({ focused }) => {
            const Icon = getRouteIcon(route.name);
            return <Icon color={focused ? Colors?.primaryRed : Colors?.GrayLightC2C9D1} />;
          },
        })}>
        {
          <Tab.Screen
            name={ROUTES.VIEW}
            component={ViewStack}
            options={{
              tabBarLabel: ({ focused }) => (
                <Text style={[focused ? ActiveTabText.main : {color:'black'}]}>
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
              <Text style={[focused ? ActiveTabText.main : {color:'black'}]}>
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
              <Text style={[focused ? ActiveTabText.main : {color:'black'}]}>
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
              <Text style={[focused ? ActiveTabText.main : {color:'black'}]}>
              {String?.headerTitle?.setting}
              </Text>
            ),
          }}
        />
      </Tab.Navigator>
      <SafeAreaView edges={["bottom"]} />
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
