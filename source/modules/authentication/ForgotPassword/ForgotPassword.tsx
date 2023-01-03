import { View, Text, SafeAreaView, StatusBar, Platform } from 'react-native'
import React, { useContext } from 'react'
import { Apple, Google, } from '../../../assets/icons'
import { Colors, F40014, F60024 } from '../../../Theme'
import { emailPattern, ROUTES, String } from '../../../constants'
import { InputContextProvide } from '../../../context/CommonContext'
import { type } from '../../../constants/types'
import { useNavigation } from '@react-navigation/native'
import { BackButton, ButtonComponent, GradientHeader, InputComponent, SocialMediaButton } from '../../../components'
import { style } from './style'
import { firebase } from '@react-native-firebase/auth'
import { ORtitle } from '../Authcomponents'
import { appleLoginIos, googleLogin, handleFirebaseError } from '../../../services'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export const ForgotPassword = () => {
  /**
  * Context to give userinput data and error message
  */
  const { storeCreator: { userInput, dispatch } }: any = useContext(InputContextProvide)
  const navigation = useNavigation()

  /**
   * user reset password
   * @returns firebase share link in user gmail and user change password 
   */

  const handlePasswordReset = async () => {
    if (userInput?.email?.length <= 0 || !emailPattern.test(userInput?.email)) {

      handleFirebaseError("WrongEmail")

    } else {
      return await firebase.auth().sendPasswordResetEmail(userInput?.email).then((response) => {
        handleFirebaseError("ForgotSucess")
        dispatch({ type: type.EMPTY_STATE });
      }).catch((forgotError) => {
        handleFirebaseError(forgotError.code)
      })
    }

  }
  return (
    <>

      <SafeAreaView style={style.backGroundColor} />
      <StatusBar backgroundColor={Colors?.gradient1} barStyle={String?.StatusBar?.lightContent} />
     
      <KeyboardAwareScrollView
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={String.commonString.handled}
        style={style.scroll}
        scrollEnabled={true}
        contentContainerStyle={style.scrollContain}>

        <GradientHeader >
        <BackButton />
          <View style={style.wrapperView} >
            <View style={[style.borderRadius, { backgroundColor: Colors?.white, flex: 1, }]}>
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
              keyboardType={String?.keyboardType?.email}
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
            {
                    Platform?.OS == 'android' ?

                      <SocialMediaButton
                        wrapperStyle={{ width: '90%', }}
                        socialMediaIcon={<Google />}
                        buttonTitle={String.commonString.signInWithGoogle}
                        onPress={() => { googleLogin(navigation) }}
                      /> :
                      <View style={style.socialMedia}>
                        <SocialMediaButton
                          socialMediaIcon={<Google />}
                          buttonTitle={String.commonString.Google}
                          onPress={() => { googleLogin(navigation) }}
                        />
                        <SocialMediaButton
                          socialMediaIcon={<Apple />}
                          buttonTitle={String.commonString.Apple}
                          onPress={() => appleLoginIos(navigation)}
                        />
                      </View>
                  }
              </View>
            </View>
          </View>
        </GradientHeader>
      </KeyboardAwareScrollView>
    </>
  )
}

