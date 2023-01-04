import { View, Text } from 'react-native'
import React from 'react'

export const SettingLanding =()=> {
  return (
    <View>
      <Text>SettingLanding</Text>
    </View>
  )
}
 {/* <TouchableOpacity
        onPress={async () => {
          await LocalStorage.setValue(LocalStorageKeys.UserId, "")
          auth().signOut().then(() => console.log('User signed out!'))
          navigation.navigate(ROUTES.LOGIN)
        }}>
        <Text style={style.text}> Logout</Text>
      </TouchableOpacity> */}