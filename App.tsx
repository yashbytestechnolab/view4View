import React, { useEffect, useState } from 'react';
import { RootNavigation } from './source/navigation/RootNavigation';
import CommonContext from './source/context/CommonContext';
import FlashMessage from 'react-native-flash-message';
import AppLoader from './source/components/AppLoader';
import { UpdateBuildVersion } from './source/services/UpdateBuildVersion';
import { InviteFriend } from './source/modules/EarnCoin';
import { NavigationContainer } from '@react-navigation/native';
import { rewardConfig } from './source/services';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { person } from './source/modules/View/increment';
import { LogBox, Platform } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import { useNetInfo } from '@react-native-community/netinfo';
import { NoInternetConnect } from './source/services/NoInternetConnect';

interface reward {
  adsRewarAmt: number | string,
  referRewardAmt: number | string
}
export default function App() {
  const [updateAlert, setUpdateAlert] = useState(false)
  const [reward, setReward] = useState<reward>({ adsRewarAmt: 0, referRewardAmt: 0 })
  const internetCheck = useNetInfo();

  const getReward = async () => {
    UpdateBuildVersion(setUpdateAlert)

    LogBox.ignoreAllLogs(); //Ignore all log notifications

    let remo = await rewardConfig()
    setReward(remo)
  }


  const requestUserPermission = async () => {
    UpdateBuildVersion(setUpdateAlert)

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

  useEffect(() => {
    getReward()

    Platform.OS === "ios" && PushNotificationIOS.removeAllDeliveredNotifications();
    requestUserPermission()
    crashlytics().log("config file")
  }, [updateAlert])

  return (
    <>
      <CommonContext reward={reward} setReward={setReward}>
        <AppLoader />
        <>
          {
            internetCheck?.isConnected ? <NavigationContainer>
              {updateAlert ?
                <InviteFriend notifyUpdate={updateAlert} /> :
                <>
                  <RootNavigation />
                  <FlashMessage position="top" />
                </>
              }

            </NavigationContainer> : <NoInternetConnect />

          }


        </>
      </CommonContext>

    </>
  );
}


