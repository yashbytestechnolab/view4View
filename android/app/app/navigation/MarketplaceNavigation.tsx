import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ROUTES } from '../constants';
import CategoryProducts from '../modules/Marketplace/CategoryProducts';
import Marketplace from '../modules/Marketplace/Marketplace';

function MarketplaceNavigation() {
  type StackNavigatorParamList = {
    [ROUTES.MarketPlaceLanding]: object;
    [ROUTES.MarketPlaceDetails]: object;
    [ROUTES.CategoryProducts]: object;
  };

  const Stack = createStackNavigator<StackNavigatorParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false
      }}>
      <Stack.Screen name={ROUTES.MarketPlaceLanding} component={Marketplace} options={{ gestureEnabled: false }}/>
      <Stack.Screen name={ROUTES.CategoryProducts} component={CategoryProducts} />

    </Stack.Navigator>
  );
}

export default MarketplaceNavigation;
