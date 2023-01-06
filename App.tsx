import React from 'react';
import { RootNavigation } from './source/navigation/RootNavigation';
import CommonContext from './source/context/CommonContext';
import FlashMessage from 'react-native-flash-message';
import { ActivityIndicator, Modal, SafeAreaView, StyleSheet, View } from 'react-native';
import AppLoader from './source/components/AppLoader';


export default function App() {
  return (
    <>
      <CommonContext>
        <AppLoader />
        <RootNavigation />
        <FlashMessage position="top" />
      </CommonContext>
    </>
  );
}


