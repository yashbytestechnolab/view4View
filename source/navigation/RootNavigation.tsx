import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Authentication, Dashboard, } from '.';
import { LocalStorageKeys, ROUTES } from '../constants';
import * as LocalStorage from '../services/LocalStorage';
import { useState, useEffect } from 'react';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { useContext } from 'react';
import { InputContextProvide } from '../context/CommonContext';
import { Appearance } from 'react-native';



export const RootNavigation = () => {
  const Stack = createStackNavigator();
  const [userId, setUserId] = useState(null);
  const { storeCreator: { setDarkModeTheme } }: any = useContext(InputContextProvide)

  /**
   * This Function Check user id is in localstorage
   */
  //then((darkMode: boolean | any) => darkMode ? setDarkModeTheme(darkMode?.isDarkMode) : setDarkModeTheme(false))
  const colorScheme = Appearance.getColorScheme();
  
  const authFlow = async () => {
    let appearance: any = await LocalStorage.getValue(LocalStorageKeys.DarkMode)
    if (appearance != null) {
      if (appearance?.isDarkMode) {
        setDarkModeTheme(true)
      }
      else if (!appearance?.isDarkMode) {
        setDarkModeTheme(false)
      }
    } else {
      colorScheme == "light" ? setDarkModeTheme(false) : setDarkModeTheme(true)
    }
    await LocalStorage.getValue(LocalStorageKeys.UserId).then(res => res ? (SplashScreen.hide(), setUserId(res)) : setUserId(""))
  }

  useEffect(() => {
    authFlow()
  }, [userId]);

  return (
    <>
      {
        userId == null ? null :
          < Stack.Navigator
            screenOptions={{ headerShown: false, gestureEnabled: false }}>
            {
              userId.length > 0 ? (
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
          </Stack.Navigator >
      }
    </>
  );
};
