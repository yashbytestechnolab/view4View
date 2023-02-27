import {View, Text, TextInput, StatusBar, TouchableOpacity} from 'react-native';
import React, {FC, useRef, useState} from 'react';
import {Colour} from '../../../../theme';
import {CommonButton} from '../../../../components';
import {ROUTES, String} from '../../../../constants';
import {ForgotBack} from '../../../../components/ForgotBack';
import {commonStyles} from '../../../../constants/CommonStyles';
import {Key} from '../../../../assets/icons/Key';
import {useNavigation} from '@react-navigation/native';
import {style} from './style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useFormik} from 'formik';
import {passwordSchema} from '../../../../constants/validation';
import {ShowPwd} from '../../../../assets/icons/ShowPwd';
import {HidePwd} from '../../../../assets/icons/HidePwd';
import BorderTextInput from '../../../../components/BorderTextInput/BorderTextInput';
import { useMutation } from '@apollo/client';
import { SETNEWPASSWORD, SET_NEW_USER_PASSWORD } from '../../../../graphQL/Mutations';

const FPStep3: FC = (props:any) => {
  console.log("route===> ", props?.route?.params.url);
  const resetToken = props?.route?.params?.url;
  const navigation: any = useNavigation();
  const passwordRef: any = useRef();
  const confirmPasswordRef: any = useRef();
  const [loader, setLoader] = useState(false);
  const [showPwd, setShowPwd]: any = useState(true);
  const [showconformPwd, setShowconformPwd]: any = useState(true);
  const [setNewUserPassword]=useMutation(SET_NEW_USER_PASSWORD)
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: passwordSchema,
    onSubmit: values => {
      changePasswordAPIHandler(values);
      // console.log(navigation.navigate(ROUTES.FPStep4))
    },
  });

  const changePasswordAPIHandler = async (values: any) => {
    setLoader(true);

    setNewUserPassword({
     variables:{
      setUserNewPassword: {
          token: resetToken,
          newPassword: values.confirmPassword
        
      }
     }
   }).then((response:any)=>{
    setLoader(false);
    
        navigation.navigate(ROUTES.FPStep4);
   }).catch((error)=>{
    setLoader(false);
 
  })
 
  };
  return (
    <KeyboardAwareScrollView
      testID={String.keyboard}
      resetScrollToCoords={{x: 0, y: 0}}
      keyboardShouldPersistTaps={String.handler}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={style.main}
      scrollEnabled={false}>
      <StatusBar
        backgroundColor={Colour?.white}
        barStyle={String.darkContent}
      />
      <View style={style.IconWrapper}>
        <Key />
      </View>
      <Text style={commonStyles.forgotPwdTitle}>
        {String.forgotPasswordStep3.forgotPwdTitle}
      </Text>
      <Text style={[commonStyles.forgotPasswordSubText, style.subText]}>
        {String.forgotPasswordStep3.subTitle}
      </Text>

      <View style={{flexDirection: 'column'}}>
        <BorderTextInput
          title={String.password}
          placeholder={'********'}
          ref={passwordRef}
          onChangeText={formik.handleChange('password')}
          value={formik.values.password}
          IssecureTextEntry={showPwd}
          returnKeyType={String.next}
          onSubmitEditing={() => confirmPasswordRef.current.focus()}
        />
        <TouchableOpacity
          style={style.pwdWrapper}
          onPress={() => {
            setShowPwd(!showPwd);
          }}>
          {showPwd ? <HidePwd /> : <ShowPwd />}
        </TouchableOpacity>
      </View>
      {formik.touched.password && formik.errors?.password ? (
        <Text style={[commonStyles.errorText2,]}>{formik.errors?.password}</Text>
      ) : null}

      <View style={[{marginTop:16, flexDirection: 'column'}]}>
        <BorderTextInput
          title={String.conformPwd}
          placeholder={'********'}
          IssecureTextEntry={showconformPwd}
          onChangeText={formik.handleChange('confirmPassword')}
          value={formik.values.confirmPassword}
          ref={confirmPasswordRef}
          returnKeyType={String.go}
          onSubmitEditing={() => {
            formik.handleSubmit();
          }}
        />
        <TouchableOpacity
          style={[style.pwdWrapper]}
          onPress={() => {
            setShowconformPwd(!showconformPwd);
          }}>
          {showconformPwd ? <HidePwd /> : <ShowPwd />}
        </TouchableOpacity>
      </View>
      {formik.touched.password && formik.errors?.confirmPassword ? (
        <Text style={commonStyles.errorText2}>
          {formik.errors?.confirmPassword}
        </Text>
      ) : null}
      <CommonButton
        buttonText={String.resetPwd}
        onPress={() => {
          formik.handleSubmit();
        }}
        isLoading={loader}
        buttonStyle={style.buttonWrapper}
      />
      <ForgotBack />
    </KeyboardAwareScrollView>
  );
};

export default FPStep3;
