import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LocalStorageKeys, ROUTES } from '../constants';
import { Login } from '../modules/authentication/Login/Login';
import { TabNavigation } from './TabNavigation';
import * as LocalStorage from '../services/LocalStorage';
import { Introduction, ForgotPassword } from '../modules/authentication';
import { CreateAccount } from '../modules/authentication/CreateAccount';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();

export const Authentication = () => {
  const [isFirstTimeLogInUser, setIsFirstTimeLoginUser] = useState<boolean>();
  const [loading, setLoading] = useState<boolean | null>(null)

  const onBord = async () => {
    await LocalStorage.getValue(LocalStorageKeys?.IsFirstTimeLogin).then((res) => {
      setLoading(true)
      if (res == true)
        setIsFirstTimeLoginUser(res == true ? true : false)
    })
    setLoading(false)
    SplashScreen.hide();
  }

  useEffect(() => {
    onBord()
  }, [isFirstTimeLogInUser])

  return (
    <>
      {
        loading == null || loading == true ?
          null :
          <Stack.Navigator

            initialRouteName={!isFirstTimeLogInUser ? ROUTES.INTRODUCATION : ROUTES?.LOGIN}
            screenOptions={{
              cardOverlayEnabled: false,
              headerShown: false,
              gestureEnabled: true,

            }}>
            <Stack.Screen name={ROUTES.INTRODUCATION} component={Introduction} />
            <Stack.Screen name={ROUTES.LOGIN} component={Login} />
            <Stack.Screen name={ROUTES.FORGOTPASSWORD} component={ForgotPassword} />
            <Stack.Screen name={ROUTES.CREATEACCOUNT} component={CreateAccount} />
            <Stack.Screen name={ROUTES.TABLIST} component={TabNavigation} />
          </Stack.Navigator>
      }
    </>
  );
};


export const Dashboard = () => {
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
      <Stack.Screen name={ROUTES.FORGOTPASSWORD} component={ForgotPassword} />
      <Stack.Screen name={ROUTES.CREATEACCOUNT} component={CreateAccount} />
    </Stack.Navigator>
  );
}
