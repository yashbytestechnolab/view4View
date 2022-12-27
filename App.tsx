import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import {  RootNavigation  } from './source/navigation/RootNavigation';
import CommonContext from './source/context/CommonContext';

export default function App() {
  return (
    <>
      <CommonContext>
        <RootNavigation />
      </CommonContext>
    </>
  );
}
