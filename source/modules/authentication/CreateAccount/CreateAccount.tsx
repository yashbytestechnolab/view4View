import { View, SafeAreaView, TouchableOpacity, StatusBar, Platform } from 'react-native';
import React, { useContext } from 'react'
import { style } from '../CreateAccount/style'
import Back from '../../../assets/icons/Back';
import { LocalStorageKeys, ROUTES, String } from '../../../constants';
import { AuthHeader, ORtitle } from '../Authcomponents';
import { InputComponent } from '../../../components/InputComponent';
import { colorBackGround, Colors, darkBackGround } from '../../../Theme';
import { SocialMediaButton } from '../../../components/SocialMediaButton';
import { Google } from '../../../assets/icons/Google';
import { ButtonComponent } from '../../../components/ButtonComponent';
import { Apple } from '../../../assets/icons/Apple';
import { InputContextProvide } from '../../../context/CommonContext';
import { type } from '../../../constants/types';
import { useNavigation } from '@react-navigation/native';
import { emailPattern } from '../../../regex/Regex';
import { appleLoginIos, googleLogin, handleFirebaseError } from '../../../services';
import auth from '@react-native-firebase/auth';
import { userLogin } from '../../../services/FireStoreServices';
import * as LocalStorage from '../../../services/LocalStorage';
import { GradientHeader } from '../../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const CreateAccount = () => {
    const navigation = useNavigation()
    /**
   * Context to give userinput data and error message
   */
    const { storeCreator: { darkModeTheme, userInput, dispatch, userInputError, dispatchError, loading, setLoading } }: any = useContext(InputContextProvide)

    /**
     *  This Function dispatch error message
     * @param type  
     * @param payload 
     */
    function dispatchHandler(type: string, payload: string | number | any) {
        dispatchError({ type: type, payload: payload })
    }

    /**
     * This Function trigger create user account in firebase request
     */

    const handleCreateUserRequest = () => {
        setLoading(true)
        auth().
            createUserWithEmailAndPassword(userInput?.email, userInput?.password).
            then(async (userResponse: any) => {

                let userDetail = userResponse?.user?._user
                await userLogin(userDetail, userInput?.fullName).then(async (res) => {
                    await LocalStorage.setValue(LocalStorageKeys?.isSocialLogin, false);

                }).catch((err) => {
                    console.log(">>>err", err);
                })
                await LocalStorage.setValue(LocalStorageKeys?.UserId, userDetail?.uid);
                await LocalStorage.setValue(LocalStorageKeys?.IsFirstTimeLogin, true);
                navigation.reset({
                    index: 0,
                    routes: [{ name: ROUTES.TABLIST }],
                });
                dispatch({ type: type.EMPTY_STATE })
            }).
            catch((userError) => handleFirebaseError(userError?.code)).
            finally(() => setLoading(false))
    }

    /**
      *  Handle Create Account Flow to check & validation user detail
    */
    const handleCreateAccountFlow = () => {
        let isNotValidForm: boolean = false
        const { fullName, email, password, confirmPassword } = userInput
        fullName?.length <= 0 && (isNotValidForm = true, dispatchHandler(type.FULLNAME_ERROR, String.commonString.fullnameErrorMsg));
        (email?.length <= 0 || !emailPattern.test(email)) && (isNotValidForm = true, dispatchHandler(type.EMAIL_ERROR, String.commonString.PleaseProvideValidEmailMsg));
        (password?.length <= 0 || password?.length < 8) && (isNotValidForm = true, dispatchHandler(type.PASSWORD_ERROR, String.commonString.PasswordErrorMsg));
        (password !== confirmPassword) && (isNotValidForm = true, dispatchHandler(type.CONFIRM_PASSWORD_ERROR, String.commonString.ConfirmPasswordErrorMsg));
        !isNotValidForm && handleCreateUserRequest()
    }

    return (
        <>
            <SafeAreaView style={style.safeArea} />
            <StatusBar barStyle={String.StatusBar.lightContent} backgroundColor={Colors.gradient1} />
            <View style={[style.main,darkBackGround(darkModeTheme)]}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack(); dispatch({ type: type.EMPTY_STATE });
                        dispatchError({ type: type.EMPTY_STATE })
                    }}
                    style={style.headerBack}>
                    <Back />
                </TouchableOpacity>
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={String.commonString.handled}
                    style={[style.scroll,darkBackGround(darkModeTheme)]}
                    scrollEnabled={true}
                    contentContainerStyle={[style.scrollContain,darkBackGround(darkModeTheme)]}>
                    <GradientHeader />
                    {/* <LinearGradient colors={[Colors?.gradient1, Colors?.gradient2, Colors?.gradient3]} style={{ flex: 1 }}> */}
                    <View style={style.wrapperView} >
                        <View style={[style.borderRadius, { backgroundColor: Colors.white, flex: 1 },darkBackGround(darkModeTheme)]}>
                            <View style={[style.innerContainer,darkBackGround(darkModeTheme)]} >
                                <AuthHeader
                                    mainTitle={String.commonString.Createanaccount}
                                    miniTitle={String.commonString.Donthaveanaccount}
                                    actionTitle={String.commonString.SignIn}
                                    onPress={() => {
                                        navigation.goBack();
                                        dispatch({ type: type.EMPTY_STATE });
                                        dispatchError({ type: type.EMPTY_STATE })
                                    }}
                                />
                                <InputComponent
                                    inputTitle={String.commonString.Fullname}
                                    value={userInput?.fullName}
                                    onChangeText={(value) => { dispatch({ type: type.FULL_NAME, payload: value }); dispatchError({ type: type.FULLNAME_ERROR, payload: "" }) }}
                                    placeholder={String.commonString.Enterfullname}
                                    errorMessage={userInputError?.fullNameError}
                                    viewStyle={style.marginTop33}
                                />
                                <InputComponent
                                    inputTitle={String.commonString.email}
                                    placeholder={String.commonString.Enteryouremail}
                                    value={userInput?.email}
                                    keyboardType={String?.keyboardType?.email}
                                    onChangeText={(value) => {
                                        dispatch({ type: type.EMAIL, payload: value });
                                        if (value?.length > 0 && emailPattern.test(value)) {
                                            dispatchError({ type: type.EMAIL_ERROR, payload: "" })
                                        }
                                    }}
                                    errorMessage={userInputError?.emailError}
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
                                    onPrees={() => dispatch({ type: type.SHOW_PASSWORD, payload: !userInput?.showPassword })}
                                    isSecureIcon={true}
                                    isSecureEntry={userInput?.showPassword}
                                    errorMessage={userInputError?.passwordError}
                                />

                                <InputComponent
                                    placeholder={String.commonString.Enterconfirmpassword}
                                    inputTitle={String.commonString.ConfirmPassword}
                                    value={userInput?.confirmPassword}
                                    onChangeText={(value) => {
                                        dispatch({ type: type.CONFIRM_PASSWORD, payload: value });
                                        if (value?.length > 7 && value == userInput?.password) {
                                            dispatchError({ type: type.CONFIRM_PASSWORD_ERROR, payload: "" })
                                        }
                                    }}
                                    onPrees={() => dispatch({ type: type.CONFIRM_PASSWORD_SHOW, payload: !userInput?.confirmPasswordShow })}
                                    isSecureEntry={userInput?.confirmPasswordShow}
                                    isSecureIcon={true}
                                    errorMessage={userInputError?.confirmPasswordError}
                                />

                                <View style={style.signIn}>
                                    <ButtonComponent loading={loading}
                                        onPrees={() => handleCreateAccountFlow()}
                                        buttonTitle={String.commonString.SignUp} />
                                </View>
                                <ORtitle />

                                {
                                    Platform?.OS == 'android' ?

                                        <SocialMediaButton
                                            colorBackGround={colorBackGround(darkModeTheme)}
                                            wrapperStyle={{ width: '90%', }}
                                            socialMediaIcon={<Google />}
                                            buttonTitle={String.commonString.signInWithGoogle}
                                            onPress={() => { googleLogin(navigation, setLoading) }}
                                        /> :
                                        <View style={style.socialMedia}>
                                            <SocialMediaButton
                                                colorBackGround={colorBackGround(darkModeTheme)}
                                                socialMediaIcon={<Google />}
                                                buttonTitle={String.commonString.Google}
                                                onPress={() => { googleLogin(navigation, setLoading) }}
                                            />
                                            <SocialMediaButton
                                                colorBackGround={colorBackGround(darkModeTheme)}
                                                socialMediaIcon={<Apple  gery={darkModeTheme}/>}
                                                buttonTitle={String.commonString.Apple}
                                                onPress={() => appleLoginIos(navigation, setLoading)}
                                            />
                                        </View>
                                }
                            </View>
                        </View>
                    </View>
                    {/* </LinearGradient> */}
                </KeyboardAwareScrollView>
            </View>
        </>
    );
}
