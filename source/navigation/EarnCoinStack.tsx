import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants/NavigationRoutes';
import { EarnCoinLanding, ViewCoin, InviteFriend } from '../modules/EarnCoin';


const Stack = createStackNavigator();

export const EarnCoinStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.EARNCOINS_LANDING}
      screenOptions={{
        cardOverlayEnabled: false,
        headerShown: false,
        gestureEnabled: true,
      }}>
      <Stack.Screen
        name={ROUTES.EARNCOINS_LANDING}
        component={EarnCoinLanding}
      />
      <Stack.Screen
        name={ROUTES.VIEWCOIN}
        component={ViewCoin}
      />
      <Stack.Screen
        name={ROUTES.INVITEFRIEND}
        component={InviteFriend}
      />
    </Stack.Navigator>
  );
};
