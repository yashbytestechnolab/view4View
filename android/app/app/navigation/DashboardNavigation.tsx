import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {ROUTES} from '../constants';
import {Dashboard} from '../modules/Dashboard/Dashboard';

function DashboardNavigation() {
  type StackNavigatorParamList = {
    [ROUTES.DashboardLanding]: object;
    [ROUTES.Category]: object;
    [ROUTES.InfoGraphic]: object;
  };

  const Stack = createStackNavigator<StackNavigatorParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ROUTES.DashboardLanding} component={Dashboard} options={{ gestureEnabled: false }}/>
    </Stack.Navigator>
  );
}

export default DashboardNavigation;
