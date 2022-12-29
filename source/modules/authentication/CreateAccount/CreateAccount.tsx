import { View, ScrollView, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react'
import { style } from '../CreateAccount/style'
import Back from '../../../assets/icons/Back';
import { LocalStorageKeys, ROUTES, String } from '../../../constants';
import { AuthHeader, ORtitle } from '../Authcomponents';
import { InputComponent } from '../../../components/InputComponent';
import { Colors, F40014 } from '../../../Theme';
import { SocialMediaButton } from '../../../components/SocialMediaButton';
import { Google } from '../../../assets/icons/Google';
import { ButtonComponent } from '../../../components/ButtonComponent';
import { Apple } from '../../../assets/icons/Apple';
import { Logo } from '../../../assets/icons';
import { InputContextProvide } from '../../../context/CommonContext';
import { type } from '../../../constants/types';
import { useNavigation } from '@react-navigation/native';
import { emailPattern } from '../../../regex/Regex';
import { googleLogin } from '../../../services';
import auth from '@react-native-firebase/auth';
import { loginUser } from '../../../services/FireStoreServices';
import * as LocalStorage from '../../../services/LocalStorage';

export const CreateAccount = () => {
    const navigation = useNavigation()
    /**
   * Context to give userinput data and error message
   */
    const { storeCreator: { userInput, dispatch, userInputError, dispatchError, loading, setLoading } }: any = useContext(InputContextProvide)

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
                await loginUser(userDetail)
                await LocalStorage.setValue(LocalStorageKeys?.UserId, userDetail?.uid);
                await LocalStorage.setValue(LocalStorageKeys?.IsFirstTimeLogin, true);
                navigation.reset({
                    index: 0,
                    routes: [{ name: ROUTES.TABLIST }],
                });
            }).
            catch((userError) => console.log("error", userError)).
            finally(() => setLoading(false))
    }

    /**
      *  Handle Create Account Flow to check & validation user detail
    */
    const handleCreateAccountFlow = () => {
        let isNotValidForm: boolean = false
        const { fullName, email, password, confirmPassword } = userInput
        console.log("confirmPass", password !== confirmPassword);
        console.log(confirmPassword?.length <= 0 || confirmPassword?.length < 8);

        fullName?.length <= 0 && (isNotValidForm = true, dispatchHandler(type.FULLNAME_ERROR, String.commonString.fullnameErrorMsg));
        (email?.length <= 0 || !emailPattern.test(email)) && (isNotValidForm = true, dispatchHandler(type.EMAIL_ERROR, String.commonString.PleaseProvideValidEmailMsg));
        (password?.length <= 0 || password?.length < 8) && (isNotValidForm = true, dispatchHandler(type.PASSWORD_ERROR, String.commonString.PasswordErrorMsg));
        (password !== confirmPassword) && (isNotValidForm = true, dispatchHandler(type.CONFIRM_PASSWORD_ERROR, String.commonString.ConfirmPasswordErrorMsg));
        !isNotValidForm && handleCreateUserRequest()
    }

    return (
        <>
            <SafeAreaView style={style.safeArea} />
            <View style={style.main}>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={style.headerBack}>
                    <Back />
                </TouchableOpacity>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={String.commonString.handled}
                    style={style.scroll}
                    scrollEnabled={true}
                    contentContainerStyle={style.scrollContain}>

                    <View style={style.mainLogo}>
                        <Logo />
                    </View>

                    <View style={style.wrapperView} >
                        <View style={[style.container, style.borderRadius]}>
                            <View style={[style.borderRadius, { backgroundColor: Colors.white, marginTop: 20, flex: 1 }]}>
                                <View style={style.innerContainer} >
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
                                        onChangeText={(value) => { dispatch({ type: type.EMAIL, payload: value }); dispatchError({ type: type.EMAIL_ERROR, payload: "" }) }}
                                        errorMessage={userInputError?.emailError}
                                    />
                                    <InputComponent
                                        inputTitle={String.commonString.Password}
                                        placeholder={String.commonString.Enteryouremail}
                                        value={userInput?.password}
                                        onChangeText={(value) => { dispatch({ type: type.PASSWORD, payload: value }); dispatchError({ type: type.PASSWORD_ERROR, payload: "" }) }}
                                        onPrees={() => dispatch({ type: type.SHOW_PASSWORD, payload: !userInput?.showPassword })}
                                        isSecureIcon={true}
                                        isSecureEntry={userInput?.showPassword}
                                        errorMessage={userInputError?.passwordError}
                                    />

                                    <InputComponent
                                        placeholder={String.commonString.Enterconfirmpassword}
                                        inputTitle={String.commonString.ConfirmPassword}
                                        value={userInput?.confirmPassword}
                                        onChangeText={(value) => { dispatch({ type: type.CONFIRM_PASSWORD, payload: value }); dispatchError({ type: type.CONFIRM_PASSWORD_ERROR, payload: "" }) }}
                                        onPrees={() => dispatch({ type: type.CONFIRM_PASSWORD_SHOW, payload: !userInput?.confirmPasswordShow })}
                                        isSecureEntry={userInput?.confirmPasswordShow}
                                        isSecureIcon={true}
                                        errorMessage={userInputError?.confirmPasswordError}
                                    />

                                    <View style={style.forgotPassword}>
                                        <Text
                                            onPress={() => { navigation?.navigate(ROUTES?.FORGOTPASSWORD) }}
                                            style={[F40014.main, F40014.color]}>
                                            {String.commonString.ForgotPassword}
                                        </Text>
                                    </View>

                                    <View style={style.signIn}>
                                        <ButtonComponent loading={loading}
                                            onPrees={() => handleCreateAccountFlow()}
                                            buttonTitle={String.commonString.SignIn} />
                                    </View>
                                    <ORtitle />

                                    <View style={style.socialMedia}>
                                        <SocialMediaButton
                                            socialMediaIcon={<Google />}
                                            buttonTitle={String.commonString.Google}
                                            onPress={() => { googleLogin(navigation) }}
                                        />
                                        <SocialMediaButton
                                            socialMediaIcon={<Apple />}
                                            buttonTitle={String.commonString.Apple}
                                            onPress={() => { }}
                                        />
                                    </View>

                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    );
}
