import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from '@react-native-firebase/auth';
import { userLogin } from "./FireStoreServices";
import * as LocalStorage from './LocalStorage';
import { NavigationProp } from "@react-navigation/native";
import { LocalStorageKeys, ROUTES } from "../constants";
import { config } from "../config";
import appleAuth, {
} from '@invertase/react-native-apple-authentication';
import { Platform } from "react-native";

GoogleSignin.configure({
    webClientId: config?.googlewebClientId,
    offlineAccess: true,
});

/**
 * This function  to trigger google login service 
 *
 * @param navigation 
 */



 const onUserInfo = (userInfo: any) => {
    let fullname = "";
    let space: number | string;
    let firstname: any = "";
    let lastname = "";
    let email = "";
    let uid = "";
    let videoUrl: any = '';
    let image: string = ''
    let watch_videos: any = []



    if (Platform.OS === 'android') {
        fullname = userInfo?.displayName == null ? userInfo[1] : userInfo?.displayName;
        space = fullname.indexOf(" ");
        firstname = fullname.substring(0, space);
        lastname = fullname.substring(space + 1);
        email = userInfo?.email
        uid = userInfo?.uid
        image = userInfo?.photoURL
        console?.log("userLoginuserLogin", videoUrl, firstname, lastname, email, uid, image, watch_videos)
        return { videoUrl, firstname, lastname, email, uid, image, watch_videos }
    } else {
        let splitEmail = userInfo?.email.split("@");
        firstname = splitEmail[0]
        email = userInfo?.email
        uid = userInfo?.uid
        image = userInfo?.photoURL
        return { videoUrl, firstname, lastname, email, uid, image, watch_videos }
    }
}

export const googleLogin = async (navigation: NavigationProp<ReactNavigation.RootParamList>, setLoading: any) => {
    setLoading(true)
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
                console.log("res", res)
                let userDetail = onUserInfo(res?.user?._user)

                if (res?.additionalUserInfo?.isNewUser) {
                    userLogin(userDetail).then(() => {
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
                await LocalStorage.setValue(LocalStorageKeys?.isSocialLogin, true);
                setLoading(false)
            }).finally(() => setLoading(false))
    } catch (error) {
        setLoading(false)
        console.log("error", error);
    }
};

export const appleLoginIos = async (navigation: NavigationProp<ReactNavigation.RootParamList>, setLoading: any) => {
    // create login request for apple
    setLoading(true)
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

                let userDetail = onUserInfo(res?.user?._user)
                if (res?.additionalUserInfo?.isNewUser) {
                    userLogin(userDetail).then(() => {
                        console.log("loginUser", res)

                    }).catch((err) => {
                        console.log("loginUser", err);
                    })
                }
                await LocalStorage.setValue(LocalStorageKeys?.isSocialLogin, true);

                await LocalStorage.setValue(LocalStorageKeys.UserId, userDetail?.uid);
                navigation.reset({
                    index: 0,
                    routes: [{ name: ROUTES.TABLIST }],
                });
                await LocalStorage.setValue(LocalStorageKeys?.IsFirstTimeLogin, true);
                setLoading(false)
            }).catch(() => setLoading(false)).finally(() => setLoading(false))
    }
};
