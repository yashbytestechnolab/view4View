import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '../constants/NavigationRoutes';
import { CreateCampaign, HomeLanding } from '../modules/Home';

const Stack = createStackNavigator();

export const MyCampaignStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.MYCAMPAIGN_LANDING}
      screenOptions={{
        cardOverlayEnabled: false,
        headerShown: false,
        gestureEnabled: true,
      }}>
        <Stack.Screen name={ROUTES.HOME_LANDING} component={HomeLanding} />
      <Stack.Screen name={ROUTES.CREATE_CAMPAIGN} component={CreateCampaign} />
    </Stack.Navigator>
  );
};
