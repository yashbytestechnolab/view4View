import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {ROUTES} from '../constants';

import Deals from '../modules/Deals/Deals';

function DealsNavigation() {
  type StackNavigatorParamList = {
    [ROUTES.DealsLanding]: object;
  };

  const Stack = createStackNavigator<StackNavigatorParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false
      }}>
      <Stack.Screen name={ROUTES.DealsLanding} component={Deals} options={{ gestureEnabled: false }} />
    </Stack.Navigator>
  );
}

export default DealsNavigation;
