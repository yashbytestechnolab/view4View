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
      <Stack.Screen name={ROUTES.HOME_LANDING} component={MyCampaignLandingScreen} />
      <Stack.Screen
        name={ROUTES.VIEWCOIN}
        component={ViewCoin}
      />
      <Stack.Screen name={ROUTES.ADDVIDEO} component={AddVideo} />
      <Stack.Screen name={ROUTES.CREATE_CAMPAIGN} component={CreateCampaign} />
      <Stack.Screen
        name={ROUTES.EARNCOINS_LANDING}
        component={EarnCoinLanding}
      />
      <Stack.Screen
        name={ROUTES.INVITEFRIEND}
        component={InviteFriend}
      />
      <Stack.Screen
        name={ROUTES.BUYCOIN}
        component={BuyCoin}
      />
       <Stack.Screen
        name={ROUTES.SHOWADDS}
        component={ShowAdds}
      />
    </Stack.Navigator>
  );
};
