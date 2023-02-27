import React, { useEffect, useState } from 'react';
import { RootNavigation } from './source/navigation/RootNavigation';
import CommonContext from './source/context/CommonContext';
import FlashMessage from 'react-native-flash-message';
import AppLoader from './source/components/AppLoader';
import { UpdateBuildVersion } from './source/services/UpdateBuildVersion';
import { InviteFriend } from './source/modules/EarnCoin';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { ReviewVersionIos, rewardCoinsDefaultValue, rewardConfig } from './source/services';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { person } from './source/modules/View/increment';
import { Platform, Appearance } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import { NoInternetConnect } from './source/services/NoInternetConnect';
import { LocalStorageKeys } from './source/constants';
import * as LocalStorage from './source/services/LocalStorage';
import { Colors } from './source/Theme';
interface reward {
  adsRewarAmt: number | string,
  referRewardAmt: number | string
}
import { LogBox } from 'react-native';

export default function App() {
  const [updateAlert, setUpdateAlert] = useState(false)
  const [reward, setReward] = useState<reward>({ adsRewarAmt: 0, referRewardAmt: 0 })
  const [isInternetBack, setIsInternetBack] = useState(true)
  const [darkModeTheme, setDarkModeTheme] = useState(false)
  const [reviewVersionIos, setReviewVersionIos] = useState("")

  const getReward = async () => {
    let reviewVersionIos = await ReviewVersionIos()
    setReviewVersionIos(reviewVersionIos || 0)
    UpdateBuildVersion(setUpdateAlert)
    let remo = await rewardConfig()
    remo == undefined ? setReward(rewardCoinsDefaultValue) :
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
    getDarkModeUI()
    getReward()
    Platform.OS === "ios" && PushNotificationIOS.removeAllDeliveredNotifications();
    requestUserPermission()
    crashlytics().log(" getReward config file @@")
  }, [updateAlert])
  LogBox.ignoreAllLogs(true);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: darkModeTheme ? Colors.darkModeColor : Colors.white
    },
  };

  return (
    <>
      <CommonContext
        reviewVersionIos={reviewVersionIos}
        setReviewVersionIos={setReviewVersionIos}
        reward={reward}
        isInternetBack={isInternetBack}
        setIsInternetBack={setIsInternetBack}
        setReward={setReward}
        darkModeTheme={darkModeTheme}
        setDarkModeTheme={setDarkModeTheme} >
        <AppLoader />
        <NoInternetConnect
          darkModeTheme={darkModeTheme}
          isInternetBack={isInternetBack}
          setIsInternetBack={setIsInternetBack} />
        <NavigationContainer theme={MyTheme}  >
          {updateAlert ?
            <InviteFriend notifyUpdate={updateAlert} /> :
            <>
              <RootNavigation />
              <FlashMessage position="top" />
            </>}
        </NavigationContainer>
      </CommonContext>
    </>
  );
}


