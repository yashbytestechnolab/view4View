import React, {FC} from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {styles} from './TabStyles';
import {ROUTES} from '../constants';
import DashboardNavigation from './DashboardNavigation';
import DealsNavigation from './DealsNavigation';
import CentZBankNavigation from './CentzbankNavigation';
import MarketplaceNavigation from './MarketplaceNavigation';
import AccountNavigation from './AccountNavigation';
import {Account, Home, CentzBank, Deals, Marketplace} from '../assets/icons';
import {SvgProps} from 'react-native-svg';
import {Colour} from '../theme';
import {BlurView} from '@react-native-community/blur';

type TabNavigatorParamList = {
  [ROUTES.Dashboard]: object;
  [ROUTES.Deals]: object;
  [ROUTES.CentZBank]: object;
  [ROUTES.MarketPlace]: object;
  [ROUTES.Account]: object;
};
const Tab = createBottomTabNavigator<TabNavigatorParamList>();

export const TabNavigation: FC = () => {
  const getRouteIcon = (
    routeName: string,
  ): (({color, ...props}: SvgProps) => JSX.Element) => {
    let Icon = Account;
    switch (routeName) {
      case ROUTES.Dashboard:
        Icon = Home;
        break;
      case ROUTES.Deals:
        Icon = Deals;
        break;
      case ROUTES.CentZBank:
        Icon = CentzBank;
        break;
      case ROUTES.MarketPlace:
        Icon = Marketplace;
        break;
      case ROUTES.Account:
        Icon = Account;
        break;
    }
    return Icon;
  };
  return (
    <Tab.Navigator
    initialRouteName={ROUTES.Dashboard}
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          backgroundColor: Colour.white,
          height: 75,
          paddingBottom: 21,
          paddingTop: 16,
          //position: 'absolute',
        },

        tabBarIcon: ({focused}) => {
          const Icon = getRouteIcon(route.name);
          return <Icon color={focused ? '#00C2FF' : ''} />;
        },
        tabBarActiveTintColor: '#0F0742',
        tabBarInactiveTintColor: '#0F0742',
        headerShown: false,
      })}>
      <Tab.Screen
        name={ROUTES.Dashboard}
        component={DashboardNavigation}
        options={{
          tabBarLabel: ({focused, color, size}: any) => (
            <Text style={focused ? styles.tabBarLabelStyle : styles.tabText}>
              Dashboard
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.Deals}
        component={DealsNavigation}
        options={{
          tabBarLabel: ({focused, color, size}: any) => (
            <Text style={focused ? styles.tabBarLabelStyle : styles.tabText}>
              Deals
            </Text>
          ),
        }}

        // options={({route}) => {
        //   let tabBarVisible = true;
        //   const routeName = getFocusedRouteNameFromRoute(route);
        //   console.log('Deals', routeName);
        //   if (routeName !== undefined && routeName !== 'DealsLanding') {
        //     tabBarVisible = false;
        //   }
        //   return {
        //     tabBarLabel: ({focused, color, size}: any) => (
        //       <Text style={focused ? styles.tabBarLabelStyle : styles.tabText}>
        //         Deals
        //       </Text>
        //     ),
        //     tabBarVisible: tabBarVisible,
        //   };
        // }}
      />
      <Tab.Screen
        name={ROUTES.CentZBank}
        component={CentZBankNavigation}
        options={{
          tabBarLabel: ({focused, color, size}: any) => (
            <Text style={focused ? styles.tabBarLabelStyle : styles.tabText}>
              Centzbank
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.MarketPlace}
        component={MarketplaceNavigation}
        options={{
          tabBarLabel: ({focused, color, size}: any) => (
            <Text style={focused ? styles.tabBarLabelStyle : styles.tabText}>
              Marketplace
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.Account}
        component={AccountNavigation}
        options={{
          tabBarLabel: ({focused, color, size}: any) => (
            <Text style={focused ? styles.tabBarLabelStyle : styles.tabText}>
              Account
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
