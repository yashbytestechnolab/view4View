import { View, Text, TouchableOpacity, SafeAreaView, Image, ScrollView, Platform, Linking, } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import * as LocalStorage from '../../../services/LocalStorage';
import ToggleSwitch from 'toggle-switch-react-native'
import { LocalStorageKeys, ROUTES, String } from '../../../constants';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { colorBackGround, Colors, darkBackGround, F40014, F50012, F60012, F60016, lightBackGround } from '../../../Theme';
import { ButtonComponent, Header } from '../../../components';
import { More, NextIcon, Profile } from '../../../assets/icons';
import { get_coins } from '../../../services/FireStoreServices';
import remoteConfig from '@react-native-firebase/remote-config';
import { style } from './style';
import { InputContextProvide } from '../../../context/CommonContext';
import { type } from '../../../constants/types';

export const SettingLanding = () => {
  const { storeCreator: { darkModeTheme, setDarkModeTheme, dispatch} }: any = useContext(InputContextProvide)

  const navigation: any = useNavigation()
  const [data, setData] = useState<any>({})
  const [isToggle, setIsToggle] = useState(false)
  const focus = useIsFocused()
  const getConfigValue: any = remoteConfig().getValue("UpdateDescription").asString()
  const details = JSON?.parse(getConfigValue)

  const getUserData = () => {
    get_coins()?.then((res: any) => {
      setData(res?._data)
    })
      .catch((err) => { console.log(err) })
  }
  useEffect(() => {
    getUserData()
  }, [focus])

  const logoutHandle = async () => {
    await LocalStorage.setValue(LocalStorageKeys.UserId, "")
    auth().signOut().then(() => { })
    navigation.navigate(ROUTES?.LOGIN)
  }

  const manageTab = (name: string, route?: string) => {

    return (
      <TouchableOpacity onPress={() => {
        route == "privacy" && Linking.openURL('https://view4view-dcb01.web.app/');
        route == "rateUs" ? Platform?.OS == 'android' ?
          Linking.openURL(details?.Upadte?.android) : Linking.openURL(details?.Upadte?.ios)
          :
          navigation.navigate(route)
        ROUTES.EDITPROFILE == "EDITPROFILE" ?
          navigation.navigate(route, {
            userProfile: data
          }) : navigation.navigate(route)
      }} activeOpacity={1} style={style.tabWrapper}>
        <Text style={[F40014?.main, colorBackGround(darkModeTheme)]}>{name}</Text>
        <NextIcon color={darkModeTheme ? Colors?.white : Colors?.black} />
      </TouchableOpacity>
    )
  }

  const handleDarkMode = () => {
    setDarkModeTheme(!darkModeTheme)
    LocalStorage.setValue(LocalStorageKeys.DarkMode, { isDarkMode: true })
    setIsToggle(!isToggle)
  }

  return (
    <>
      <SafeAreaView style={style.safeArea} />
      <View style={[style.mainWrapper, darkBackGround(darkModeTheme)]}>
        <Header title={String?.headerTitle?.setting} showCoin={false} />
        <ScrollView style={[style.scrollWrapper, darkBackGround(darkModeTheme)]} showsVerticalScrollIndicator={false}
          scrollEnabled={true} contentContainerStyle={[style.containWrapper, darkBackGround(darkModeTheme)]}>
          <View style={[{ flex: 1 }, darkBackGround(darkModeTheme)]}>
            <TouchableOpacity style={style.nameWrapper} activeOpacity={1} onPress={() => { navigation?.navigate(ROUTES?.EDITPROFILE) }}>

              <Image source={{ uri: data?.image }} style={style.imageWrapper}
              />
              <Text numberOfLines={1} style={[F60016.textStyle, F60016.semiBolt, colorBackGround(darkModeTheme)]}>
                {data?.firstname + " " + data?.lastname}
              </Text>
              <Text numberOfLines={1} style={[F50012.main, F50012.opacity, colorBackGround(darkModeTheme)]}>
                {data?.email}
              </Text>
            </TouchableOpacity>
            <View style={[style.pinkTabWrapper, darkModeTheme && lightBackGround(darkModeTheme)]}>
              <Profile />
              <Text style={[F60012.textStyle, F60012.colorAccount, style.paddingLeft, colorBackGround(darkModeTheme)]}>
                {String?.settingScreen?.AccountInformation}
              </Text>
            </View>
            {manageTab(String?.settingScreen?.EditProfile, ROUTES?.EDITPROFILE)}
            {manageTab(String?.settingScreen?.ChangePassword, ROUTES?.CHANGEPASSWORD)}
            <View style={[style.pinkTabWrapper, darkModeTheme && lightBackGround(darkModeTheme)]}>
              <More />
              <Text style={[F60012.textStyle, F60012.colorAccount, style.paddingLeft, colorBackGround(darkModeTheme)]}>
                {String?.settingScreen?.More}
              </Text>
            </View>
            {manageTab(String?.settingScreen?.RateUs, "rateUs")}
            {manageTab(String?.settingScreen?.InviteFriends, ROUTES?.INVITEFRIEND)}
            {manageTab(String?.settingScreen?.PrivacyPolicy, "privacy")}
            <View style={[style.tabWrapper]}>
              <Text style={[F40014?.main, colorBackGround(darkModeTheme)]}>{String?.settingScreen?.DarkMode}</Text>
              <ToggleSwitch
                isOn={darkModeTheme}
                onColor={Colors?.green}
                offColor={Colors?.toggleBG}
                size="small"
                onToggle={() => { handleDarkMode() }}
              />
            </View>

            <ButtonComponent
              disable={Object.keys(data).length < 0}
              onPrees={() => {
                logoutHandle();
                dispatch({ type: type.EMPTY_STATE })
              }}
              wrapperStyle={style.marginTop}
              buttonTitle={String?.settingScreen?.logout}
            />
          </View>
        </ScrollView>
      </View>
    </>

  )
}
