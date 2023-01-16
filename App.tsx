import React, { useEffect, useState } from 'react';
import { RootNavigation } from './source/navigation/RootNavigation';
import CommonContext from './source/context/CommonContext';
import FlashMessage from 'react-native-flash-message';
import AppLoader from './source/components/AppLoader';
import { UpdateBuildVersion } from './source/services/UpdateBuildVersion';
import { InviteFriend } from './source/modules/EarnCoin';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import { Colors } from './source/Theme';
import { RewardedAd, TestIds } from 'react-native-google-mobile-ads';


export default function App() {
  const [updateAlert, setUpdateAlert] = useState(false)
  useEffect(() => {
    UpdateBuildVersion(setUpdateAlert)
  }, [updateAlert])

  useEffect(()=>{
    showRewardAd()
  },[])
  
  const showRewardAd = () => {
    // Create a new instance
    const rewardAd = RewardedAd.createForAdRequest('ca-app-pub-4027493771242043/4402338926');
  
    // Add event handlers
    // rewardAd.onAdEvent((type, error) => {
    //     if (type === RewardedAdEventType.LOADED) {
    //         rewardAd.show();
    //     }
  
    //     if (type === RewardedAdEventType.EARNED_REWARD) {
    //         console.log('User earned reward of 5 lives');
    //         Alert.alert(
    //             'Reward Ad',
    //             'You just earned a reward of 5 lives',
    //             [
    //               {text: 'OK', onPress: () => console.log('OK Pressed')},
    //             ],
    //             { cancelable: true }
    //           )
    //     }
    // });
  
    // Load a new advert
    rewardAd.load();
  }

  
  return (
    <>
      <CommonContext>
        <AppLoader />
        <>
          <NavigationContainer>
            {updateAlert ?
              <InviteFriend notifyUpdate={updateAlert} /> :
              <>
                <RootNavigation />
                <FlashMessage position="top" />
              </>
            }

          </NavigationContainer>
        </>
      </CommonContext>
  
    </>
  );
}


