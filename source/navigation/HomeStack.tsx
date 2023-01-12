import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants/NavigationRoutes';
import { CreateCampaign, HomeLanding } from '../modules/MyCampaign';
import { ViewCoin } from '../modules/EarnCoin';

const Stack = createStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.HOME_LANDING}
      screenOptions={{
        cardOverlayEnabled: false,
        headerShown: false,
        gestureEnabled: true,
      }}>
      <Stack.Screen name={ROUTES.HOME_LANDING} component={HomeLanding} />
      <Stack.Screen
        options={{ gestureEnabled: false }}
        name={ROUTES.VIEWCOIN}
        component={ViewCoin}
      />
      <Stack.Screen name={ROUTES.CREATE_CAMPAIGN} component={CreateCampaign} />
    </Stack.Navigator>
  );
};
