import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import * as LocalStorage from '../../../services/LocalStorage';
import { LocalStorageKeys, ROUTES } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { Colors } from '../../../Theme';

export const SettingLanding = () => {
  const navigation = useNavigation()
  return (
    <View>
      <TouchableOpacity
        onPress={async () => {
          await LocalStorage.setValue(LocalStorageKeys.UserId, "")
          auth().signOut().then(() => console.log('User signed out!'))
          navigation.navigate(ROUTES.LOGIN)
        }}>
        <Text style={style.text}> Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  text: { margin: 10, fontSize: 30, color: Colors?.green, textAlign: 'center' },

})