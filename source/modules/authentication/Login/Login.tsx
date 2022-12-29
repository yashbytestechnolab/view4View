import { View, ScrollView, Text, SafeAreaView, Alert } from 'react-native';
import React, { useContext } from 'react';
import { Colors, F40014, } from '../../../Theme';
import { useNavigation } from '@react-navigation/native';
import { LocalStorageKeys, ROUTES, String } from '../../../constants';
import { Logo } from '../../../assets/icons';
import { style } from './style';
import { InputComponent } from '../../../components/InputComponent';
import { InputContextProvide } from '../../../context/CommonContext';
import { type } from '../../../constants/types';
import { ButtonComponent } from '../../../components/ButtonComponent';
import { Google } from '../../../assets/icons/Google';
import { SocialMediaButton } from '../../../components/SocialMediaButton';
import { Apple } from '../../../assets/icons/Apple';
import Back from '../../../assets/icons/Back';
import { ORtitle, AuthHeader } from '../Authcomponents';
import { emailPattern } from '../../../regex/Regex';
import { googleLogin } from '../../../services/GoogleLoginServices';
import auth from '@react-native-firebase/auth';
import * as LocalStorage from '../../../services/LocalStorage';

export const Login = () => {
  /**
   * Context to give userinput data and error message
   */
  const { storeCreator: { userInput, dispatch, userInputError, dispatchError, loading, setLoading } }: any = useContext(InputContextProvide)

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
    setLoading(true)
    auth().signInWithEmailAndPassword(userInput?.email, userInput?.password).
      then(async (userResponse: any) => {
        let userDetail = userResponse?.user?._user
        await LocalStorage.setValue("userLoginId", userDetail?.uid);
        navigation.reset({
          index: 0,
          routes: [{ name: ROUTES.TABLIST }],
        });
        await LocalStorage.setValue(LocalStorageKeys?.isFirstTimeLogin, true);
      }).
      catch((userError) => console.log("error", userError)).
      finally(() => setLoading(false))
  }


  /**
   *  Handle Login Flow to check login detail & validation
  */
  const handleLoginFlow = () => {
    try {
      let isFormValid: boolean = false
      if (userInput?.email?.length <= 0 || !emailPattern.test(userInput?.email)) {
        dispatchHandler(type.EMAIL_ERROR, String.commonString.PleaseProvideValidEmailMsg)
        isFormValid = true
      }
      if (userInput?.password?.length <= 0 || userInput?.password?.length < 8) {
        isFormValid = true
        dispatchHandler(type.PASSWORD_ERROR, String.commonString.PasswordErrorMsg)
      }
      !isFormValid && handleUserLoginRequest()
    } catch (fncError) {
      console.log("FncError", fncError);
    }
  }

  return (
    <>
      <SafeAreaView style={style.safeArea} />
      <View style={style.main}>
        {/** Back Icon Header */}
        {/* <View style={style.headerBack}>
          <Back />
        </View> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={String.commonString.handled}
          style={style.scroll}
          scrollEnabled={true}
          contentContainerStyle={style.scrollContain}>

          <View style={style.mainLogo}>
            <Logo />
          </View>

          <View style={style.wrapperView} >
            <View style={[style.container, style.borderRadius]}>
              <View style={[style.borderRadius, { backgroundColor: Colors?.white, marginTop: 20, flex: 1 }]}>
                <View style={style.innerContainer} >
                  <AuthHeader
                    mainTitle={String.commonString.WelcomeBack}
                    miniTitle={String.commonString.Donthaveanaccount}
                    actionTitle={String.commonString.SignUp}
                    onPress={() => { navigation.navigate(ROUTES.CREATEACCOUNT); dispatch({ type: type.EMPTY_STATE }); dispatchError({ type: type.EMPTY_STATE }) }}
                  />

                  <InputComponent
                    inputTitle={String.commonString.email}
                    placeholder={String.commonString.Enteryouremail}
                    value={userInput?.email}
                    onChangeText={(value) => { dispatch({ type: type.EMAIL, payload: value }); dispatchError({ type: type.EMAIL_ERROR, payload: "" }) }}
                    errorMessage={userInputError?.emailError}
                    viewStyle={style.top33}
                  />

                  <InputComponent
                    inputTitle={String.commonString.Password}
                    placeholder={String.commonString.ForgotPassword}
                    value={userInput?.password}
                    onChangeText={(value) => { dispatch({ type: type.PASSWORD, payload: value }); dispatchError({ type: type.PASSWORD_ERROR, payload: "" }) }}
                    isSecureIcon={true}
                    isSecureEntry={userInput?.showPassword}
                    onPrees={() => dispatch({ type: type.SHOW_PASSWORD, payload: !userInput?.showPassword })}
                    errorMessage={userInputError?.passwordError}
                  />


                  <View style={style.forgotPassword}>
                    <Text
                      onPress={() => { navigation?.navigate(ROUTES?.FORGOTPASSWORD) }}
                      style={[F40014.main, F40014.color]}>
                      {String.commonString.ForgotPassword}
                    </Text>
                  </View>

                  <View style={style.signIn}>
                    <ButtonComponent
                      loading={loading}
                      onPrees={() => handleLoginFlow()} buttonTitle={String.commonString.SignIn} />
                  </View>
                  <ORtitle />

                  {/* Google and ios button */}
                  <View style={style.socialMedia}>
                    <SocialMediaButton
                      socialMediaIcon={<Google />}
                      buttonTitle={String.commonString.Google}
                      onPress={() => { googleLogin(navigation) }}
                    />
                    <SocialMediaButton
                      socialMediaIcon={<Apple />}
                      buttonTitle={String.commonString.Apple}
                      onPress={() => { }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};