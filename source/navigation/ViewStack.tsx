import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants/NavigationRoutes';
import { ViewLanding } from '../modules/View';

const Stack = createStackNavigator();

export const ViewStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.VIEW_LANDING}
      screenOptions={{
        cardOverlayEnabled: false,
        headerShown: false,
        gestureEnabled: true,
      }}>
      <Stack.Screen
        name={ROUTES.VIEW_LANDING}
        component={ViewLanding} />

    </Stack.Navigator>
  );
};
