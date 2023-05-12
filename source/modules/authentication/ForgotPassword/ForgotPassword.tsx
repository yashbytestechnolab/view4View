import React, { useContext, useEffect } from 'react'
import { View, Text, SafeAreaView, StatusBar, BackHandler } from 'react-native'
import { colorBackGround, Colors, darkBackGround, F40014, F60024 } from '../../../Theme'
import { ROUTES, String } from '../../../constants'
import { InputContextProvide } from '../../../context/CommonContext'
import { type } from '../../../constants/types'
import { useNavigation } from '@react-navigation/native'
import { BackButton, ButtonComponent, GradientHeader, InputComponent, } from '../../../components'
import { style } from './style'
import { firebase } from '@react-native-firebase/auth'
import { handleFirebaseError } from '../../../services'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { emailPattern } from '../../../regex/Regex'
import { Anaylitics } from '../../../constants/analytics'
import { useTranslation } from 'react-i18next'

export const ForgotPassword = () => {
  const { t } = useTranslation()
  /**
  * Context to give userinput data and error message
  */
  const { storeCreator: { darkModeTheme, userInput, dispatch } }: any = useContext(InputContextProvide)
  const navigation = useNavigation()

  /**
   * user reset password
   * @returns firebase share link in user gmail and user change password 
   */

  const clearState = () => {
    dispatch({ type: type.EMPTY_STATE });
  }

  const handlePasswordReset = async () => {
    if (userInput?.email?.length <= 0 || !emailPattern.test(userInput?.email)) {
      handleFirebaseError("WrongEmail",t)
    } else {
      return await firebase.auth().sendPasswordResetEmail(userInput?.email).then((response) => {
        clearState()
        handleFirebaseError("ForgotSucess",t)
        Anaylitics("forgot_password_click", { email: userInput?.email })
      }).catch((forgotError) => {
        Anaylitics("forgot_password_error", { email: userInput?.email, error: forgotError?.code })
        handleFirebaseError(forgotError.code,t)
      })
    }

  }
  const handleBackButtonClick = () => {
    navigation.goBack();
    clearState()
    return true;
  }
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);


  return (
    <>

      <SafeAreaView style={style.backGroundColor} />
      <StatusBar backgroundColor={Colors?.gradient1} barStyle={String?.StatusBar?.lightContent} />
      <KeyboardAwareScrollView
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"handled"}
        style={[style.scroll, darkBackGround(darkModeTheme)]}
        scrollEnabled={true}
        contentContainerStyle={[style.scrollContain, darkBackGround(darkModeTheme)]}>

        <BackButton onPrees={() => { handleBackButtonClick() }} />
        <GradientHeader />
        <View style={style.wrapperView} >
          <View style={[style.borderRadius, { backgroundColor: Colors?.white, flex: 1 }, darkBackGround(darkModeTheme)]}>
            <View style={[style.containerWrapper, darkBackGround(darkModeTheme)]} >
              <View style={[style.welcomeHeader]}>
                <Text style={[F60024.textStyle, colorBackGround(darkModeTheme)]}>
                  {t("ForgotPassword")}
                </Text>
              </View>
              <InputComponent
                inputTitle={t("email")}
                viewStyle={style.marginTop}
                value={userInput?.email}
                keyboardType={String?.keyboardType?.email}
                onChangeText={(value) => { dispatch({ type: type.EMAIL, payload: value }) }}
                placeholder={t("Enteryouremail")}
              />
              <View style={style.signIn}>
                <ButtonComponent wrapperStyle={style.wrapperStyle}
                  disable={(userInput?.email?.length > 0) ? false : true}
                  onPrees={() => { handlePasswordReset() }} buttonTitle={t("submit")} />
              </View>
              <View style={style.backToLoginTextWrapper}>
                <Text style={[F40014.main, colorBackGround(darkModeTheme)]}>{t("backTo")}</Text>
                <Text onPress={() => { navigation.navigate(ROUTES?.LOGIN); clearState() }} style={[F40014.main, F40014?.color]}>{t("SignIn")}</Text>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  )
}

