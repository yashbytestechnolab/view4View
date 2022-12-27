import React from 'react';
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
