import React, { useEffect, useState } from 'react';
import { RootNavigation } from './source/navigation/RootNavigation';
import CommonContext from './source/context/CommonContext';
import { UpdateBuildVersion } from './source/services/UpdateBuildVersion';
import { NavigationContainer } from '@react-navigation/native';
import { ReviewVersionIos } from './source/services';
import { NoInternetConnect } from './source/services/NoInternetConnect';

interface reward {
  adsRewarAmt: number | string,
  referRewardAmt: number | string
}
export default function App() {
  const [updateAlert, setUpdateAlert] = useState(false)
  const [isInternetBack, setIsInternetBack] = useState(true)
  const [reviewVersionIos, setReviewVersionIos] = useState("")

  const getReward = async () => {
    let reviewVersionIos = await ReviewVersionIos()
    setReviewVersionIos(reviewVersionIos || 0)
    UpdateBuildVersion(setUpdateAlert)
   
  }
 


  useEffect(() => {   
    getReward()
  }, [updateAlert])


  return (
    <>
      <CommonContext
        reviewVersionIos={reviewVersionIos}
        setReviewVersionIos={setReviewVersionIos}
        isInternetBack={isInternetBack}
        setIsInternetBack={setIsInternetBack}
         >
        <NoInternetConnect
          isInternetBack={isInternetBack}
          setIsInternetBack={setIsInternetBack} />
        <NavigationContainer   >
        <RootNavigation />
        </NavigationContainer>
      </CommonContext>
    </>
  );
}


