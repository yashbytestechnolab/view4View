import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import React, { useContext } from 'react';
import { colorBackGround, Colors, darkBackGround, F40014, } from '../../../Theme';
import { useNavigation } from '@react-navigation/native';
import { LocalStorageKeys, ROUTES, String } from '../../../constants';
import { style } from './style';
import { InputComponent } from '../../../components/InputComponent';
import { InputContextProvide } from '../../../context/CommonContext';
import { type } from '../../../constants/types';
import { ButtonComponent } from '../../../components/ButtonComponent';
import { Google } from '../../../assets/icons/Google';
import { SocialMediaButton } from '../../../components/SocialMediaButton';
import { Apple } from '../../../assets/icons/Apple';
import { ORtitle, AuthHeader } from '../Authcomponents';
import { emailPattern } from '../../../regex/Regex';
import { appleLoginIos, googleLogin } from '../../../services/SocialMediaLoginServices';
import auth from '@react-native-firebase/auth';
import * as LocalStorage from '../../../services/LocalStorage';
import { handleFirebaseError } from '../../../services';
import { GradientHeader } from '../../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Platform } from 'react-native';
import { Anaylitics } from '../../../constants/analytics';
import { useTranslation } from 'react-i18next';

export const Login = () => {
  const { t } = useTranslation()
  /**
   * Context to give userinput data and error message
   */
  const { storeCreator: { darkModeTheme, userInput, dispatch, userInputError, dispatchError, setLoading, setIsCreateCampaginRemaining, setIsTooltipRemaining } }: any = useContext(InputContextProvide)

  const navigation = useNavigation();

  /**
   *  This Function dispatch error message
   * @param type  
   * @param payload 
   */

  function dispatchHandler(type: string, payload: string | number | any) {
    dispatchError({ type: type, payload: payload })
  }
  const handleUserLoginRequest = () => {
    let { email } = userInput
    let loginType = "normal";
    Anaylitics("login_click", { email, loginType })
    setLoading(true)
    auth().signInWithEmailAndPassword(userInput?.email, userInput?.password).
      then(async (userResponse: any) => {
        let userDetail = userResponse?.user?._user
        await LocalStorage.setValue(LocalStorageKeys.UserId, userDetail?.uid);
        await LocalStorage.setValue(LocalStorageKeys?.isSocialLogin, false);
        await LocalStorage.setValue(LocalStorageKeys?.IsFirstTimeLogin, true);
        navigation.reset({
          index: 0,
          routes: [{ name: ROUTES.TABLIST }],
        });
        Anaylitics("login_sucess", { email, loginType })
        dispatch({ type: type.EMPTY_STATE })
        setLoading(false)
      }).
      catch((userError) => { Anaylitics("login_error", { email, loginType, error: userError?.code }), handleFirebaseError(userError?.code,t) }).
      finally(() => setLoading(false))
  }


  /**
   *  Handle Login Flow to check login detail & validation
  */
  const handleLoginFlow = () => {
    try {
      let isFormValid: boolean = false
      if (userInput?.email?.length <= 0 || !emailPattern.test(userInput?.email)) {
        dispatchHandler(type.EMAIL_ERROR, t("PleaseProvideValidEmailMsg"))
        isFormValid = true
      }
      if (userInput?.password?.length <= 0 || userInput?.password?.length < 6) {
        isFormValid = true
        dispatchHandler(type.PASSWORD_ERROR, t("PasswordErrorMsg"))
      }
      !isFormValid && handleUserLoginRequest()
    } catch (fncError) {
    }
  }

  const clearStateValue = () => {
    dispatch({ type: type.EMPTY_STATE });
    dispatchError({ type: type.EMPTY_STATE })
  }


  return (
    <>
      <SafeAreaView style={style.safeArea} />
      <StatusBar barStyle={String.StatusBar.lightContent} backgroundColor={Colors.linear_gradient} />
      <View style={[style.main, darkBackGround(darkModeTheme)]}>
        <KeyboardAwareScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={"handled"}
          style={[style.scroll, darkBackGround(darkModeTheme)]}
          scrollEnabled={true}
          contentContainerStyle={[style.scrollContain, darkBackGround(darkModeTheme)]}>
          <GradientHeader />
          <View style={[style.wrapperView,]} >
            <View style={[style.borderRadius, { backgroundColor: Colors?.white, flex: 1 }, darkBackGround(darkModeTheme)]}>
              <View style={[style.innerContainer, darkBackGround(darkModeTheme)]} >
                <AuthHeader
                  mainTitle={t("WelcomeBack")}
                  miniTitle={t("Donthaveanaccount")}
                  actionTitle={t("SignUp")}
                  onPress={() => { navigation.navigate(ROUTES.CREATEACCOUNT); clearStateValue() }}
                />

                <InputComponent
                  inputTitle={t("email")}
                  placeholder={t("Enteryouremail")}
                  keyboardType={String?.keyboardType?.email}
                  value={userInput?.email}
                  onChangeText={(value) => {
                    dispatch({ type: type.EMAIL, payload: value });
                    if (value?.length > 0 && emailPattern.test(value)) {
                      dispatchError({ type: type.EMAIL_ERROR, payload: "" })
                    }
                  }}
                  errorMessage={userInputError?.emailError}
                  viewStyle={style.top33}
                />

                <InputComponent
                  inputTitle={t("Password")}
                  placeholder={t("Enteryourpassword")}
                  value={userInput?.password}
                  onChangeText={(value) => {
                    dispatch({ type: type.PASSWORD, payload: value });
                    if (value?.length > 5) {
                      dispatchError({ type: type.PASSWORD_ERROR, payload: "" })
                    }
                  }}
                  isSecureIcon={true}
                  isSecureEntry={userInput?.showPassword}
                  onPrees={() => dispatch({ type: type.SHOW_PASSWORD, payload: !userInput?.showPassword })}
                  errorMessage={userInputError?.passwordError}
                />

                <View style={style.forgotPassword}>
                  <Text
                    onPress={() => {
                      navigation?.navigate(ROUTES?.FORGOTPASSWORD);
                      dispatch({ type: type.EMPTY_STATE });
                      dispatchError({ type: type.EMPTY_STATE })
                    }}
                    style={[F40014.main, F40014.color]}>
                    {t("ForgotPassword")}
                  </Text>
                </View>

                <View style={style.signIn}>
                  <ButtonComponent
                    disable={(userInput?.email?.length > 0 && userInput?.password?.length > 0) ? false : true}
                    onPrees={() => handleLoginFlow()}
                    buttonTitle={t("SignIn")} />
                </View>
                <ORtitle />
                {
                  Platform?.OS == 'android' ?
                    (<SocialMediaButton
                      wrapperStyle={style.socialLogin}
                      socialMediaIcon={<Google />}
                      buttonTitle={t("signInWithGoogle")}
                      colorBackGround={colorBackGround(darkModeTheme)}
                      onPress={() => { clearStateValue(); googleLogin(navigation, setLoading, setIsCreateCampaginRemaining, setIsTooltipRemaining) }}
                    />) :
                    (<View style={style.socialMedia}>
                      <SocialMediaButton
                        colorBackGround={colorBackGround(darkModeTheme)}
                        socialMediaIcon={<Google />}
                        buttonTitle={t("Google")}
                        onPress={() => { clearStateValue(); googleLogin(navigation, setLoading, setIsCreateCampaginRemaining, setIsTooltipRemaining) }}
                      />
                      <SocialMediaButton
                        colorBackGround={colorBackGround(darkModeTheme)}
                        socialMediaIcon={<Apple gery={darkModeTheme} />}
                        buttonTitle={t("Apple")}
                        onPress={() => { clearStateValue(); appleLoginIos(navigation, setLoading, setIsCreateCampaginRemaining, setIsTooltipRemaining) }}
                      />
                    </View>)
                }
              </View>
            </View>
          </View>

        </KeyboardAwareScrollView>
      </View>
    </>
  );
};
