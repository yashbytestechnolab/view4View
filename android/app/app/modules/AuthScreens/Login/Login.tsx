import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Keyboard,
  Platform,
} from 'react-native';
import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import {ROUTES, String} from '../../../constants';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {Images} from '../../../assets/images';
import {CommonButton, CommonTextInput} from '../../../components';
import {Email} from '../../../assets/icons/Email';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Lock} from '../../../assets/icons/Lock';
import {SocialButton} from '../../../components/SocialButton/SocialButton';
import Logo from '../../../assets/icons/logo';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import * as LocalStorage from '../../../services/LocalStorage';
import {commonStyles} from '../../../constants/CommonStyles';
import {schema} from '../../../constants/validation';
import {styles} from '../SignUp/styles';
import {Colour} from '../../../theme';
import {BackButton} from '../../../components/BackButton/BackButton';
import {AuthContext} from '../../../context/AuthContext';

import {useMutation} from '@apollo/client';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {HidePwd} from '../../../assets/icons/HidePwd';
import {ShowPwd} from '../../../assets/icons/ShowPwd';
import {LocalStorageKeys} from '../../../constants/LocalStorageKeys';
import {appleLogin, facebookLogin, googleLogin, } from '../SocailLogin';
import {SIGNIN_BY_EMAIL, SIGNUP_BY_EMAIL} from '../../../graphQL/Mutations';
import {Loder} from '../../../components/Loder';
import jwt_decode from 'jwt-decode';
import {Fonts} from '../../../assets';
import { Facebook } from '../../../assets/icons/Facebook';
import { Google } from '../../../assets/icons/Google';
import { Apple } from '../../../assets/icons/Apple';
import { LoginEmail, passwordLogin } from '../../../assets/icons';

const Login: FC = () => {
  const navigation: any = useNavigation();
  const [securePassword, setSecurePassword] = useState(true);
  const passwordRef: any = useRef();
  const [email, setEmail]: any = useState('');
  const [password, setPassword]: any = useState('');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const {signIn} = useContext(AuthContext);
  const [signUpByEmail] = useMutation(SIGNUP_BY_EMAIL);
  const [signInByEmail] = useMutation(SIGNIN_BY_EMAIL);
  const [google, setGoogle]: any = useState();
  const [isSocial, setIsSocial]: any = useState(false);
  const [errorMsg, setErrorMsg]: any = useState('');
  const [profilePic, setProfilePic]: any = useState('');

  const [showPwd, setShowPwd]: any = useState(true);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: values => {
      Keyboard.dismiss();
      isSocial ? socialLoginHandle(values) : handleLogin(values)
    },
  });
  const handleLogin = async (data: any) => {
   setIsSocial(data?.isSocial)
   setLoader(true);
   console.log("tateasfdsdfd => ", {
    email: email,
    password: password
  });
    setIsSocial(data?.isSocial);
    setLoader(true);
    signInByEmail({
      variables: {
        input: {
          email: email,
          password: password,
        },
      },
    })
      .then(async (response: any) => {
        console.log('ress....', response);
        setLoader(false);
        if (response?.data?.signUpByEmail?.errorCode == 1) {
          Alert.alert(response?.data?.signUpByEmail?.message);
        }
        await LocalStorage.setValue(LocalStorageKeys.userInfo, response?.data?.signInByEmail);
        signIn(response?.data.signInByEmail.jwttoken);
      })

      .catch((error: any) => {
        setLoader(false);
        setErrorMsg(JSON.parse(JSON.stringify(error)).message);
        //Alert.alert(JSON.parse(JSON.stringify(error)).message);
        console.log('errorMsg', JSON.parse(JSON.stringify(error)).message);
      });
  };
  const socialLoginHandle = (data: any) => {
    setIsSocial(data?.isSocial);
    console.log('>>>>>data', data);
    // setLoader(true);
    signUpByEmail({
      variables: {
        input: {
          email: data?.email,
          isSocial: data?.isSocial,
          appleRefID: data?.appleRefID,
          facebookRefID: data?.facebookRefID?.id,
          googleRefID: data?.googleRefID,
        },
      },
    })
      .then(async (response: any) => {
        await LocalStorage.setValue(LocalStorageKeys.userInfo, response?.data?.signUpByEmail);
        await LocalStorage.setValue(LocalStorageKeys.accessToken,response?.data?.signUpByEmail?.jwttoken)
        setLoader(false);
        if (response?.data?.signUpByEmail?.errorCode == 1) {
          Alert.alert(response?.data?.signUpByEmail?.message);
        }
        if (response?.data?.signUpByEmail?.errorCode == 0) {
          signIn(response?.data?.signUpByEmail?.jwttoken);
        }
      })

    .catch((error: any) => {
      // setLoader(false);
      // setErrorMsg(JSON.parse(JSON.stringify(error)).message)
      // Alert.alert(JSON.parse(JSON.stringify(error)).message);
     
    });
  }
  

    
  const googleSignIn = async () => {
    const user = await googleLogin();
    if(user?.googleRefID){
      setLoader(true);
      await socialLoginHandle(user);
    }
    
  };
  const appleSignIn = async () => {
    const user = await appleLogin();
    const userInfo: any = await jwt_decode(user?.identityToken);
    user.email = userInfo.email;
    await socialLoginHandle(user);
  };

  const facebookSignIn = async () => {
    const user = await facebookLogin();
    if(user){
      setLoader(true);
    }
    socialLoginHandle(user);
  };
    
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setPassword('');
      setEmail('');
      setErrorMsg('');
      setError('');
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <>
    <SafeAreaView style={{flex: 1, backgroundColor:Colour?.PrimaryBlue}}>
      <StatusBar
        backgroundColor={Colour?.PrimaryBlue}
        barStyle={String.lightContent}
      />
      <KeyboardAwareScrollView
        testID={'keyboard'}
        resetScrollToCoords={{x: 0, y: 0}}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        style={styles.flex}>
        <BackButton action={'SignUp'} />
        <View style={{paddingHorizontal: 35}}>
          <View style={styles.Toplogo}>
            <Logo height={49} width={101} />
            <Text style={styles.title}>{String.loginAccout}</Text>
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
          <CommonTextInput
            svg={LoginEmail}
            wrapperStyle={[  errorMsg.length === null ?{ marginTop: 0}:{marginTop:15}]}
            value={email}
            onChangeText={(value: any) => {
              formik.setFieldValue('email', value);
              setEmail(value);
              setError('');
            }}
            fromLogin
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
              fromLogin
              onPress={() => {
                setSecurePassword(!securePassword);
              }}
              wrapperStyle={{marginTop: 8}}
              ref={passwordRef}
              value={password}
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
          {error ? <Text style={commonStyles.errorText}>{error}</Text> : null}
          <CommonButton
            buttonText={String.Login}
            onPress={formik.handleSubmit}
            buttonStyle={styles.wrapperBtn}
          />

          <Text style={styles.orText}>{String.or}</Text>
          <SocialButton
            buttonText={String?.loginWithFacebook}
            onPress={() => {
              facebookSignIn();
            }}
            Icon={Facebook}
            imageStyle={styles.fbIcon}
            //source={Images.fb}
            wraperStyle={styles.fb}
          />
          <SocialButton
            buttonText={String?.loginWithGoogle}
            onPress={() => {
              googleSignIn();
            }}
            imageStyle={styles.fbIcon}
            Icon={Google}
            //source={Images.google}
            wraperStyle={styles.google}
          />
          {Platform.OS === 'ios' && (
            <SocialButton
              buttonText={String?.loginWithApple}
              onPress={appleSignIn}
              Icon={Apple}
              wraperStyle={styles.apple}
              textStyle={styles.appleText}
            />
          )}
          <View style={styles.wrapper}>
            <Text
              onPress={() => {
                navigation.navigate(ROUTES.FPStep1);
              }}
              style={styles.subText}>
              {String?.forgotPws}
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
        {loader && <Loder spinnerColor={Colour.primaryGreen}/>}
    </>
  );
};
export default Login;



