import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LocalStorageKeys, ROUTES } from '../constants';
import { Login } from '../modules/authentication/Login/Login';
import { TabNavigation } from './TabNavigation';
import * as LocalStorage from '../services/LocalStorage';
import { Introduction } from '../modules/authentication/Inroduction';
import { Loader } from '../components';
import { CreateAccount } from '../modules/authentication/CreateAccount';

const Stack: any = createStackNavigator();

export const Authentication = () => {
  const [isFirstTimeLogInUser, setIsFirstTimeLoginUser] = useState<boolean>();
  const [loading, setLoading] = useState<boolean | null>(null)
 
    const onBord = async () => {
      await LocalStorage.getValue(LocalStorageKeys?.isFirstTimeLogin).then((res) => {
        setLoading(true)
        if (res == true)
          setIsFirstTimeLoginUser(res == true ? true : false)
      })
      setLoading(false)
    }

  useEffect(() => {
    onBord()
  }, [isFirstTimeLogInUser])

  return (
    <>
      {
        loading == null || loading == true ?
          <Loader /> :
          <Stack.Navigator
            initialRouteName={!isFirstTimeLogInUser ? ROUTES.INTRODUCATION : ROUTES?.LOGIN}
            screenOptions={{
              cardOverlayEnabled: false,
              headerShown: false,
              gestureEnabled: true,
            }}>
            <Stack.Screen name={ROUTES.INTRODUCATION} component={Introduction} />
            <Stack.Screen name={ROUTES.LOGIN} component={Login} />
            <Stack.Screen name={ROUTES.CREATEACCOUNT} component={CreateAccount} />
            <Stack.Screen name={ROUTES.TABLIST} component={TabNavigation} />
          </Stack.Navigator>
      }
    </>
  );
};


export const OnBording = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.TABLIST}
      screenOptions={{
        cardOverlayEnabled: false,
        headerShown: false,
        gestureEnabled: true,
      }}>
      <Stack.Screen name={ROUTES.TABLIST} component={TabNavigation} />
      <Stack.Screen name={ROUTES.LOGIN} component={Login} />
    </Stack.Navigator>
  );
}
