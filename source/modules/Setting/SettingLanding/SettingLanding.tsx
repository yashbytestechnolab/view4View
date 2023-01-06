import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import * as LocalStorage from '../../../services/LocalStorage';
import { LocalStorageKeys, ROUTES, String } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { Colors } from '../../../Theme';
import { Header } from '../../../components';

export const SettingLanding = () => {
  const navigation = useNavigation()
  return (
    <>
    <SafeAreaView style={style.safeArea}/>
      <Header  title={String?.headerTitle?.setting} showCoin={false}/>
      <TouchableOpacity
        onPress={async () => {
          await LocalStorage.setValue(LocalStorageKeys.UserId, "")
          auth().signOut().then(() => console.log('User signed out!'))
          navigation.navigate(ROUTES.LOGIN)
        }}>
        <Text style={style.text}> Logout</Text>
      </TouchableOpacity>
    </>

  )
}

const style = StyleSheet.create({
  text: { margin: 10, fontSize: 30, color: Colors?.green, textAlign: 'center' },
  safeArea: {
    backgroundColor: Colors.gradient1
},

})