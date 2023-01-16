
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants/NavigationRoutes';
import { SettingLanding } from '../modules/Setting/SettingLanding';
import { InviteFriend } from '../modules/EarnCoin';
import { EditProfile } from '../modules/Setting/SettingLanding/EditProfile';
import { ChangePassword } from '../modules/Setting/SettingLanding/ChangePassword';

const Stack = createStackNavigator();

export const SettingStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES?.SETTING_LANDING}
      screenOptions={{
        cardOverlayEnabled: false,
        headerShown: false,
        gestureEnabled: true,
      }}>
      <Stack.Screen
        name={ROUTES.SETTING_LANDING}
        component={SettingLanding}
      />
      <Stack.Screen
        name={ROUTES.EDITPROFILE}
        component={EditProfile}
      />
      <Stack.Screen
        name={ROUTES.INVITEFRIEND}
        component={InviteFriend}
      />
       <Stack.Screen
        name={ROUTES?.CHANGEPASSWORD}
        component={ChangePassword}
      />
    </Stack.Navigator>
  );
};
