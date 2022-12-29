import { View, ScrollView, Text, SafeAreaView, Alert } from 'react-native';
import React, { useContext } from 'react';
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import { config } from '../../config';
import { Colors, F40012, F40014, F60024 } from '../../Theme';
import auth from '@react-native-firebase/auth';
import { loginUser } from '../../services/FireStoreServices';
import { useNavigation } from '@react-navigation/native';
import { LocalStorageKeys, ROUTES, String } from '../../constants';
import * as LocalStorage from '../../services/LocalStorage';
import { Logo } from '../../assets/icons';
import { style } from './style';
import { InputComponent } from '../../components/InputComponent';
import { InputContextProvide } from '../../context/CommonContext';
import { type } from '../../constants/types';
import { ButtonComponent } from '../../components/ButtonComponent';
import { Google } from '../../assets/icons/Google';
import { SocialMediaButton } from '../../components/SocialMediaButton';
import { Apple } from '../../assets/icons/Apple';
import Back from '../../assets/icons/Back';

export const Login = () => {
  const { storeCreator: { userInput, dispatch } } = useContext(InputContextProvide)
  const navigation = useNavigation()
  GoogleSignin.configure({
    webClientId: config?.googlewebClientId,
    offlineAccess: true,
  });


  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { accessToken, idToken } = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      await auth()
        .signInWithCredential(credential)
        .then(async function (res) {
          const userDetail = res?.user?._user;
          if (res?.additionalUserInfo?.isNewUser) {
            loginUser(userDetail).then(() => {
              console.log("loginUser", res);
            }).catch((err) => {
              console.log("loginUser", err);
            });

          }
          await LocalStorage.setValue("userLoginId", userDetail?.uid);
          navigation.reset({
            index: 0,
            routes: [{ name: ROUTES.TABLIST }],
          });
          await LocalStorage.setValue(LocalStorageKeys?.IsFirstTimeLogin, true);
        });
    } catch (error) {
      // setLoader(false);
    }
  };

  const handleLoginFlow = () => {
    const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (userInput?.email?.length <= 0 || !emailPattern.test(userInput?.email)) {
      Alert.alert("Provide valid email")
    }
    else if (userInput?.password?.length <= 0 || userInput?.password?.length < 8) {
      Alert.alert("Password mus't be 8 character")
    }
    else {
      Alert.alert("Sucess")
    }
  }

  return (
    <>
      <SafeAreaView style={style.safeArea} />
      <View style={style.main}>
        <View style={style.headerBack}>
          <Back />
        </View>
        <ScrollView
          keyboardShouldPersistTaps={String.commonString.handled}
          style={style.scroll}
          scrollEnabled={true}
          contentContainerStyle={style.scrollContain}>

          <View style={style.mainLogo}>
            <Logo />
          </View>

          <View style={style.wrapperView} >
            <View style={[style.container, style.borderRadius]}>
              <View style={[style.borderRadius, { backgroundColor: Colors.white, marginTop: 12, flex: 1 }]}>
                <View style={style.innerContainer} >

                  <View style={style.welcomeHeader}>
                    <Text style={F60024.textStyle}>
                      {String.commonString.WelcomeBack}
                    </Text>
                  </View>

                  <View style={style.signUpHeader}>
                    <Text style={F40014.main}>
                      {String.commonString.Donthaveanaccount}
                    </Text>
                    <Text style={[F40014.main, F40014.color]}>
                      {String.commonString.SignUp}
                    </Text>
                  </View>


                  <InputComponent
                    inputTitle={String.commonString.email}
                    viewStyle={{ marginTop: 33 }}
                    value={userInput?.email}
                    onChangeText={(value) => { dispatch({ type: type.EMAIL, payload: value }) }}
                    placeholder={String.commonString.Enteryouremail}
                  />

                  <InputComponent
                    inputTitle={String.commonString.Password}
                    onPrees={() => dispatch({ type: type.SHOW_PASSWORD, payload: !userInput?.showPassword })}
                    isSecureIcon={true}
                    isSecureEntry={userInput?.showPassword}
                    value={userInput?.password}
                    onChangeText={(value) => dispatch({ type: type.PASSWORD, payload: value })}
                    placeholder={String.commonString.ForgotPassword} />


                  <View style={style.forgotPassword}>
                    <Text style={[F40014.main, F40014.color]}>
                      {String.commonString.ForgotPassword}
                    </Text>
                  </View>

                  <View style={style.signIn}>
                    <ButtonComponent onPrees={() => { handleLoginFlow() }} buttonTitle={String.commonString.SignIn} />
                  </View>

                  <View style={style.bottomLine}>
                    <View style={style.line} />
                    <Text style={[F40012.main, F40012.bottom]} >
                      OR
                    </Text>
                    <View style={style.line} />
                  </View>
                  <View>

                    {/* Google and ios button */}
                    <View style={style.socialMedia}>
                      <SocialMediaButton
                        socialMediaIcon={<Google />}
                        buttonTitle={String.commonString.Google}
                        onPress={() => { googleLogin() }}
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
          </View>
        </ScrollView>
      </View>

    </>
  );
};
