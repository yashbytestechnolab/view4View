import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Authentication, OnBording } from '.';
import { ROUTES } from '../constants';
import * as LocalStorage from '../services/LocalStorage';
import { useState, useEffect } from 'react';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';

import CommonContext from '../context/CommonContext';

export const RootNavigation = () => {
  const Stack = createStackNavigator();
  const [UserId, setUserId] = useState<null | undefined | string>(null);
  const authFlow = async () => {
    await LocalStorage.getValue("userLoginId").then(res => res ? setUserId(res) : setUserId(""))
    SplashScreen.hide();
  }
  useEffect(() => {
    authFlow()
  }, [UserId]);


  return (
    <>
      {
        UserId == null ? null :
          <NavigationContainer>
            < Stack.Navigator
              screenOptions={{
                headerShown: false, gestureEnabled: false,
              }
              }>
              {
                UserId.length > 0 ? (
                  <Stack.Screen
                    name={ROUTES.ONBORDING}
                    component={OnBording}
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
            </Stack.Navigator >
          </NavigationContainer >
      }
    </>
  );
};
