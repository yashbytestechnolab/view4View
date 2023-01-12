import { View, Text, TouchableOpacity, SafeAreaView, Image, ScrollView, } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as LocalStorage from '../../../services/LocalStorage';
import ToggleSwitch from 'toggle-switch-react-native'
import { LocalStorageKeys, ROUTES, String } from '../../../constants';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { Colors, F40014, F50012, F60012, F60016 } from '../../../Theme';
import { ButtonComponent, Header, Loader } from '../../../components';
import { More, NextIcon, Profile } from '../../../assets/icons';
import { get_coins } from '../../../services/FireStoreServices';
import { style } from './style';

export const SettingLanding = () => {
  const navigation = useNavigation()
  const [data, setData] = useState<string>()
  const [isToggle, setIsToggle] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const focus = useIsFocused()
  const getUserData = () => {

    setIsLoading(true)
    get_coins()?.then((res: any) => { setIsLoading(false), console.log("logoutHandlelogoutHandle", res), setData(res?._data) }).catch((err) => { setIsLoading(false), console.log(err) })
  }
  useEffect(() => {
    getUserData()
  }, [focus])

  const logoutHandle = async () => {
    await LocalStorage.setValue(LocalStorageKeys.UserId, "")
    auth().signOut().then(() => { })
    navigation.navigate(ROUTES?.LOGIN)
  }
  const manageTab = (name: string, route: string) => {
    return (
      <TouchableOpacity onPress={() => { navigation.navigate(route) }} activeOpacity={1} style={style.tabWrapper}>
        <Text style={F40014?.main}>{name}</Text>
        <NextIcon color={Colors?.black} />
      </TouchableOpacity>
    )
  }
  console.log("data", data)
  console.log("data", data?.length)
  return (
    <>
      <SafeAreaView style={style.safeArea} />
      {isLoading ? <Loader /> : <>
        <View style={style.mainWrapper}>
          <Header title={String?.headerTitle?.setting} showCoin={false} />
          <ScrollView style={style.scrollWrapper} showsVerticalScrollIndicator={false}
            scrollEnabled={true} contentContainerStyle={style.containWrapper}>
            <View style={style.nameWrapper}>

              <Image source={{ uri: data?.image }} style={style.imageWrapper}
              />
              <Text numberOfLines={1} style={[F60016.textStyle, F60016.semiBolt]}>
                {data?.firstname + " " + data?.lastname}
              </Text>
              <Text numberOfLines={1} style={[F50012.main, F50012.opacity]}>
                {data?.email}
              </Text>
            </View>
            <View style={style.pinkTabWrapper}>
              <Profile />
              <Text style={[F60012.textStyle, F60012.colorAccount, style.paddingLeft]}>
                {String?.settingScreen?.AccountInformation}
              </Text>
            </View>
            {manageTab(String?.settingScreen?.EditProfile, ROUTES?.EDITPROFILE)}
            {manageTab(String?.settingScreen?.ChangePassword, ROUTES?.INVITEFRIEND)}
            <View style={style.pinkTabWrapper}>
              <More />
              <Text style={[F60012.textStyle, F60012.colorAccount, style.paddingLeft]}>
                {String?.settingScreen?.More}
              </Text>
            </View>
            {manageTab(String?.settingScreen?.RateUs, ROUTES?.INVITEFRIEND)}
            {manageTab(String?.settingScreen?.InviteFriends, ROUTES?.INVITEFRIEND)}
            {manageTab(String?.settingScreen?.PrivacyPolicy, ROUTES?.INVITEFRIEND)}
            <View style={[style.tabWrapper]}>
              <Text style={F40014?.main}>{String?.settingScreen?.DarkMode}</Text>
              <ToggleSwitch
                isOn={isToggle}
                onColor={Colors?.green}
                offColor={Colors?.toggleBG}
                size="small"
                onToggle={() => { setIsToggle(!isToggle) }}
              />
            </View>

            <ButtonComponent
              onPrees={() => {
                logoutHandle()
              }}
              wrapperStyle={style.marginTop}
              buttonTitle={String?.settingScreen?.logout}
            />
          </ScrollView>

        </View></>}


    </>

  )
}


