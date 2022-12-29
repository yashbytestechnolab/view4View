import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Header } from '../../components';
import { LocalStorageKeys, ROUTES, String } from '../../constants';
import { style } from './style';
import * as LocalStorage from '../../services/LocalStorage';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

export const EarnCoinLanding = () => {
  const navigation = useNavigation()
  // const [key, setKey] = useState('');
  // const getVersionNo = VersionInfo.appVersion;
  // const handleConfigData = async () => {
  //   await remoteConfig().setDefaults({});
  //   const getConfigValue: any = remoteConfig().getValue(
  //     String?.earnCoinTab?.versionNumber,
  //   );

  //   getConfigValue.asString() === getVersionNo
  //     ? setKey(String?.earnCoinTab?.alreadyUpdated)
  //     : setKey(String?.earnCoinTab?.pleaseUpdateYourApp);
  // };

  return (
    <View style={style.main}>
      <Header title={String?.headerTitle?.earnCoin} />

      <TouchableOpacity
        onPress={async () => {
          await LocalStorage.setValue(LocalStorageKeys.UserId, "")
          auth().signOut().then(() => console.log('User signed out!'))
          navigation.navigate(ROUTES.LOGIN)
        }}>
        <Text style={style.text}> Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
