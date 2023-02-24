import { createStackNavigator } from '@react-navigation/stack';
import { Authentication, Dashboard, } from '.';
import { LocalStorageKeys, ROUTES } from '../constants';
import * as LocalStorage from '../services/LocalStorage';
import { useState, useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

import React from 'react';

export const RootNavigation = () => {
  const Stack = createStackNavigator();
  const [userId, setUserId] = useState(null);

  const authFlow = async () => {
    await LocalStorage.getValue(LocalStorageKeys?.UserId).then(res => res ? setUserId(res) : setUserId(""))
    SplashScreen.hide()
  }

  useEffect(() => {
    authFlow()
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

