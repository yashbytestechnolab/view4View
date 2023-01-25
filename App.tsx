import React, { useEffect, useState } from 'react';
import { RootNavigation } from './source/navigation/RootNavigation';
import CommonContext from './source/context/CommonContext';
import FlashMessage from 'react-native-flash-message';
import AppLoader from './source/components/AppLoader';
import { UpdateBuildVersion } from './source/services/UpdateBuildVersion';
import { InviteFriend } from './source/modules/EarnCoin';
import { NavigationContainer } from '@react-navigation/native';
import { AppRating } from './source/services/AppRating';



export default function App() {
  const [updateAlert, setUpdateAlert] = useState(false)
  useEffect(() => {
    UpdateBuildVersion(setUpdateAlert)
    AppRating(updateAlert)
  }, [updateAlert])
  
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


