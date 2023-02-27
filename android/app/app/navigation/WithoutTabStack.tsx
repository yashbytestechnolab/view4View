import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';

import { ROUTES } from '../constants';
import { History } from '../modules/Account/History';
import ProfileSetting from '../modules/Account/Profile/ProfileSetting';
import Category from '../modules/Dashboard/Dashboard/Category/Category';
import { InfoGraphic } from '../modules/Dashboard/InfoGraphic';
import { Survey } from '../modules/Dashboard/Survey';
import { AddNewAddress } from '../modules/Marketplace/AddNewAddress';
import { AddNewCard } from '../modules/Marketplace/AddNewCard';
import { CartCheckout } from '../modules/Marketplace/CartCheckout';
import OrderConformation from '../modules/Marketplace/OrderConformation/OrderConformation';
import { ProductPage } from '../modules/Marketplace/ProductPage';
import { TabNavigation } from './TabNavigation';
import { FitnessTracker } from '../modules/AuthScreens/FitnessTracker';
import { Synced } from '../modules/AuthScreens/Synced';
import { Privacy } from '../modules/Account/Privacy';
import { TermsCondition } from '../modules/Account/TermsCondition';
import { Favorite } from '../modules/Account/Favorite';
import { Address } from '../modules/Account/Address/Address';
import { AddAddress } from '../modules/Account/Address/AddAddress';
import { LocalStorageKeys } from '../constants/LocalStorageKeys';
import * as LocalStorage from '../services/LocalStorage';
import { FindMarketPlace } from '../modules/Marketplace/FindMarketPlace';
import { View, Text, ActivityIndicator } from 'react-native';
import { Colour } from '../theme';
import { useIsFocused } from '@react-navigation/native';
import { LocationOverView } from '../modules/Deals/LocationOverview';
import { DealDetail } from '../modules/Deals/DealDetail';
import { SearchDeal } from '../modules/Deals/SearchDealList';
import { PaymentInformation } from '../modules/Account/PaymentInformation';
function WithoutTabStack() {
  type StackNavigatorParamList = {
    [ROUTES.DashboardLanding]: object;
    [ROUTES.Category]: object;
    [ROUTES.InfoGraphic]: object;
    [ROUTES.TabNavigation]: object;
    [ROUTES.Survey]: object;
    [ROUTES.ProductPage]: object;
    [ROUTES.CartCheckout]: object;
    [ROUTES.OrderConformation]: object;
    [ROUTES.AddNewCard]: object;
    [ROUTES.AddNewAddress]: object;
    [ROUTES.ProfileSetting]: object;
    [ROUTES.History]: object;
    [ROUTES.FitnessTracker]: object;
    [ROUTES.Synced]: object;
    [ROUTES.Address]: object;
    [ROUTES.Address2]: object;
    [ROUTES.AddAddress]: object;
    [ROUTES.Favorite]: object;
    [ROUTES.TermsCondition]: object;
    [ROUTES.Privacy]: object;
    [ROUTES.FindMarketPlace]: object;
    [ROUTES.SearchDeal]: object;
    [ROUTES.LocationOverView]: object;
    [ROUTES.DealDetail]: object;
    [ROUTES.PaymentInformation]: object;
  };

  const Stack = createStackNavigator<StackNavigatorParamList>();
  const focus = useIsFocused();
  const [isSyncWatchSkip, setIsSyncWatchSkip] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const getFirstEntry = () => {
    LocalStorage.getValue(LocalStorageKeys.syncWatchSkip).then(res => {
      setIsSyncWatchSkip(res ? false : true);
      setIsLoading(false);
    });
  };
  useEffect(() => {
    getFirstEntry();
  }, []);
  return (
    <>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colour.PrimaryBlue,
          }}>
          <Text>

            <ActivityIndicator size={'large'} />{' '}
          </Text>
        </View>
      ) : (
        <Stack.Navigator
          initialRouteName={
            isSyncWatchSkip ? ROUTES.FitnessTracker : ROUTES.TabNavigation
          }
          screenOptions={{
            headerShown: false,
            gestureEnabled: false
          }}>
          <Stack.Screen name={ROUTES.TabNavigation} component={TabNavigation} options={{ gestureEnabled: false }} />
          <Stack.Screen
            name={ROUTES.FitnessTracker}
            component={FitnessTracker}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name={ROUTES.Synced} component={Synced} options={{ gestureEnabled: false }} />
          <Stack.Screen name={ROUTES.Survey} component={Survey} options={{ gestureEnabled: false }} />
          <Stack.Screen name={ROUTES.Category} component={Category} options={{ gestureEnabled: false }} />
          <Stack.Screen name={ROUTES.InfoGraphic} component={InfoGraphic} options={{ gestureEnabled: false }} />
          <Stack.Screen name={ROUTES.ProductPage} component={ProductPage} options={{ gestureEnabled: false }} />
          <Stack.Screen name={ROUTES.CartCheckout} component={CartCheckout} options={{ gestureEnabled: false }} />
          <Stack.Screen
            name={ROUTES.FindMarketPlace}
            component={FindMarketPlace}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name={ROUTES.SearchDeal} component={SearchDeal} options={{ gestureEnabled: false }} />
          <Stack.Screen
            name={ROUTES.LocationOverView}
            component={LocationOverView}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name={ROUTES.DealDetail} component={DealDetail} options={{ gestureEnabled: false }} />
          <Stack.Screen
            name={ROUTES.OrderConformation}
            component={OrderConformation}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name={ROUTES.AddNewCard} component={AddNewCard} options={{ gestureEnabled: false }} />
          <Stack.Screen name={ROUTES.AddNewAddress} component={AddNewAddress} options={{ gestureEnabled: false }} />
          <Stack.Screen
            name={ROUTES.ProfileSetting}
            component={ProfileSetting}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name={ROUTES.History} component={History} options={{ gestureEnabled: false }} />
          <Stack.Screen name={ROUTES.Address2} component={Address} options={{ gestureEnabled: false }} />
          <Stack.Screen name={ROUTES.AddAddress} component={AddAddress} options={{ gestureEnabled: false }} />
          <Stack.Screen name={ROUTES.Favorite} component={Favorite} options={{ gestureEnabled: false }} />
          <Stack.Screen
            name={ROUTES.TermsCondition}
            component={TermsCondition}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name={ROUTES.Privacy} component={Privacy} options={{ gestureEnabled: false }} />
          <Stack.Screen name={ROUTES.PaymentInformation} component={PaymentInformation} options={{ gestureEnabled: false }} />
        </Stack.Navigator>
      )}
    </>
  );
}

export default WithoutTabStack;
