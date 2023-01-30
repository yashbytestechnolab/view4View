import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants/NavigationRoutes';
import { ViewLanding } from '../modules/View';
import { EarnCoinLanding, ViewCoin } from '../modules/EarnCoin';

const Stack = createStackNavigator();

export const ViewStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.VIEW_LANDING}
      screenOptions={{
        cardOverlayEnabled: false,
        headerShown: false,
        gestureEnabled: true,
      }}>
      <Stack.Screen
        name={ROUTES.VIEW_LANDING}
        component={ViewLanding} />
      <Stack.Screen
        name={ROUTES.VIEWCOIN}
        component={ViewCoin}
      />
      <Stack.Screen
        name={ROUTES.EARNCOINS_LANDING}
        component={EarnCoinLanding}
      />
    </Stack.Navigator>
  );
};
