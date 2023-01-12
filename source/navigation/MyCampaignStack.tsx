import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants/NavigationRoutes';
import { AddVideo, CreateCampaign, MyCampaignLandingScreen } from '../modules/MyCampaign';
import { ViewCoin } from '../modules/EarnCoin';

const Stack = createStackNavigator();

export const MyCampaignLanding = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.MYCAMPAIGN_LANDING}
      screenOptions={{
        cardOverlayEnabled: false,
        headerShown: false,
        gestureEnabled: true,
      }}>
      <Stack.Screen name={ROUTES.HOME_LANDING} component={MyCampaignLandingScreen} />
      <Stack.Screen
        options={{ gestureEnabled: false }}
        name={ROUTES.VIEWCOIN}
        component={ViewCoin}
      />
      <Stack.Screen name={ROUTES.ADDVIDEO} component={AddVideo} />
      <Stack.Screen name={ROUTES.CREATE_CAMPAIGN} component={CreateCampaign} />
    </Stack.Navigator>
  );
};
