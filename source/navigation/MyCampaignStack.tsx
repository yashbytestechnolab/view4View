import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants/NavigationRoutes';
import { AddVideo, CreateCampaign, MyCampaignLandingScreen } from '../modules/MyCampaign';
import { EarnCoinLanding, InviteFriend, ShowAdds, ViewCoin } from '../modules/EarnCoin';
import { EarnCoinStack } from './EarnCoinStack';
import { BuyCoin } from '../modules/EarnCoin/BuyCoin';

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
      <Stack.Screen name={ROUTES.CAMPAIGNLANDING} component={MyCampaignLandingScreen} />
     
    </Stack.Navigator>
  );
};
