import React from 'react';
import { RootNavigation } from './source/navigation/RootNavigation';
import CommonContext from './source/context/CommonContext';
import FlashMessage from 'react-native-flash-message';

export default function App() {
  return (
    <>
      <CommonContext>
        <RootNavigation />
        <FlashMessage position="top" />
      </CommonContext>
    </>
  );
}
