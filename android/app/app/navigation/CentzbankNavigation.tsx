import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ROUTES } from '../constants';
import CentZBank from '../modules/CentZBank/CentZBank';

function CentZBankNavigation() {
  type StackNavigatorParamList = {
    [ROUTES.CentzBankingLanding]: object;
  };

  const Stack = createStackNavigator<StackNavigatorParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false
      }}>
      <Stack.Screen name={ROUTES.CentzBankingLanding} component={CentZBank} options={{ gestureEnabled: false }} />
    </Stack.Navigator>
  );
}

export default CentZBankNavigation;
