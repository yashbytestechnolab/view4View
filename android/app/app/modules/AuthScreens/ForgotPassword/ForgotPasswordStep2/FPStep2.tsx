import React, {FC, useState, useEffect} from 'react';
import {View, Text, StatusBar, TouchableOpacity, Platform } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colour} from '../../../../theme';
import {ROUTES, String} from '../../../../constants';
import {commonStyles} from '../../../../constants/CommonStyles';
import {CommonButton} from '../../../../components';
import {ForgotBack} from '../../../../components/ForgotBack';
import {GreenEmail} from '../../../../assets/icons/GreenEmail';
import {style} from './style';
// import { Loder } from '../../../../components/Loder';
import { openInbox } from "react-native-email-link";
import {FORGOT_USER_PASSWORD} from '../../../../graphQL/Mutations';
import {useMutation} from '@apollo/client';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {Loder} from '../../../../components/Loder';
const FPStep2: FC = (props: any) => {
  console.log("props==> ", props.route.params);
  const [load,setLoad]:any=useState(false)
  const [isScreenLoading, setIsScreenLoading] = useState(true);
  const [deeplinkUrl, setDeeplinkUrl]:any=useState('');
  const { email } = props.route.params;
  const navigation: any = useNavigation();
  const [forgotUserPassword, {error: errorMsg}] = useMutation(FORGOT_USER_PASSWORD);
  const reSendEmail = () =>{
    forgotUserPassword({
      variables: {
        input: {
          email: email
        }
      }
    }).then((res) => {
      console.log("forgot res==> ", res);
    }).catch((e) => console.log("current ERROR:=> ", e))
  }
  const openMailApp = () => {
    openInbox();
  }

  useEffect(() => {
    if(Platform.OS != 'ios'){
      dynamicLinks().onLink((url:any) => {
        // handle link inside app
        console.log("dynamicLinks aaurl==>", url);
        if(url?.url){
          console.log("dyyyyyy==>", url);
          setDeeplinkUrl(url.url);
          // const tokenUrl = new URL(url.url);
          // url.url.split('myParam=')[1]
          navigation.navigate(ROUTES.FPStep3, {'url': url.url.split('token=')[1]});
        }
      });
    }
  })

  return (
    <View style={style.main}>
      <StatusBar
        backgroundColor={Colour?.white}
        barStyle={String.darkContent}
      />
      <View style={style.IconWrapper}>
        <GreenEmail />
      </View>
      <View style={{marginHorizontal: 16}}>
        <Text style={commonStyles.forgotPwdTitle}>
          {String.forgotPasswordStep2.forgotPwdTitle}
        </Text>
        <Text style={commonStyles.forgotPasswordSubText}>
          {String.forgotPasswordStep2.subTitle}
        </Text>
        <Text style={[style.emailText, {marginBottom: 32}]}>
          {email}
        </Text>

        <CommonButton
          buttonText={String.forgotPasswordStep2.openEmail}
          isLoading={load}
          onPress={openMailApp}
          // onPress={()=>{navigation.navigate(ROUTES.FPStep3)}}
        />
      </View>
      <View style={style.resendActionWrapper}>
        <Text style={[commonStyles.forgotPasswordSubText, style.textWrapper]}>
          {String.forgotPasswordStep2.dontEmail}
        </Text>
        <TouchableOpacity  onPress={reSendEmail}>
            <Text style={style.link}>
              {String.forgotPasswordStep2.resendEmail}
            </Text>
        </TouchableOpacity>
      </View>
      <ForgotBack />
      {/* {isScreenLoading && <Loder spinnerColor={Colour.primaryGreen}/>} */}
    </View>
  );
};

export default FPStep2;
