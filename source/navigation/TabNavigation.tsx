import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Images} from '../assets/image';
import {String, ROUTES} from '../constants';
import {HomeStack, ViewStack, EarnCoinStack} from '.';

export const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  const getRouteIcon = (routeName: string) => {let Image: string = Images?.homeTab;

    switch (routeName) {
      case ROUTES.HOME:
        Image = Images?.homeTab;
        break;
      case ROUTES.VIEW:
        Image = Images?.viewTab;
        break;
      case ROUTES.EARNCOINS:
        Image = Images?.earnCoin;
        break;
    }
    return Image;
  };

  return (
      <Tab.Navigator
        initialRouteName={ROUTES.HOME}
        screenOptions={({route}) => ({
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarIcon: () => {
            const image: HTMLImageElement = getRouteIcon(route?.name);
            return <Image source={image} style={styles.image} />;
          },
          tabBarStyle: styles.tab,
        })}>
        <Tab.Screen
          name={ROUTES?.HOME}
          component={HomeStack}
          listeners={({navigation}) => ({
            tabPress: () => {
              navigation.navigate(ROUTES.HOME);
            },
          })}
          options={{
            tabBarLabel: ({focused}) => (
              <Text style={focused ? styles.tabBarLabelStyle : styles.tabText}>
                {String?.headerTitle?.home}
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name={ROUTES?.VIEW}
          component={ViewStack}
          listeners={({navigation}) => ({
            tabPress: () => {
              navigation.navigate(ROUTES.HOME);
            },
          })}
          options={{
            tabBarLabel: ({focused}) => (
              <Text style={focused ? styles.tabBarLabelStyle : styles.tabText}>
                {String?.headerTitle?.view}
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name={ROUTES?.EARNCOINS}
          component={EarnCoinStack}
          listeners={({navigation}) => ({
            tabPress: () => {
              navigation.navigate(ROUTES.HOME);
            },
          })}
          options={{
            tabBarLabel: ({focused}) => (
              <Text style={focused ? styles.tabBarLabelStyle : styles.tabText}>
                {String?.headerTitle?.earnCoin}
              </Text>
            ),
          }}
        />
      </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  tab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    elevation: 0,
    height: 85,
    paddingBottom: '5%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  tabBarLabelStyle: {
    fontSize: 10,
    fontWeight: '600',
    color: 'red',
  },
  tabText: {
    fontSize: 10,
    fontWeight: '400',
    color: 'black',
  },
  image: {
    height: 15,
    width: 15,
  },
});
