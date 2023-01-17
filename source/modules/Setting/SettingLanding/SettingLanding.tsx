import { View, Text, TouchableOpacity, SafeAreaView, Image, ScrollView, ActivityIndicator, Platform, Linking, } from 'react-native'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import * as LocalStorage from '../../../services/LocalStorage';
import ToggleSwitch from 'toggle-switch-react-native'
import { LocalStorageKeys, ROUTES, String } from '../../../constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { colorBackGround, Colors, darkBackGround, F40014, F50012, F60012, F60016, lightBackGround } from '../../../Theme';
import { ButtonComponent, Header } from '../../../components';
import { NextIcon } from '../../../assets/icons';
import { userDeatil } from '../../../services/FireStoreServices';
import remoteConfig from '@react-native-firebase/remote-config';
import { style } from './style';
import { InputContextProvide } from '../../../context/CommonContext';
import { type } from '../../../constants/types';
import { getSocialLoginValue, settingProfileArr } from '../../../constants/settingProfileArr';
import { person } from '../../View/increment';

export const SettingLanding = () => {
  const { storeCreator: { darkModeTheme, setDarkModeTheme, dispatch } }: any = useContext(InputContextProvide)
  const route = useRoute()
  const { params }: any = route

  const [loading, setLoading] = useState(false)
  const navigation: any = useNavigation()
  const [data, setData] = useState<any>(params?.length > 0 ? params?.data : {})

  const configUrl = () => {
    const getConfigValue: any = remoteConfig().getValue("share_link").asString()

    const details = JSON?.parse(getConfigValue)

    person.getConfigValueFnc(details)
  }


  const getUserData = async () => {
    setLoading(true)
    let userInfo = await userDeatil()
    setData(userInfo)
    setLoading(false)
  }
  useEffect(() => {
    getSocialLoginValue()
    getUserData()
    configUrl()
  }, [])

  const logoutHandle = async () => {
    await LocalStorage.setValue(LocalStorageKeys.UserId, "")
    auth().signOut().then(() => { })
    navigation.reset({
      index: 0,
      routes: [{ name: ROUTES?.LOGIN }]
    })
  }

  const handleDarkMode = () => {
    setDarkModeTheme(!darkModeTheme)
    LocalStorage.setValue(LocalStorageKeys.DarkMode, { isDarkMode: !darkModeTheme })
  }

  const settingProfile = useMemo(() => {
    return (
      settingProfileArr?.map((item: any, index: number) => {
        return (
          <>
            {
              item?.isHeaderUi ?
                <View key={index?.toString()} style={[style.pinkTabWrapper, darkModeTheme && lightBackGround(darkModeTheme)]}>
                  {<item.icon key={index?.toString()} />}
                  <Text key={index?.toString()} style={[F60012.textStyle, F60012.colorAccount, style.paddingLeft, colorBackGround(darkModeTheme)]}>
                    {item?.name}
                  </Text>
                </View> :
                <>
                  {
                    !item?.isShowChangePass() &&
                    <TouchableOpacity
                      key={index.toString()}
                      onPress={() => {
                        (index == 6 || index == 4) ? actionLinking(index)
                          : navigation.navigate(item?.action, {
                            userProfile: data
                          })
                      }}
                      activeOpacity={1} style={style.tabWrapper}>
                      <Text key={index?.toString()} style={[F40014?.main, colorBackGround(darkModeTheme)]}>{item?.name}</Text>
                      {!item?.isUiRender ? (<NextIcon key={index?.toString()} color={darkModeTheme ? Colors?.white : Colors?.black} />) : <ToggleSwitch
                        key={index?.toString()}
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
    index == 4 ? (Platform?.OS == 'android' ? Linking.openURL(android) : Linking.openURL(ios)) : (Linking.openURL('https://view4view-dcb01.web.app/'))
  };


  return (
    <>
      <SafeAreaView style={style.safeArea} />
      <View style={[style.mainWrapper, darkBackGround(darkModeTheme)]}>
        <Header title={String?.headerTitle?.setting} showCoin={false} />
        <ScrollView style={[style.scrollWrapper, darkBackGround(darkModeTheme)]} showsVerticalScrollIndicator={false}
          scrollEnabled={true} contentContainerStyle={[style.containWrapper, darkBackGround(darkModeTheme)]}>
          <View style={[{ flex: 1 }, darkBackGround(darkModeTheme)]}>
            {
              loading ? <ActivityIndicator size={"large"} color={Colors.lightPink} /> :
                <TouchableOpacity style={style.nameWrapper} activeOpacity={1} onPress={() => {
                  navigation?.navigate(ROUTES?.EDITPROFILE, {
                    userProfile: data
                  })
                }}>
                  <Image source={{ uri: `data:image/png;base64,${data?.image}` }} style={style.imageWrapper} />
                  <Text numberOfLines={1} style={[F60016.textStyle, F60016.semiBolt, colorBackGround(darkModeTheme)]}>
                    {data?.firstname + " " + data?.lastname}
                  </Text>
                  <Text numberOfLines={1} style={[F50012.main, F50012.opacity, colorBackGround(darkModeTheme)]}>
                    {data?.email}
                  </Text>
                </TouchableOpacity>
            }
            {settingProfile}
            <ButtonComponent
              disable={data && Object.keys(data)?.length < 0}
              onPrees={() => {
                logoutHandle();
                dispatch({ type: type.EMPTY_STATE })
              }}
              wrapperStyle={style.marginTop}
              buttonTitle={String?.settingScreen?.logout}
            />
          </View>

        </ScrollView>
      </View >
    </>

  )
}

