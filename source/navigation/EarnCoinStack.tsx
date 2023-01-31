import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants/NavigationRoutes';
import { EarnCoinLanding, ViewCoin, InviteFriend, ShowAdds } from '../modules/EarnCoin';
import { BuyCoin } from '../modules/EarnCoin/BuyCoin';
import { person } from '../modules/View/increment';


const Stack = createStackNavigator();

export const EarnCoinStack = () => {
  return (
    <Stack.Navigator
      screenListeners={(props) => person?.getRouteName(props?.route?.name)}
      initialRouteName={ROUTES.EARNCOINS_LANDING}
      screenOptions={{
        cardStyle: {
          backgroundColor: "red"
        },
        cardOverlayEnabled: false,
        headerShown: false,
        gestureEnabled: true,
      }}>
      <Stack.Screen
        name={ROUTES.EARNCOINS_LANDING}
        component={EarnCoinLanding}
      />
      <Stack.Screen
        options={{ gestureEnabled: false }}
        name={ROUTES.VIEWCOIN}
        component={ViewCoin}
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
