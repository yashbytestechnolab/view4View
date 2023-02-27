import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {ROUTES} from '../constants';
import Account from '../modules/Account/Account/Account';

function AccountNavigation() {
  type StackNavigatorParamList = {
    [ROUTES.AccountLanding]: object;
  };

  const Stack = createStackNavigator<StackNavigatorParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false
      }}>
      <Stack.Screen name={ROUTES.AccountLanding} component={Account} options={{ gestureEnabled: false }} />
    </Stack.Navigator>
  );
}

export default AccountNavigation;
