import { View, SafeAreaView, TouchableOpacity, StatusBar, Platform, BackHandler } from 'react-native';
import React, { useContext, useEffect } from 'react'
import { style } from '../CreateAccount/style'
import { getNotificationToken, LocalStorageKeys, ROUTES, String } from '../../../constants';
import { AuthHeader, ORtitle } from '../Authcomponents';
import { colorBackGround, Colors, darkBackGround } from '../../../Theme';
import { Google, Apple, Back } from '../../../assets/icons';
import { InputContextProvide } from '../../../context/CommonContext';
import { type } from '../../../constants/types';
import { useNavigation } from '@react-navigation/native';
import { emailPattern } from '../../../regex/Regex';
import { appleLoginIos, googleLogin, handleFirebaseError, } from '../../../services';
import auth from '@react-native-firebase/auth';
import { referralEarning, userLogin } from '../../../services/FireStoreServices';
import { GradientHeader, ButtonComponent, InputComponent, SocialMediaButton } from '../../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as LocalStorage from '../../../services/LocalStorage';
import { Anaylitics } from '../../../constants/analytics';
import { person } from '../../View/increment';
import { useTranslation } from 'react-i18next';

export const CreateAccount = () => {
    const { t } = useTranslation()

    const navigation = useNavigation()
    /**
   * Context to give userinput data and error message
   */
    const { storeCreator: { reward: { referReward },
        darkModeTheme, userInput, dispatch, userInputError,
        dispatchError, setLoading, setIsTooltipRemaining, setIsCreateCampaginRemaining } }: any =
        useContext(InputContextProvide)

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

    const onUserInfo = async (userInfo: any) => {
        let getDeviceToken: string | any = person?.devicesPermission ? await getNotificationToken() : "";
        let device_token = (getDeviceToken == null || getDeviceToken == undefined) ? "" : getDeviceToken
        let fullname = userInput?.fullName;
        let space: number | string;
        let firstname: any = "";
        let lastname = "";
        let email = "";
        let uid = "";
        let videoUrl: any = '';
        let image: string = ''
        let watch_videos: any = []
        let device_type: string = Platform.OS
        space = fullname.indexOf(" ");
        firstname = fullname.substring(0, space);
        lastname = fullname.substring(space + 1);
        email = userInfo?.email
        uid = userInfo?.uid
        image = userInfo?.photoURL
        return { videoUrl, firstname, lastname, email, uid, image, watch_videos, device_token, device_type }
    }
    
    const handleCreateUserRequest = async () => {
        let { email } = userInput
        let loginType = "normal"
        Anaylitics("createAccount_click", { email })
        dispatchError({ type: type.EMPTY_STATE })
        setLoading(true)
        auth().
            createUserWithEmailAndPassword(userInput?.email, userInput?.password).
            then(async (userResponse: any) => {
                let userDetail = await onUserInfo(userResponse?.user?._user)
                await userLogin(userDetail).then(async (res) => {
                    userInput?.referralCode?.length > 0 && (await referralEarning(userInput?.referralCode, referReward))
                    await LocalStorage.setValue(LocalStorageKeys?.isSocialLogin, false);
                    await LocalStorage.setValue(LocalStorageKeys?.UserId, userDetail?.uid);
                    setIsTooltipRemaining(true);
                    setIsCreateCampaginRemaining(true);
                    await LocalStorage.setValue(LocalStorageKeys?.IsFirstTimeLogin, true);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: ROUTES.TABLIST }],
                    });
                    dispatch({ type: type.EMPTY_STATE })
                    Anaylitics("createaccount_success", { email, loginType })
                }).catch((err) => console.log(">>>err", err))
            }).
            catch((userError) => { Anaylitics("createaccount_failed", { email, loginType, error: userError?.code }), handleFirebaseError(userError?.code, t) }).
            finally(() => setLoading(false))
    }

    /**
      *  Handle Create Account Flow to check & validation user detail
    */
    const handleCreateAccountFlow = () => {
        let isNotValidForm: boolean = false
        const { fullName, email, password, confirmPassword } = userInput
        fullName?.trim()?.length <= 0 && (isNotValidForm = true, dispatchHandler(type.FULLNAME_ERROR, t("fullnameErrorMsg")));
        (email?.length <= 0 || !emailPattern.test(email)) && (isNotValidForm = true, dispatchHandler(type.EMAIL_ERROR, t("PleaseProvideValidEmailMsg")));
        (password?.length <= 0 || password?.length < 6) && (isNotValidForm = true, dispatchHandler(type.PASSWORD_ERROR, t("PasswordErrorMsg")));
        (password !== confirmPassword) && (isNotValidForm = true, dispatchHandler(type.CONFIRM_PASSWORD_ERROR, t("ConfirmPasswordErrorMsg")));
        !isNotValidForm && handleCreateUserRequest()
    }

    const clearStateValue = (): any => {
        dispatch({ type: type.EMPTY_STATE });
        dispatchError({ type: type.EMPTY_STATE })
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', clearStateValue);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', clearStateValue);
        };
    }, []);

    return (
        <>
            <SafeAreaView style={style.safeArea} />
            <StatusBar barStyle={String.StatusBar.lightContent} backgroundColor={Colors.gradient1} />
            <View style={[style.main, darkBackGround(darkModeTheme)]}>
                <TouchableOpacity
                    onPress={() => { navigation.goBack(); clearStateValue() }}
                    style={style.headerBack}>
                    <Back />
                </TouchableOpacity>
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={"handled"}
                    style={[style.scroll, darkBackGround(darkModeTheme)]}
                    scrollEnabled={true}
                    contentContainerStyle={[style.scrollContain, darkBackGround(darkModeTheme)]}>
                    <GradientHeader />
                    <View style={style.wrapperView} >
                        <View style={[style.borderRadius, { backgroundColor: Colors.white, flex: 1 }, darkBackGround(darkModeTheme)]}>
                            <View style={[style.innerContainer, darkBackGround(darkModeTheme)]} >
                                <AuthHeader
                                    mainTitle={t("Createanaccount")}
                                    miniTitle={t("Donthaveanaccount")}
                                    actionTitle={t("SignIn")}
                                    onPress={() => {
                                        navigation.goBack();
                                        dispatch({ type: type.EMPTY_STATE });
                                        dispatchError({ type: type.EMPTY_STATE })
                                    }}
                                />
                                <InputComponent
                                    inputTitle={t("Fullname")}
                                    value={userInput?.fullName}
                                    onChangeText={(value) => { dispatch({ type: type.FULL_NAME, payload: value }); dispatchError({ type: type.FULLNAME_ERROR, payload: "" }) }}
                                    placeholder={t("Enterfullname")}
                                    errorMessage={userInputError?.fullNameError}
                                    viewStyle={style.marginTop33}
                                />
                                <InputComponent
                                    inputTitle={t("email")}
                                    placeholder={t("Enteryouremail")}
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
                                    inputTitle={t("Password")}
                                    placeholder={t("Enteryourpassword")}
                                    value={userInput?.password}
                                    onChangeText={(value) => {
                                        dispatch({ type: type.PASSWORD, payload: value });
                                        if (value?.length > 5) {
                                            dispatchError({ type: type.PASSWORD_ERROR, payload: "" })
                                        }
                                    }}
                                    onPrees={() => dispatch({ type: type.SHOW_PASSWORD, payload: !userInput?.showPassword })}
                                    isSecureIcon={true}
                                    isSecureEntry={userInput?.showPassword}
                                    errorMessage={userInputError?.passwordError}
                                />

                                <InputComponent
                                    placeholder={t("Enterconfirmpassword")}
                                    inputTitle={t("ConfirmPassword")}
                                    value={userInput?.confirmPassword}
                                    onChangeText={(value) => {
                                        dispatch({ type: type.CONFIRM_PASSWORD, payload: value });
                                        if (value?.length > 5 && value == userInput?.password) {
                                            dispatchError({ type: type.CONFIRM_PASSWORD_ERROR, payload: "" })
                                        }
                                    }}
                                    onPrees={() => dispatch({ type: type.CONFIRM_PASSWORD_SHOW, payload: !userInput?.confirmPasswordShow })}
                                    isSecureEntry={userInput?.confirmPasswordShow}
                                    isSecureIcon={true}
                                    errorMessage={userInputError?.confirmPasswordError}
                                />
                                <InputComponent
                                    placeholder={t("ReferralCodeEnter")}
                                    inputTitle={t("ReferralCode")}
                                    value={userInput?.referralCode}
                                    onChangeText={(value) => {
                                        dispatch({ type: type.REFERRALCODE, payload: value });
                                    }}

                                />

                                <View style={style.signIn}>
                                    <ButtonComponent
                                        disable={(userInput?.fullName?.length > 0 && userInput?.email?.length > 0 && userInput?.password?.length > 0 && userInput?.confirmPassword?.length > 0) ? false : true}
                                        onPrees={() => handleCreateAccountFlow()}
                                        buttonTitle={t("SignUp")} />
                                </View>

                                <ORtitle />
                                {
                                    Platform?.OS == 'android' ?
                                        <SocialMediaButton
                                            colorBackGround={colorBackGround(darkModeTheme)}
                                            wrapperStyle={{ width: '92%', marginLeft: 16 }}
                                            socialMediaIcon={<Google />}
                                            buttonTitle={t("signInWithGoogle")}
                                            onPress={() => { googleLogin(navigation, setLoading, setIsCreateCampaginRemaining, setIsTooltipRemaining); clearStateValue() }}
                                        /> :
                                        <View style={style.socialMedia}>
                                            <SocialMediaButton
                                                colorBackGround={colorBackGround(darkModeTheme)}
                                                socialMediaIcon={<Google />}
                                                buttonTitle={t("Google")}
                                                onPress={() => { googleLogin(navigation, setLoading, setIsCreateCampaginRemaining, setIsTooltipRemaining); clearStateValue() }}
                                            />
                                            <SocialMediaButton
                                                colorBackGround={colorBackGround(darkModeTheme)}
                                                socialMediaIcon={<Apple gery={darkModeTheme} />}
                                                buttonTitle={t("Apple")}
                                                onPress={() => { clearStateValue(); appleLoginIos(navigation, setLoading, setIsCreateCampaginRemaining, setIsTooltipRemaining) }}
                                            />
                                        </View>
                                }
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </>
    );
}