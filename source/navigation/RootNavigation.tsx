import { createStackNavigator } from '@react-navigation/stack';
import { Authentication, Dashboard, } from '.';
import { LocalStorageKeys, ROUTES } from '../constants';
import * as LocalStorage from '../services/LocalStorage';
import { useState, useEffect } from 'react';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import crashlytics from '@react-native-firebase/crashlytics';

export const RootNavigation = () => {
  const Stack = createStackNavigator();
  const [userId, setUserId] = useState(null);

  /**
   * This Function Check user id is in localstorage
   */

  const authFlow = async () => {
    await LocalStorage.getValue(LocalStorageKeys.UserId).then(res => res ? (setTimeout(() => SplashScreen.hide(), 1000), setUserId(res)) : setUserId(""))
  }

  useEffect(() => {
    authFlow()
    crashlytics().log("Root config file @@")
  }, [userId]);

  return (
    <>
      {userId == null ? null :
        <Stack.Navigator
          screenOptions={{ headerShown: false, gestureEnabled: false }}>
          {
            userId ? (
              <Stack.Screen
                name={ROUTES.ONBORDING}
                component={Dashboard}
                options={{ gestureEnabled: false }}
              />
            ) : (
              <Stack.Screen
                name={ROUTES.AUTH}
                component={Authentication}
                options={{ gestureEnabled: false }}
              />
            )
          }
        </Stack.Navigator >}
    </>
  );
};

