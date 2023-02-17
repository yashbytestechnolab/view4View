import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants/NavigationRoutes';
import { EarnCoinLanding, ViewCoin, InviteFriend, ShowAdds } from '../modules/EarnCoin';
import { BuyCoin } from '../modules/EarnCoin/BuyCoin';
import { person } from '../modules/View/increment';
import { Tips } from '../assets/icons';
import { TipsDescription } from '../modules/Tips/TipsDescription/TipsDescription';
import { TipsView } from '../modules/Tips/TipsView';


const Stack = createStackNavigator();

export const TipsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.TIPS}
      screenOptions={{
        cardOverlayEnabled: false,
        headerShown: false,
      }}>
      <Stack.Screen
        name={ROUTES.TIPS}
        component={TipsView}
      />
      <Stack.Screen
        options={{ gestureEnabled: false }}
        name={ROUTES.TIPSDESCRIPTION}
        component={TipsDescription}
      />
    </Stack.Navigator>
  );
};
