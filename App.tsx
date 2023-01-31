import React, { useCallback, useEffect, useState } from 'react';
import { RootNavigation } from './source/navigation/RootNavigation';
import CommonContext from './source/context/CommonContext';
import FlashMessage from 'react-native-flash-message';
import AppLoader from './source/components/AppLoader';
import { UpdateBuildVersion } from './source/services/UpdateBuildVersion';
import { InviteFriend } from './source/modules/EarnCoin';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { rewardConfig } from './source/services';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { person } from './source/modules/View/increment';
import { Platform, Appearance } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import { NoInternetConnect } from './source/services/NoInternetConnect';
import SplashScreen from 'react-native-splash-screen';
import { useNetInfo } from '@react-native-community/netinfo';
import { LocalStorageKeys } from './source/constants';
import * as LocalStorage from './source/services/LocalStorage';
import { Colors } from './source/Theme';
interface reward {
  adsRewarAmt: number | string,
  referRewardAmt: number | string
}
export default function App() {
  const [updateAlert, setUpdateAlert] = useState(false)
  const [reward, setReward] = useState<reward>({ adsRewarAmt: 0, referRewardAmt: 0 })
  const [darkModeTheme, setDarkModeTheme] = useState(false)
  const netInfoStaus = useNetInfo()
  const status = netInfoStaus?.isConnected

  const getReward = async () => {
    UpdateBuildVersion(setUpdateAlert)
    let remo = await rewardConfig()
    setReward(remo)
  }
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      person?.getPermissionOfDevices(true)
    }
    else {
      person?.getPermissionOfDevices(false)
    }
  }

  const getDarkModeUI = async () => {
    const colorScheme = Appearance.getColorScheme();
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
  }

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000)
  }, [netInfoStaus, status])

  useEffect(() => {
    getDarkModeUI()
    getReward()
    Platform.OS === "ios" && PushNotificationIOS.removeAllDeliveredNotifications();
    requestUserPermission()
    crashlytics().log("config file")
  }, [updateAlert])

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: darkModeTheme ? Colors.darkModeColor : Colors.white
    },
  };

  return (
    <>
      {status ?
        <CommonContext reward={reward} setReward={setReward} darkModeTheme={darkModeTheme} setDarkModeTheme={setDarkModeTheme} >
          <AppLoader />
          <NavigationContainer theme={MyTheme}  >
            {updateAlert ?
              <InviteFriend notifyUpdate={updateAlert} /> :
              <>
                <RootNavigation />
                <FlashMessage position="top" />
              </>}
          </NavigationContainer>
        </CommonContext>
        : <NoInternetConnect />
      }
    </>
  );
}


