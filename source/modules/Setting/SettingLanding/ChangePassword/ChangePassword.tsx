import { View, SafeAreaView } from 'react-native';
import React, { useContext, useState } from 'react';
import { ButtonComponent, Header, InputComponent } from '../../../../components';
import { InputContextProvide } from '../../../../context/CommonContext';
import { type } from '../../../../constants/types';
import { ROUTES, String } from '../../../../constants';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/firestore';
import { handleFirebaseError } from '../../../../services';
import { style } from './style';
import { darkBackGround } from '../../../../Theme';

export const ChangePassword = () => {
    const navigation = useNavigation();
    const { storeCreator: { darkModeTheme, } }: any = useContext(InputContextProvide)
    const [loading, setLoading] = useState(false)
    /**
     * Context to give userinput data and error message
     */
    const {
        storeCreator: {
            userInput,

            dispatch,
            userInputError,
            dispatchError,

        },
    }: any = useContext(InputContextProvide);

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
        let isNotValidForm: boolean = false;
        const { oldPassword, newPassword, confirmPassword }: any = userInput;
        (oldPassword?.length <= 0 || oldPassword?.length < 8) &&
            ((isNotValidForm = true),
                dispatchHandler(
                    type.OLD_PASSWORD_ERROR,
                    String.commonString.OldPasswordError,
                ));
        (newPassword?.length <= 0 || newPassword?.length < 8) &&
            ((isNotValidForm = true),
                dispatchHandler(
                    type.NEW_PASSWORD_ERROR,
                    String.commonString.NewPAsswordError,
                ));
        newPassword !== confirmPassword &&
            ((isNotValidForm = true),
                dispatchHandler(
                    type.CONFIRM_PASSWORD_ERROR,
                    String.commonString.ConfirmPasswordErrorMsg,
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
                    .then(res => {
                        setLoading(false)

                        handleFirebaseError('ForgotSucess');
                        dispatch({ type: type.EMPTY_STATE });
                        setTimeout(() => {
                            navigation?.navigate(ROUTES?.SETTING_LANDING);

                        }, 2000);
                    })
                    .catch(error => {
                        setLoading(false)
                        handleFirebaseError(error.code);
                    })
            })
            .catch(error => {
                setLoading(false)

                handleFirebaseError(error.code);
            }).finally(() => {
                setLoading(false)
            })
    };

    return (
        <>
            <SafeAreaView style={style.safeArea} />
            <View style={[style.mainWrapper, darkBackGround(darkModeTheme)]}>
                <Header
                    title={String?.headerTitle?.changePassword}
                    showCoin={false}
                    showBacKIcon={true}

                />

                <View style={[{ paddingTop: 24, }, darkBackGround(darkModeTheme)]}>

                    <InputComponent
                        placeholder={String.commonString.oldPassword}
                        inputTitle={String.commonString.oldPassword}
                        value={userInput?.oldPassword}
                        onChangeText={value => {
                            dispatch({ type: type.OLDPASSWORD, payload: value });

                            if (value?.length > 7 && value == userInput?.oldPassword) {
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
                        placeholder={String.commonString.newPassword}
                        inputTitle={String.commonString.newPassword}
                        value={userInput?.newPassword}
                        onChangeText={value => {
                            dispatch({ type: type.NEWPASSWORD, payload: value });
                            if (value?.length > 7 && value == userInput?.newPassword) {
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
                        placeholder={String.commonString.Enterconfirmpassword}
                        inputTitle={String.commonString.ConfirmPassword}
                        value={userInput?.confirmPassword}
                        onChangeText={value => {
                            dispatch({ type: type.CONFIRM_PASSWORD, payload: value });
                            if (value?.length > 7 && value == userInput?.oldPassword) {
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
                            HandleChangePassword();
                        }}
                        buttonTitle={String.commonString.submit}
                    />

                </View>
            </View>
        </>
    );
};
