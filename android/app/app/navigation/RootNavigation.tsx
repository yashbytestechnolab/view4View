import React, { FC, useEffect, useState, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants';
import { UnAuthNavigation } from './UnAuthNavigation';
import WithoutTabStack from './WithoutTabStack';
import { AuthContext } from '../context/AuthContext';
import * as LocalStorage from '../services/LocalStorage';
import { LocalStorageKeys } from '../constants/LocalStorageKeys';
import SplashScreen from '../modules/SplashScreen/splashScreen';
import { Colour } from '../theme';
import DeepLinkHandler from '../../DeepLinkHandler';
type StackNavigatorParamList = {
  [ROUTES.UnauthNavigator]: object;
  [ROUTES.TabNavigation]: object;
  [ROUTES.WithoutTabStack]: object;
  [ROUTES.SplashScreen]: object;
};

const Stack = createStackNavigator<StackNavigatorParamList>();

export const RootNavigation: FC = () => {
  const [accessToken, setAccessToken] = useState('');
  const [isSetAccessToken, setIsSetAccessToken] = useState(false);

  useEffect(() => {
    LocalStorage.getValue(LocalStorageKeys.accessToken).then(responce => {
      setTimeout(() => {
        setAccessToken(responce);
        setIsSetAccessToken(true);
      }, 1000);
    });
  }, []);

  const authContext: any = useMemo(() => {
    return {
      signIn: (data: any) => {
        LocalStorage.setValue(LocalStorageKeys.accessToken, data);
        setAccessToken(data);
      },

      signOut: () => {
        LocalStorage.setValue(LocalStorageKeys.accessToken, '');
        LocalStorage.setValue(LocalStorageKeys.userInfo, '');
        setAccessToken('');
      },
    };
  }, []);
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={{ colors: { background: Colour.PrimaryBlue } }}>
        <Stack.Navigator

          screenOptions={{
            headerShown: false,
            gestureEnabled: false
          }}>
          {isSetAccessToken ?
            accessToken ? (
              <Stack.Screen
                name={ROUTES.WithoutTabStack}
                component={WithoutTabStack}
                options={{ gestureEnabled: false }}
              />
            ) : (
              <Stack.Screen
                name={ROUTES.UnauthNavigator}
                component={UnAuthNavigation}
                options={{ gestureEnabled: false }}
              />
              )
              :
              <Stack.Screen
              name={ROUTES.SplashScreen}
              component={SplashScreen}
              options={{ gestureEnabled: false }}
              />
            }
        </Stack.Navigator>
        <DeepLinkHandler />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
