
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '../constants/NavigationRoutes';
import {EarnCoinLanding} from '../modules/EarnCoin';

const Stack = createStackNavigator();

export const SettingStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES?.SETTING_LANDING}
      screenOptions={{
        cardOverlayEnabled: false,
        headerShown: false,
        gestureEnabled: true,
      }}>
      <Stack.Screen
        name={ROUTES.SETTING_LANDING}
        component={EarnCoinLanding}
      />
    </Stack.Navigator>
  );
};
