import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import remoteConfig from '@react-native-firebase/remote-config';
import VersionInfo from 'react-native-version-info';
import { Header } from '../../components';
import { LocalStorageKeys, ROUTES, String } from '../../constants';
import { style } from './style';
import * as LocalStorage from '../../services/LocalStorage';
import { AuthContext } from '../../context/AuthContext';

export const EarnCoinLanding = ({ navigation }) => {
  const [key, setKey] = useState('');
  const getVersionNo = VersionInfo.appVersion;
  const { signOut }: any = useContext(AuthContext);
  const handleConfigData = async () => {
    await remoteConfig().setDefaults({});
    const getConfigValue: any = remoteConfig().getValue(
      String?.earnCoinTab?.versionNumber,
    );

    getConfigValue.asString() === getVersionNo
      ? setKey(String?.earnCoinTab?.alreadyUpdated)
      : setKey(String?.earnCoinTab?.pleaseUpdateYourApp);
  };
  useEffect(() => { }, [signOut]);

  return (
    <View style={style.main}>
      <Header title={String?.headerTitle?.earnCoin} />

      <TouchableOpacity
        onPress={async () => {
          await LocalStorage.setValue("userLoginId", "")
          navigation.navigate(ROUTES.LOGIN)
          // signOut('');
        }}>
        <Text style={style.text}> Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
