import React, { useContext, useEffect } from 'react'
import { View, Text, SafeAreaView, StatusBar, Platform, BackHandler } from 'react-native'
import { Apple, Google, } from '../../../assets/icons'
import { colorBackGround, Colors, darkBackGround, F40014, F60024 } from '../../../Theme'
import { ROUTES, String } from '../../../constants'
import { InputContextProvide } from '../../../context/CommonContext'
import { type } from '../../../constants/types'
import { useNavigation } from '@react-navigation/native'
import { BackButton, ButtonComponent, GradientHeader, InputComponent, SocialMediaButton } from '../../../components'
import { style } from './style'
import { firebase } from '@react-native-firebase/auth'
import { ORtitle } from '../Authcomponents'
import { appleLoginIos, googleLogin, handleFirebaseError } from '../../../services'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { emailPattern } from '../../../regex/Regex'
import { Anaylitics } from '../../../constants/analytics'

export const ForgotPassword = () => {
  /**
  * Context to give userinput data and error message
  */
  const { storeCreator: { darkModeTheme, userInput, dispatch, setLoading } }: any = useContext(InputContextProvide)
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
      handleFirebaseError("WrongEmail")
    } else {
      return await firebase.auth().sendPasswordResetEmail(userInput?.email).then((response) => {
        clearState()
        handleFirebaseError("ForgotSucess")
        Anaylitics("forgot_password_click", { email: userInput?.email })
      }).catch((forgotError) => {
        Anaylitics("forgot_password_error", { email: userInput?.email,error:forgotError?.code })
        handleFirebaseError(forgotError.code)
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
        keyboardShouldPersistTaps={String.commonString.handled}
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
                  {String.commonString?.ForgotPassword}
                </Text>
              </View>
              <InputComponent
                inputTitle={String.commonString.email}
                viewStyle={style.marginTop}
                value={userInput?.email}
                keyboardType={String?.keyboardType?.email}
                onChangeText={(value) => { dispatch({ type: type.EMAIL, payload: value }) }}
                placeholder={String.commonString.Enteryouremail}
              />
              <View style={style.signIn}>
                <ButtonComponent wrapperStyle={style.wrapperStyle}
                  disable={(userInput?.email?.length > 0) ? false : true}
                  onPrees={() => { handlePasswordReset() }} buttonTitle={String.commonString?.submit} />
              </View>
              <View style={style.backToLoginTextWrapper}>
                <Text style={[F40014.main, colorBackGround(darkModeTheme)]}>{String.commonString?.backTo}</Text>
                <Text onPress={() => { navigation.navigate(ROUTES?.LOGIN); clearState() }} style={[F40014.main, F40014?.color]}>{String.commonString?.SignIn}</Text>
              </View>
              <ORtitle />
              {
                Platform?.OS == 'android' ?
                  (<SocialMediaButton
                    wrapperStyle={style.googleWrapper}
                    socialMediaIcon={<Google />}
                    buttonTitle={String.commonString.signInWithGoogle}
                    colorBackGround={colorBackGround(darkModeTheme)}
                    onPress={() => { clearState(), googleLogin(navigation, setLoading) }}
                  />) :
                  (<View style={style.socialMedia}>
                    <SocialMediaButton
                      colorBackGround={colorBackGround(darkModeTheme)}
                      socialMediaIcon={<Google />}
                      buttonTitle={String.commonString.Google}
                      onPress={() => { clearState(), googleLogin(navigation, setLoading) }}
                    />
                    <SocialMediaButton
                      colorBackGround={colorBackGround(darkModeTheme)}
                      socialMediaIcon={<Apple gery={darkModeTheme} />}
                      buttonTitle={String.commonString.Apple}
                      onPress={() => { clearState(), appleLoginIos(navigation, setLoading) }}
                    />
                  </View>)
              }
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  )
}

