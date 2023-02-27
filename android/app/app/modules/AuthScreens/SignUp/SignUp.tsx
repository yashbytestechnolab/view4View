import {View, Text, StatusBar, TouchableOpacity, Alert, SafeAreaView, Keyboard, Platform,BackHandler} from 'react-native';
import React, {FC, useEffect, useContext, useRef, useState} from 'react';
import {ROUTES, String} from '../../../constants';
import {styles} from './styles';
import * as LocalStorage from '../../../services/LocalStorage';
import {LocalStorageKeys} from '../../../constants/LocalStorageKeys';
import {useFormik} from 'formik';
import {useMutation} from '@apollo/client';
import {Images} from '../../../assets/images';
import {CommonButton, CommonTextInput} from '../../../components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

import {Email} from '../../../assets/icons/Email';
import {Lock} from '../../../assets/icons/Lock';
import {SocialButton} from '../../../components/SocialButton/SocialButton';
import Logo from '../../../assets/icons/logo';
import {commonStyles} from '../../../constants/CommonStyles';
import {schema} from '../../../constants/validation';
import {BackButton} from '../../../components/BackButton/BackButton';
import {Colour} from '../../../theme';
import {AuthContext} from '../../../context/AuthContext';
import { HidePwd } from '../../../assets/icons/HidePwd';
import { ShowPwd } from '../../../assets/icons/ShowPwd';
import { appleLogin, facebookLogin, googleLogin, } from '../SocailLogin';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { SIGNUP_BY_EMAIL } from '../../../graphQL/Mutations';
import { Loder } from '../../../components/Loder';
import { AccessToken, LoginButton } from 'react-native-fbsdk-next';
import { Fonts } from '../../../assets';
import { Google } from '../../../assets/icons/Google';
import { Facebook } from '../../../assets/icons/Facebook';
import { Apple } from '../../../assets/icons/Apple';
import jwt_decode from 'jwt-decode';
import { LoginEmail, passwordLogin } from '../../../assets/icons';

const SignUp: FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const [signInByEmail, ] = useMutation(SIGNUP_BY_EMAIL);
  const [securePassword, setSecurePassword] = useState(true);
  const passwordRef: any = useRef();
  const [email, setEmail]: any = useState('');
  const [password, setPassword]: any = useState('');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const {signIn}: any = useContext(AuthContext);
  const [showPwd, setShowPwd]: any = useState(true);
  const [errorMsg, setErrorMsg]: any = useState('');
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (data) => {
      Keyboard.dismiss()
      handleLogin(data);
    },
  });

  const handleLogin = async (data: any) => {
    setLoader(true);
    signInByEmail({
      variables: {
        input: 
        {
          email: email||data?.email,
          isSocial: data.isSocial||false,
          appleRefID: data?.appleRefID,
          facebookRefID:data?.facebookRefID,
          googleRefID:data?.googleRefID,
          password: password
          
        }
      }
    
    })
      .then(async (response: any) => {
        setLoader(false);
        await LocalStorage.setValue(LocalStorageKeys.syncWatchSkip, '');
        await LocalStorage.setValue(LocalStorageKeys.userInfo, response?.data?.signUpByEmail);
        await LocalStorage.setValue(LocalStorageKeys.accessToken,response?.data?.signUpByEmail?.jwttoken)
        await LocalStorage.setValue(LocalStorageKeys.isFirstTimeUser,true)
         signIn(response?.data.signUpByEmail.jwttoken);
         if(response?.data.signUpByEmail?.errorCode==1){
          setErrorMsg(response?.data.signUpByEmail.message)
       }
       
      })

      .catch((error: any) => {
        setLoader(false);
        setErrorMsg(JSON.parse(JSON.stringify(error)).message)
      });
  };
  const socialLoginHandle = async (data: any) => {
    //setLoader(true);
    signInByEmail({
      variables: {
        input: 
        {
          email: email||data?.email,
          isSocial: data.isSocial||false,
          appleRefID: data?.appleRefID,
          facebookRefID:data?.facebookRefID,
          googleRefID:data?.googleRefID,
        }
      }
    
    })
      .then(async (response: any) => {
      console.log("response FB====>",response)
        
        //setLoader(false);
        await LocalStorage.setValue(LocalStorageKeys.syncWatchSkip, '');
        await LocalStorage.setValue(LocalStorageKeys.userInfo, response?.data?.signUpByEmail);

        await LocalStorage.setValue(LocalStorageKeys.accessToken,response?.data?.signUpByEmail?.jwttoken)
        await LocalStorage.setValue(LocalStorageKeys.isFirstTimeUser,true)
         signIn(response?.data.signUpByEmail.jwttoken);
         if(response?.data.signUpByEmail?.errorCode==1){
          setErrorMsg(response?.data.signUpByEmail.message);
          // Alert.alert(response?.data.signUpByEmail.message)
     
         }
       
      })

      .catch((error: any) => {
        console.log("error",error)
        //setLoader(false);
        //setErrorMsg(JSON.parse(JSON.stringify(error)).message);
       
      });
  };

  
  const googleSignIn = async () => {
    const user = await googleLogin();
    if(user?.googleRefID){
      setLoader(true);
    }
    await socialLoginHandle(user);
    
  };

  const facebookSignIn = async () => {
    const user = await facebookLogin();
    if(user){
      setLoader(true);
    }
    await socialLoginHandle(user);
  };

  const appleLoginHandler = async () => {
    const user = await appleLogin();
    console.log("appple user info==> ", user);
    if(user?.email === null){
      const userInfo: any = await jwt_decode(user?.identityToken);
      user.email = userInfo.email;
    }
    await socialLoginHandle(user);
  }

  return (
    <>
    <SafeAreaView style={{flex: 1, backgroundColor:Colour?.PrimaryBlue}}>
      <StatusBar
        backgroundColor={Colour?.PrimaryBlue}
        barStyle={String.lightContent}
      />
      <KeyboardAwareScrollView
        resetScrollToCoords={{x: 0, y: 0}}
        keyboardShouldPersistTaps={String?.handled}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        style={styles.flex}>
        <View style={styles.Toplogo}>
          <Logo height={50} width={100} />
          <Text style={styles.title}>{String.createAccount}</Text>
        </View>
        {errorMsg.length != null &&
          <Text
          style={{
            color: Colour.red,
            alignSelf: 'center',
            fontFamily: Fonts.NotoSansLight,
            fontSize: 14,
            fontWeight: '300',
            flexWrap:'wrap',
            marginTop:16,
          }}>
            {errorMsg}
        </Text>}
        <View style={{paddingHorizontal: 38}}>
          <CommonTextInput
            svg={LoginEmail}
            wrapperStyle={[  errorMsg.length === null ?{ marginTop: 0}:{marginTop:15}]}
            value={formik.values.email}
            fromLogin
            onChangeText={(value: any) => {
              formik.setFieldValue('email', value);
              setEmail(value);
              setError('');
            }}
            keyboardType={String.keyboardEmail}
            placeholder={String.emailAdd}
            returnKeyType={String.keybordNext}
            autoCapitalize={String.keybordNone}
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          {formik.touched.email && formik.errors?.email ? (
            <Text style={commonStyles.errorText}>{formik.errors?.email}</Text>
          ) : null}
          <View style={commonStyles.column}>
          <CommonTextInput
            svg={passwordLogin}
            onPress={() => {
              setSecurePassword(!securePassword);
            }}
            wrapperStyle={{marginTop: 8}}
            ref={passwordRef}
            value={formik.values.password}
            onChangeText={(value: any) => {
              formik.setFieldValue('password', value);
              setPassword(value);
              setError('');
            }}
            secureTextEntry={showPwd}
            returnKeyType={String?.go}
            autoCapitalize={String.keybordNone}
            onSubmitEditing={() => {
              formik.handleSubmit();
            }}
            placeholder={String.password}
          />
           <TouchableOpacity
          style={styles.pwdWrapper}
          onPress={() => {
            setShowPwd(!showPwd);
          }}>
          {showPwd ? <HidePwd /> : <ShowPwd />}
        </TouchableOpacity>
        </View>
          {formik.touched.password && formik.errors?.password ? (
            <Text style={commonStyles.errorText}>
              {formik.errors?.password}
            </Text>
          ) : null}
          <CommonButton
            buttonText={String.createAcc}
            onPress={formik.handleSubmit}
            buttonStyle={styles.wrapperBtn}
          />
          <Text style={styles.orText}>{String.or}</Text>
       
          <SocialButton
          
          buttonText={String?.fbTitle}
            onPress={()=>{facebookSignIn()}}
            imageStyle={styles.fbIcon}
            Icon={Facebook}
            wraperStyle={styles.fb}
          />
          <SocialButton
            buttonText={String?.google}
      
            onPress={()=>{googleSignIn()}}
            imageStyle={styles.fbIcon}
            Icon={Google}
            //source={Images.google}
            wraperStyle={styles.google}
          />
          {Platform.OS === 'ios' &&
          <SocialButton
            buttonText={String?.apple}
            onPress={()=>{appleLoginHandler()}}
            Icon={Apple}
            wraperStyle={styles.apple}
            textStyle={styles.appleText}
          />
          }
          <View style={styles.wrapper}>
            <Text style={[styles.subText, {textDecorationLine: 'none'}]}>
              {String.alreadyMember}
            </Text>
            <Text style={[styles.subText, {textDecorationLine: 'underline',paddingLeft:2}]} onPress={()=>{
              LocalStorage.setValue(LocalStorageKeys.syncWatchSkip, 'yes');
              navigation.navigate(ROUTES.Login);
              }}>
                {String?.login}
              </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
        {loader && <Loder spinnerColor={Colour.primaryGreen}/>}
    </>
  );
};
export default SignUp;


