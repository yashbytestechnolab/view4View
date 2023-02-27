import {View, Text, StatusBar,TextInput, Alert} from 'react-native';
import React, {FC, useRef, useState} from 'react';
import {Colour} from '../../../../theme';
import {ROUTES, String} from '../../../../constants';
import {Key} from '../../../../assets/icons/Key';
import {commonStyles} from '../../../../constants/CommonStyles';
import {CommonButton} from '../../../../components';
import {ForgotBack} from '../../../../components/ForgotBack';
import {useNavigation} from '@react-navigation/native';
import {style} from './style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useFormik} from 'formik';
import {Emailschema} from '../../../../constants/validation';
import {FORGOT_USER_PASSWORD} from '../../../../graphQL/Mutations';
import {useMutation} from '@apollo/client';

const FPStep1: FC = () => {
  const navigation: any = useNavigation();
  const [loader, setLoader] = useState(false);
  const emailRef:any=useRef()
  const [forgotUserPassword] = useMutation(FORGOT_USER_PASSWORD);
  const formik: any = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Emailschema,

    onSubmit: (values:any) => {
      changePasswordAPIHandler(values);
    },
  });

  const changePasswordAPIHandler = async (values: any) => {
    setLoader(true);
    forgotUserPassword({
      variables: {
        input: {
          email: values.email
        }
      }
    }).then((res) => {
      console.log(res)
     
      if(res?.data?.forgotUserPassword?.errorCode==1){
        setLoader(false)
       Alert.alert(res?.data?.forgotUserPassword?.message)
      }
      else{
        setLoader(false)
        navigation.navigate(ROUTES.FPStep2, {email: values.email}); 
      }
    }).catch((e) => Alert.alert(e))

   
  };
  return (
    <View style={[commonStyles.whiteBG, {paddingHorizontal:16}]}>
      <StatusBar
        backgroundColor={Colour?.white}
        barStyle={String.darkContent}
      />
      <View style={style.IconWrapper}>
        <Key />
      </View>

      <Text style={commonStyles.forgotPwdTitle}>
        {String.forgotPasswordStep1.forgotPwdTitle}
      </Text>
      <Text style={[commonStyles.forgotPasswordSubText, {marginBottom: 32}]}>
        {String.forgotPasswordStep1.subTitle}
      </Text>

      <KeyboardAwareScrollView
        testID={String.keyboard}
        resetScrollToCoords={{x: 0, y: 0}}
        keyboardShouldPersistTaps={String.handler}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.main}
        scrollEnabled={false}>
        <Text style={[commonStyles.forgotSubText, style.textWrapper]}>
          {String.email}
        </Text>
        <TextInput
          placeholder={String.forgotPasswordStep1.enterEmail}
          placeholderTextColor={Colour.gray500}
          onChangeText={formik.handleChange('email')}
          value={formik.values.email}
          style={commonStyles?.forgotTextInput}
          ref={emailRef}
          autoCapitalize={String.keybordNone}
          keyboardType={String.keyboardEmail}
          returnKeyType={String?.go}
          onSubmitEditing={() => {
            formik.handleSubmit();
          }}
        />
        {formik.touched.email && formik.errors?.email ? (
          <Text style={commonStyles.errorText2}>{formik.errors?.email}</Text>
        ) : null}
        <CommonButton
          buttonText={String.submit}
          isLoading={loader}
          onPress={() => {
            formik.handleSubmit();
          }}
          buttonStyle={style.buttonWrapper}
        />
        <ForgotBack />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default FPStep1;
