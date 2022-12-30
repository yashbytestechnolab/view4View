import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { Apple, Google, } from '../../../assets/icons'
import { Colors, F40012, F40014, F60024 } from '../../../Theme'
import { emailPattern, ROUTES, String } from '../../../constants'
import { InputContextProvide } from '../../../context/CommonContext'
import { type } from '../../../constants/types'
import { useNavigation } from '@react-navigation/native'
import { BackButton, ButtonComponent, GradientHeader, InputComponent, SocialMediaButton } from '../../../components'
import { style } from './style'
import { firebase } from '@react-native-firebase/auth'
import { showMessage } from 'react-native-flash-message'
import { ORtitle } from '../Authcomponents'

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
      <SafeAreaView style={style.backGroundColor} />
      <ScrollView howsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={String.commonString.handled}
        style={{ backgroundColor: Colors?.gradient1 }}
        scrollEnabled={true}
        contentContainerStyle={style.scrollContain}>
        <GradientHeader />
        <View style={style.containerWrapper} >
          <View style={style.welcomeHeader}>
            <Text style={F60024.textStyle}>
              {String.commonString?.ForgotPassword}
            </Text>
          </View>
          <InputComponent
            inputTitle={String.commonString.email}
            viewStyle={style.marginTop}
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
          <ORtitle />
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
      </ScrollView>
    </>
  )
}

