import React, { useEffect, useState } from 'react';
import { RootNavigation } from './source/navigation/RootNavigation';
import CommonContext from './source/context/CommonContext';
import FlashMessage from 'react-native-flash-message';
import AppLoader from './source/components/AppLoader';
import { UpdateBuildVersion } from './source/services/UpdateBuildVersion';
import { InviteFriend } from './source/modules/EarnCoin';
import { NavigationContainer } from '@react-navigation/native';
import { rewardConfig } from './source/services';

interface reward {
  adsRewarAmt: number | string,
  referRewardAmt: number | string
}
export default function App() {
  const [updateAlert, setUpdateAlert] = useState(false)
  const [reward, setReward] = useState<reward>({ adsRewarAmt: 0, referRewardAmt: 0 })

  const getReward = async () => {
    let remo = await rewardConfig()
    setReward(remo)
  }

  useEffect(() => {
    getReward()
    UpdateBuildVersion(setUpdateAlert)
  }, [updateAlert])

  return (
    <>
      <CommonContext reward={reward} setReward={setReward}>
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


