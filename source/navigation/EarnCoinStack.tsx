import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants/NavigationRoutes';
import { ViewCoin } from '../modules/EarnCoin';
import { CreateCamp } from '../modules/EarnCoin/CreateCamp';
import { CreateCampaign } from '../modules/MyCampaign';

const Stack = createStackNavigator();

export const EarnCoinStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.VIEWCOIN}
      screenOptions={{
        cardOverlayEnabled: false,
        headerShown: false,
        gestureEnabled: true,
      }}>
      {/* <Stack.Screen
        name={ROUTES.EARNCOINS_LANDING}
        component={EarnCoinLanding}
      /> */}
      <Stack.Screen
        name={ROUTES.VIEWCOIN}
        component={ViewCoin}
      />
      <Stack.Screen
        name={ROUTES.CREATECAMP}
        component={CreateCamp}
      />
           <Stack.Screen name={ROUTES.CREATE_CAMPAIGN} component={CreateCampaign} />

    </Stack.Navigator>
  );
};
