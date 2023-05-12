import { View, SafeAreaView, BackHandler } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { ButtonComponent, Header, InputComponent } from '../../../../components';
import { InputContextProvide } from '../../../../context/CommonContext';
import { type } from '../../../../constants/types';
import { ROUTES, String } from '../../../../constants';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/firestore';
import { handleFirebaseError } from '../../../../services';
import { style } from './style';
import { darkBackGround } from '../../../../Theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';

export const ChangePassword = () => {
    const navigation = useNavigation();
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    /**
     * Context to give userinput data and error message
     */
    const { storeCreator: { darkModeTheme, userInput, dispatch, userInputError, dispatchError, }, }: any = useContext(InputContextProvide);

    /**
     *  This Function dispatch error message
     * @param type
     * @param payload
     */
    function dispatchHandler(type: string, payload: string | number | any) {
        dispatchError({ type: type, payload: payload });
    }

    /**
     * This Function trigger create user account in firebase request
     */
    const HandleChangePassword = () => {

        dispatchError({ type: type.EMPTY_STATE })
        let isNotValidForm: boolean = false;

        const { oldPassword, newPassword, confirmPassword }: any = userInput;
        (oldPassword?.length <= 0 || oldPassword?.length < 6) &&
            ((isNotValidForm = true),
                dispatchHandler(
                    type.OLD_PASSWORD_ERROR,
                    t("OldPasswordError"),
                ));
        (newPassword?.length <= 0 || newPassword?.length < 6) &&
            ((isNotValidForm = true),
                dispatchHandler(
                    type.NEW_PASSWORD_ERROR,
                    t("NewPAsswordError"),
                ));
        newPassword !== confirmPassword &&
            ((isNotValidForm = true),
                dispatchHandler(
                    type.CONFIRM_PASSWORD_ERROR,
                    t("ConfirmPasswordErrorMsg"),
                ));
        !isNotValidForm &&
            ChangePassword(userInput?.oldPassword, userInput?.newPassword);
    };


    const Reauthenticate = (currentPassword: any) => {
        let user: any = firebase.auth().currentUser;
        let cred = firebase.auth.EmailAuthProvider.credential(
            user?._user.email,
            currentPassword,
        );
        return user.reauthenticateWithCredential(cred);

    };

    const ChangePassword = (currentPassword: any, newPassword: any) => {
        setLoading(true)
        Reauthenticate(currentPassword)
            .then((res: any) => {
                setLoading(false)
                let user: any = firebase.auth().currentUser;
                user.updatePassword(newPassword)
                    .then((res: any) => {
                        setLoading(false)
                        handleFirebaseError('ChangePasswordSuccess', t);
                        dispatch({ type: type.EMPTY_STATE });
                        setTimeout(() => {
                            navigation?.navigate(ROUTES?.SETTING_LANDING);

                        }, 2000);
                    })
                    .catch(error => {
                        setLoading(false)
                        handleFirebaseError(error.code, t);
                    })
            })
            .catch(error => {
                setLoading(false)
                console.log("error.codeerror.code", error.code);

                handleFirebaseError(error.code, t);
            }).finally(() => {
                setLoading(false)
            })
    };
    const handleBackButtonClick = () => {
        navigation.goBack();
        dispatch({ type: type.EMPTY_STATE });
        dispatchError({ type: type.EMPTY_STATE })
        return true;
    }
    useEffect(() => {
        //handleDisableButton()
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

    return (
        <>
            <SafeAreaView style={style.safeArea} />
            <View style={[style.mainWrapper, darkBackGround(darkModeTheme)]}>
                <Header
                    title={t("changePassword")}
                    showCoin={false}
                    showBacKIcon={true}
                    onPrees={() => {
                        dispatch({ type: type.EMPTY_STATE });
                        dispatchError({ type: type.EMPTY_STATE })
                        navigation?.goBack()
                    }}

                />
                <KeyboardAwareScrollView
                    alwaysBounceVertical={false}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={String.commonString.handled}
                    style={[style.scroll, darkBackGround(darkModeTheme)]}
                    scrollEnabled={true}
                    contentContainerStyle={[style.scrollContain, darkBackGround(darkModeTheme)]}>
                    <InputComponent
                        placeholder={t("enterOldPwd")}
                        inputTitle={t("oldPassword")}
                        value={userInput?.oldPassword}
                        onChangeText={value => {
                            dispatch({ type: type.OLDPASSWORD, payload: value });
                            if (userInput?.oldPassword?.length > 0 && userInput?.newPassword?.length > 0 && userInput?.confirmPassword?.length > 0) {
                            }
                            if (value?.length > 5 && value == userInput?.oldPassword) {
                                dispatchError({ type: type.OLD_PASSWORD_ERROR, payload: '' });
                            }
                            dispatchError({ type: type.OLD_PASSWORD_ERROR, payload: '' });

                        }}
                        onPrees={() =>
                            dispatch({
                                type: type.OLD_PASSWORD_SHOW,
                                payload: !userInput?.oldPassword_show,
                            })
                        }
                        isSecureEntry={userInput?.oldPassword_show}
                        isSecureIcon={true}
                        errorMessage={userInputError?.oldPasswoedError}
                    />
                    <InputComponent
                        placeholder={t("enterNewPwd")}
                        inputTitle={t("newPassword")}
                        value={userInput?.newPassword}
                        onChangeText={value => {
                            if (userInput?.oldPassword?.length > 0 && userInput?.newPassword?.length > 0 && userInput?.confirmPassword?.length > 0) {
                            }
                            dispatch({ type: type.NEWPASSWORD, payload: value });
                            if (value?.length > 5 && value == userInput?.newPassword) {
                                dispatchError({ type: type.NEW_PASSWORD_ERROR, payload: '' });
                            }
                            dispatchError({ type: type.NEW_PASSWORD_ERROR, payload: '' });

                        }}
                        onPrees={() =>
                            dispatch({
                                type: type.NEWPASSWORD_SHOW,
                                payload: !userInput?.newPassword_show,
                            })
                        }
                        isSecureEntry={userInput?.newPassword_show}
                        isSecureIcon={true}
                        errorMessage={userInputError?.newPasswordError}
                    />
                    <InputComponent
                        placeholder={t("Enterconfirmpassword")}
                        inputTitle={t("ConfirmPassword")}
                        value={userInput?.confirmPassword}
                        onChangeText={value => {
                            if (userInput?.oldPassword?.length > 0 && userInput?.newPassword?.length > 0 && userInput?.confirmPassword?.length > 0) {
                            }
                            dispatch({ type: type.CONFIRM_PASSWORD, payload: value });
                            if (value?.length > 5 && value == userInput?.oldPassword) {
                                dispatchError({
                                    type: type.CONFIRM_PASSWORD_ERROR,
                                    payload: '',
                                });
                            }
                            dispatchError({
                                type: type.CONFIRM_PASSWORD_ERROR,
                                payload: '',
                            });
                        }}
                        onPrees={() =>
                            dispatch({
                                type: type.CONFIRM_PASSWORD_SHOW,
                                payload: !userInput?.confirmPasswordShow,
                            })
                        }
                        isSecureEntry={userInput?.confirmPasswordShow}
                        isSecureIcon={true}
                        errorMessage={userInputError?.confirmPasswordError}
                    />
                    <ButtonComponent
                        loading={loading}
                        wrapperStyle={{ marginTop: 30 }}
                        onPrees={() => {
                            HandleChangePassword()
                        }}
                        disable={(userInput?.oldPassword?.length > 0 && userInput?.newPassword?.length > 0 && userInput?.confirmPassword?.length > 0) ? false : true}
                        buttonTitle={t("submit")}
                    />
                </KeyboardAwareScrollView>
            </View>
        </>
    );
};
