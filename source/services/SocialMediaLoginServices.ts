import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from '@react-native-firebase/auth';
import { loginUser } from "./FireStoreServices";
import * as LocalStorage from './LocalStorage';
import { NavigationProp } from "@react-navigation/native";
import { LocalStorageKeys, ROUTES } from "../constants";
import { config } from "../config";
import appleAuth, {
} from '@invertase/react-native-apple-authentication';

GoogleSignin.configure({
    webClientId: config?.googlewebClientId,
    offlineAccess: true,
});

/**
 * This function  to trigger google login service 
 *
 * @param navigation 
 */

export const googleLogin = async (navigation: NavigationProp<ReactNavigation.RootParamList>) => {
    try {
        await GoogleSignin.hasPlayServices();
        const { accessToken, idToken }: any = await GoogleSignin.signIn();
        const credential = auth.GoogleAuthProvider.credential(
            idToken,
            accessToken,
        );
        await auth()
            .signInWithCredential(credential)
            .then(async (res: any) => {
                let userDetail = res?.user?._user
                if (res?.additionalUserInfo?.isNewUser) {
                    loginUser(userDetail).then(() => {
                        console.log("loginUser", res)
                    }).catch((err) => {
                        console.log("loginUser", err);
                    })
                }
                await LocalStorage.setValue(LocalStorageKeys.UserId, userDetail?.uid);
                navigation.reset({
                    index: 0,
                    routes: [{ name: ROUTES.TABLIST }],
                });
                await LocalStorage.setValue(LocalStorageKeys?.IsFirstTimeLogin, true);
            });
    } catch (error) {
        console.log("error", error);

    }
};

export const appleLoginIos = async (navigation: NavigationProp<ReactNavigation.RootParamList>) => {
    // create login request for apple
    const appleAuthRequestResponse: any = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    const {
        identityToken,
        nonce
    } = appleAuthRequestResponse;

    if (identityToken) {
        const appleCredential = await auth.AppleAuthProvider.credential(identityToken, nonce);
        await auth()
            .signInWithCredential(appleCredential)
            .then(async (res: any) => {
                let userDetail = res?.user?._user
                if (res?.additionalUserInfo?.isNewUser) {
                    loginUser(userDetail).then(() => {
                        console.log("loginUser", res)
                    }).catch((err) => {
                        console.log("loginUser", err);
                    })
                }
                await LocalStorage.setValue(LocalStorageKeys.UserId, userDetail?.uid);
                navigation.reset({
                    index: 0,
                    routes: [{ name: ROUTES.TABLIST }],
                });
                await LocalStorage.setValue(LocalStorageKeys?.IsFirstTimeLogin, true);
            });


    }
};
