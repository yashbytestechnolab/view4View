import { View, StyleSheet } from 'react-native'
import React from 'react'
import { LocalStorageKeys, ROUTES } from '../../../constants';
import * as LocalStorage from '../../../services/LocalStorage';
import { useNavigation } from '@react-navigation/native';
import { ButtonComponent } from '../../../components';


export const SettingLanding = () => {
  const navigation: any = useNavigation()
  const logoutHandle = async () => {

    await navigation.reset({
      index: 0,
      routes: [{ name: ROUTES.LOGIN }]
    })
    await LocalStorage.setValue(LocalStorageKeys.UserId, "")

  }
  return (
    <View style={style.main}>
      <ButtonComponent
        onPrees={() => {
          logoutHandle();

        }}
        wrapperStyle={{ width: '90%' }}
        buttonTitle={'logout'}
      />
    </View>

  );
};

const style = StyleSheet.create({
  main: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }
})

