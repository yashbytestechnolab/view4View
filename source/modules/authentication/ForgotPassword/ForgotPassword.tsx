import { View, Text, SafeAreaView } from 'react-native'
import React, { useContext } from 'react'
import { Apple, Google, } from '../../../assets/icons'
import { F40012, F40014, F60024 } from '../../../Theme'
import { emailPattern, ROUTES, String } from '../../../constants'
import { InputContextProvide } from '../../../context/CommonContext'
import { type } from '../../../constants/types'
import { useNavigation } from '@react-navigation/native'
import { BackButton, ButtonComponent, GradientHeader, InputComponent, SocialMediaButton } from '../../../components'
import { style } from './style'
import { firebase } from '@react-native-firebase/auth'
import { showMessage } from 'react-native-flash-message'

export const ForgotPassword = () => {
  const { storeCreator: { userInput, dispatch } }: any = useContext(InputContextProvide)
  const navigation = useNavigation()

  const handlePasswordReset = async () => {
    if (userInput?.email?.length <= 0 || !emailPattern.test(userInput?.email)) {
      showMessage({
        message: String?.validationMsg?.validEmail,
        type: String.flashMessage?.danger,
      });
    } else {
      return await firebase.auth().sendPasswordResetEmail(userInput?.email).then((response) => {
        showMessage({
          message: String.flashMessage?.forgotPwdSuccessMsg,
          type: String.flashMessage?.success,
        });

      }).catch((e) => {
        showMessage({
          message: e?.message,
          type: String.flashMessage?.danger,
        });
      })
    }

  }
  return (
    <>
      <BackButton />
      <SafeAreaView style={style.scrollContain}>
        <GradientHeader />
        <View style={style.containerWrapper} >
          <View style={style.welcomeHeader}>
            <Text style={F60024.textStyle}>
              {String.commonString?.ForgotPassword}
            </Text>
          </View>
          <InputComponent
            inputTitle={String.commonString.email}
            viewStyle={{ marginTop: 33 }}
            value={userInput?.email}
            onChangeText={(value) => { dispatch({ type: type.EMAIL, payload: value }) }}
            placeholder={String.commonString.Enteryouremail}
          />
          <View style={style.signIn}>
            <ButtonComponent wrapperStyle={style.wrapperStyle} onPrees={() => { handlePasswordReset() }} buttonTitle={String.commonString?.submit} />
          </View>
          <View style={style.backToLoginTextWrapper}>
            <Text style={F40014.main}>{String.commonString?.backTo}</Text>
            <Text onPress={() => { navigation.navigate(ROUTES?.LOGIN) }} style={[F40014.main, F40014?.color]}>{String.commonString?.SignIn}</Text>
          </View>
          <View style={style.bottomLine}>
            <View style={style.line} />
            <Text style={[F40012.main, F40012.bottom]} >
              OR
            </Text>
            <View style={style.line} />
          </View>
          <View style={style.socialMedia}>
            <SocialMediaButton
              socialMediaIcon={<Google />}
              buttonTitle={String.commonString.Google}
              onPress={() => { }}
            />
            <SocialMediaButton
              socialMediaIcon={<Apple />}
              buttonTitle={String.commonString.Apple}
              onPress={() => { }}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}

