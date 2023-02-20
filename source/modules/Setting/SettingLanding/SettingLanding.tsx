import { View, Text, TouchableOpacity, SafeAreaView, Image, ScrollView, ActivityIndicator, Platform, Linking, Alert, } from 'react-native'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import * as LocalStorage from '../../../services/LocalStorage';
import ToggleSwitch from 'toggle-switch-react-native'
import { LocalStorageKeys, ROUTES, String } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { colorBackGround, Colors, darkBackGround, F40014, F50012, F50030, F60012, F60012Bold, F60016, lightBackGround } from '../../../Theme';
import { ButtonComponent, Header } from '../../../components';
import { NextIcon } from '../../../assets/icons';
import { deleteAccoutCampaign, firebaseAccountDelete, getCampaign, userDeatil } from '../../../services/FireStoreServices';
import remoteConfig from '@react-native-firebase/remote-config';
import { style } from './style';
import { InputContextProvide } from '../../../context/CommonContext';
import { type } from '../../../constants/types';
import { getSocialLoginValue, settingProfileArr } from '../../../constants/settingProfileArr';
import { ENV, person } from '../../View/increment';
import { Anaylitics } from '../../../constants/analytics';
import VersionInfo from 'react-native-version-info';

export const SettingLanding = () => {
  const { storeCreator: { loading, setLoading, darkModeTheme, setDarkModeTheme, dispatch, userDetail: { infoLoading, data }, dispatchuserDetail, dispatchVideoLandingData } }: any = useContext(InputContextProvide)
  const navigation: any = useNavigation()
  const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
  const { appVersion, buildVersion }: any = VersionInfo;

  const configUrl = () => {
    remoteConfig().fetchAndActivate().then(() => {
      const getConfigValue: any = remoteConfig().getValue("share_link").asString()
      const details = JSON?.parse(getConfigValue)
      person.getConfigValueFnc(details)
    })
  }

  const getUserData = async () => {
    dispatchuserDetail({ type: type.USER_INFO_LOADING, payload: true })
    userDeatil().then((userInfo: any) => {
      dispatchuserDetail({ type: type.USER_INFO_DATA, payload: userInfo })


    }).
      catch((error: any) => dispatchuserDetail({ type: type.USER_INFO_DATA, payload: error.message })).
      finally(() => dispatchuserDetail({ type: type.USER_INFO_LOADING, payload: false }))
  }

  useEffect(() => {
    getSocialLoginValue()
    getUserData()
    configUrl()
  }, [])


  const logoutHandle = async () => {
    Anaylitics("logout_click")
    await navigation.reset({
      index: 0,
      routes: [{ name: ROUTES.LOGIN }]
    })
    auth().signOut().then(() => { })
    await LocalStorage.setValue(LocalStorageKeys.UserId, "")
    dispatchVideoLandingData({ types: type.BYTESVIDEO_LOAD, payload: false })
    dispatchuserDetail({ type: type.USER_INFO_DELETE })
    Anaylitics("logout_sucess")
    setLoading(false)
  }

  const handleDarkMode = () => {
    setDarkModeTheme(!darkModeTheme)
    Anaylitics("dark_mode", { darkModeTheme })
    LocalStorage.setValue(LocalStorageKeys.DarkMode, { isDarkMode: !darkModeTheme })
  }

  const handleDeletAccount = async () => {
    setLoading(true)
    Anaylitics("delete_account_click")
    let deleteCampaign: any = await getCampaign()
    for (let i = 0; i < deleteCampaign?._docs?.length; i++) {
      Anaylitics("delete_account_campaign", { delete_campaign_id: deleteCampaign?._docs[i]?._data?.id })
      await deleteAccoutCampaign(deleteCampaign?._docs[i]?._data?.id)
    }
    await firebaseAccountDelete()
    await auth()?.currentUser?.delete()
    Anaylitics("delete_account_sucess")
    logoutHandle()
  }

  const onPessDeleteAccount = () =>
    Alert.alert('Delete Account', 'Are you sure you want to delete your account? if you delete your account all data and earn coin will be permanently deleted and cannot be retrieved.', [
      { text: 'Yes, Delete My Account', onPress: () => handleDeletAccount() },
      { text: 'Cancel', onPress: () => { }, },
    ]);


  const settingProfile = useMemo(() => {
    return (
      settingProfileArr?.map((item: any, index: number) => {
        return (
          <>
            {
              item?.isHeaderUi ?
                <View key={index?.toString()} style={[style.pinkTabWrapper, darkModeTheme && lightBackGround(darkModeTheme)]}>
                  {<item.icon key={index?.toString()} />}
                  <Text key={index?.toString()} style={[F60012Bold.textStyle, F60012.colorAccount, style.paddingLeft, colorBackGround(darkModeTheme)]}>
                    {item?.name}
                  </Text>
                </View>
                :
                <>
                  {
                    !item?.isShowChangePass() &&
                    <TouchableOpacity
                      key={index.toString()}
                      onPress={() => {
                        (index == 7 || index == 5) ? actionLinking(index) : index == 8 ? handleDarkMode()
                          : (index == 3) ? onPessDeleteAccount() : navigation.navigate(item?.action)
                      }}
                      activeOpacity={1} style={style.tabWrapper}>
                      <Text key={item?.name} style={[F40014?.main, { fontSize: 15 }, colorBackGround(darkModeTheme)]}>{item?.name}</Text>
                      {!item?.isUiRender ? (<NextIcon key={item?.name} color={darkModeTheme ? Colors?.white : Colors?.black} />) :
                        <ToggleSwitch
                          key={item?.id}
                          isOn={darkModeTheme}
                          onColor={Colors?.green}
                          offColor={Colors?.toggleBG}
                          size="small"
                          onToggle={() => { handleDarkMode() }}
                        />}
                    </TouchableOpacity>
                  }
                </>
            }
          </>
        )
      })
    )
  }, [darkModeTheme, data])

  const actionLinking = (index: number) => {
    const { android, ios }: any = person?.configvalue;
    console.log(index);
    index == 5 ? (Anaylitics("rate_us_click"), Platform?.OS == 'android' ? Linking.openURL(android || 
      'https://play.google.com/store/apps/details?id=com.bytes.uview')
     : Linking.openURL(ios || 'https://apps.apple.com/us/app/uview-increase-youtube-views/id1658265805')) : (Linking.openURL('https://view4view-dcb01.web.app/'))
  };
  https://play.google.com/store/apps/details?id=com.bytes.uview

  return (
    <>
      <SafeAreaView style={style.safeArea} />
      <View style={[style.mainWrapper, darkBackGround(darkModeTheme)]}>
        <Header title={String?.headerTitle?.setting} showCoin={false} />
        <ScrollView style={[style.scrollWrapper, darkBackGround(darkModeTheme)]} showsVerticalScrollIndicator={false}
          scrollEnabled={true} contentContainerStyle={[style.containWrapper, darkBackGround(darkModeTheme)]}>
          <View style={[style.flex, darkBackGround(darkModeTheme)]}>
            {
              infoLoading ? <ActivityIndicator size={"large"} color={Colors.lightPink} style={{ height: 115 }} /> :
                <TouchableOpacity style={[style.nameWrapper, { height: 115 }]} activeOpacity={1} onPress={() => {
                  navigation?.navigate(ROUTES?.EDITPROFILE)
                }}>
                  {
                    data?.image?.length == 0 ?
                      <View style={[style.profileNameWrapper,]}>
                        <Text style={[F50030?.textStyle, { textAlign: 'center', textTransform: 'uppercase' }]} >{data?.firstname?.charAt(0) + data?.lastname?.charAt(0)}</Text>
                      </View>
                      : <Image source={{ uri: regex.test(data?.image) == true ? data?.image : `data:image/png;base64,${data?.image}` }} style={[style.imageWrapper,]} />

                  }

                  <Text numberOfLines={1} style={[F60016.textStyle, F60016.semiBolt, { fontSize: 16 }, colorBackGround(darkModeTheme)]}>
                    {data?.firstname + " " + data?.lastname}
                  </Text>
                  <Text numberOfLines={1} style={[F50012.main, F50012.opacity, { fontSize: 15 }, colorBackGround(darkModeTheme)]}>
                    {data?.email}
                  </Text>
                </TouchableOpacity>
            }
            {settingProfile}
            <ButtonComponent
              onPrees={() => {
                logoutHandle();
                dispatch({ type: type.EMPTY_STATE })
              }}
              wrapperStyle={style.marginTop}
              buttonTitle={String?.settingScreen?.logout}
            />
          </View>
          <View style={{ flex: 1, marginHorizontal: 16, marginTop: 40, alignItems: "center" }}>
            <Text style={[{ fontSize: 12, color: Colors.gray }]}>
              {`Version: ${appVersion}(${buildVersion}) - ${person?.environment() == ENV?.dev ? 'Development' : 'Production'}`}
            </Text>
          </View>
        </ScrollView>
      </View >
    </>
  )
}

