import React, {FC, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '../constants';
import {ActivityIndicator, View, Text} from 'react-native';
import {SwipePage1} from '../modules/AuthScreens/SwipePage1';
import {SignUp} from '../modules/AuthScreens/SignUp';
import {Login} from '../modules/AuthScreens/Login';
import {FitnessTracker} from '../modules/AuthScreens/FitnessTracker';
import {Synced} from '../modules/AuthScreens/Synced';
import * as LocalStorage from '../services/LocalStorage';
import {FPStep1} from '../modules/AuthScreens/ForgotPassword/ForgotPassWordStep1';
import {FPStep3} from '../modules/AuthScreens/ForgotPassword/ForgotPassWordStep3';
import {FPStep2} from '../modules/AuthScreens/ForgotPassword/ForgotPasswordStep2';
import {FPStep4} from '../modules/AuthScreens/ForgotPassword/ForgotPasswordStep4';
import { LocalStorageKeys } from '../constants/LocalStorageKeys';
import { Colour } from '../theme';

type StackNavigatorParamList = {
  [ROUTES.UnauthNavigator]: object;
  [ROUTES.Login]: object;
  [ROUTES.ForgetPassword]: object;
  [ROUTES.SwipePage1]: object;
  [ROUTES.SignUp]: object;
  // [ROUTES.FitnessTracker]: object;
  // [ROUTES.Synced]: object;
  [ROUTES.FPStep1]: object;
  [ROUTES.FPStep2]: object;
  [ROUTES.FPStep3]: object;
  [ROUTES.FPStep4]: object;
};

const Stack = createStackNavigator<StackNavigatorParamList>();

export const UnAuthNavigation: FC = () => {
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState('');
  useEffect(() => {
    LocalStorage.getValue(LocalStorageKeys.isFirstTimeUser).then(res => {
      LocalStorage.getValue(LocalStorageKeys.accessToken).then(tokenResponce => {
        setUserToken(tokenResponce);
        setIsFirstTimeUser(res ? false : true);
        setIsLoading(false);
      });

    })
  }, []);
  return (
    <>
    {isLoading ? <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:Colour.PrimaryBlue}}><Text> <ActivityIndicator size={'large'} /> </Text></View>
    :
    <Stack.Navigator
      initialRouteName={ isFirstTimeUser ? ROUTES.SwipePage1 : (userToken != null ? ROUTES.Login : ROUTES.SignUp)}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ROUTES.SwipePage1} component={SwipePage1} options={{ gestureEnabled: false }} />
      <Stack.Screen name={ROUTES.SignUp} component={SignUp} options={{ gestureEnabled: false }} />
      <Stack.Screen name={ROUTES.Login} component={Login} options={{ gestureEnabled: false }}/>
      {/* <Stack.Screen name={ROUTES.FitnessTracker} component={FitnessTracker} />
      <Stack.Screen name={ROUTES.Synced} component={Synced} /> */}
      <Stack.Screen name={ROUTES.FPStep1} component={FPStep1} options={{ gestureEnabled: false }} />
      <Stack.Screen name={ROUTES.FPStep2} component={FPStep2} options={{ gestureEnabled: false }} />
      <Stack.Screen name={ROUTES.FPStep3} component={FPStep3} options={{ gestureEnabled: false }}/>
      <Stack.Screen name={ROUTES.FPStep4} component={FPStep4} options={{ gestureEnabled: false }}/>
    </Stack.Navigator>
}
    </>
  );
};
