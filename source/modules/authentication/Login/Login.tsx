import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import React, { useContext } from 'react';
import { Colors, F40014, } from '../../../Theme';
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
        await LocalStorage.setValue(LocalStorageKeys.UserId, userDetail?.uid);
        navigation.reset({
          index: 0,
          routes: [{ name: ROUTES.TABLIST }],
        });
        await LocalStorage.setValue(LocalStorageKeys?.IsFirstTimeLogin, true);
        dispatch({ type: type.EMPTY_STATE })
      }).
      catch((userError) => handleFirebaseError(userError.code)).
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
      <StatusBar barStyle={String.StatusBar.lightContent} backgroundColor={Colors.linear_gradient} />
      <View style={style.main}>

        <KeyboardAwareScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={String.commonString.handled}
          style={style.scroll}
          scrollEnabled={true}
          contentContainerStyle={style.scrollContain}>

          <GradientHeader />
          {/* <LinearGradient colors={[Colors?.gradient1, Colors?.gradient2, Colors?.gradient3]} style={{ flex: 1 }}> */}
          <View style={style.wrapperView} >
            <View style={[style.borderRadius, { backgroundColor: Colors?.white, flex: 1, }]}>

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
                  inputTitle={String.commonString.Password}
                  placeholder={String.commonString.Enteryourpassword}
                  value={userInput?.password}
                  onChangeText={(value) => {
                    dispatch({ type: type.PASSWORD, payload: value });
                    if (value?.length > 7) {
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
                    {String.commonString.ForgotPassword}
                  </Text>
                </View>

                <View style={style.signIn}>
                  <ButtonComponent
                    onPrees={() => handleLoginFlow()} buttonTitle={String.commonString.SignIn} />
                </View>
                <ORtitle />
                {
                  Platform?.OS == 'android' ?
                    (<SocialMediaButton
                      wrapperStyle={{ width: '90%', }}
                      socialMediaIcon={<Google />}
                    buttonTitle={String.commonString.signInWithGoogle}
                      onPress={() => { googleLogin(navigation,setLoading) }}
                    />) :
                    (<View style={style.socialMedia}>
                      <SocialMediaButton
                        socialMediaIcon={<Google />}
                        buttonTitle={String.commonString.Google}
                        onPress={() => { googleLogin(navigation,setLoading) }}
                      />
                      <SocialMediaButton
                        socialMediaIcon={<Apple />}
                        buttonTitle={String.commonString.Apple}
                        onPress={() => appleLoginIos(navigation,setLoading)}
                      />
                    </View>)
                }
              </View>
            </View>
          </View>
          {/* </LinearGradient> */}
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};
