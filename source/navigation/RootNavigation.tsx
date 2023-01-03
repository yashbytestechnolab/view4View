import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Authentication, OnBording } from '.';
import { LocalStorageKeys, ROUTES } from '../constants';
import * as LocalStorage from '../services/LocalStorage';
import { useState, useEffect } from 'react';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Colors } from '../Theme';

export const RootNavigation = () => {
  const Stack = createStackNavigator();
  const [userId, setUserId] = useState(null);

  /**
   * This Function Check user id is in localstorage
   */
  const authFlow = async () => {
    await LocalStorage.getValue(LocalStorageKeys.UserId).then(res => res ? (SplashScreen.hide(), setUserId(res)) : setUserId(""))
  }

  useEffect(() => {
    authFlow()
  }, [userId]);

  return (
    <>
      {
        userId == null ? null :
          <NavigationContainer>
            < Stack.Navigator
              screenOptions={{ headerShown: false, gestureEnabled: false }}>
              {
                userId.length > 0 ? (
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
