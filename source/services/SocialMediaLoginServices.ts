import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from '@react-native-firebase/auth';
import { userLogin } from "./FireStoreServices";
import * as LocalStorage from './LocalStorage';
import { NavigationProp } from "@react-navigation/native";
import { getNotificationToken, LocalStorageKeys, ROUTES } from "../constants";
import { config } from "../config";
import appleAuth, {
} from '@invertase/react-native-apple-authentication';
import { Alert, Platform } from "react-native";
import { Anaylitics } from "../constants/analytics";
import { person } from "../modules/View/increment";

GoogleSignin.configure({
    webClientId: config?.googlewebClientId,
    offlineAccess: true,
});

/**
 * This function  to trigger google login service 
 *
 * @param navigation 
 */



const onUserInfo = async (userInfo: any) => {
    let fullname = "";
    let space: number | string;
    let firstname: any = "";
    let lastname = "";
    let email = "";
    let uid = "";
    let videoUrl: any = '';
    let image: string = ''
    let watch_videos: any = []
    let getDeviceToken: string | any = person?.devicesPermission ? await getNotificationToken() : "";
    let device_token = (getDeviceToken == null || getDeviceToken == undefined) ? "" : getDeviceToken
    let device_type: string = Platform.OS


    if (Platform.OS === 'android') {
        fullname = userInfo?.displayName == null ? userInfo[1] : userInfo?.displayName;
        space = fullname?.indexOf(" ");
        firstname = fullname?.substring(0, space);
        lastname = fullname?.substring(space + 1);
        email = userInfo?.email
        uid = userInfo?.uid
        image = userInfo?.photoURL
        return { videoUrl, firstname, lastname, email, uid, image, watch_videos, device_token, device_type }
    } else {
        let splitEmail = userInfo?.email?.split("@");
        firstname = splitEmail[0]
        email = userInfo?.email
        uid = userInfo?.uid
        image = userInfo?.photoURL
        return { videoUrl, firstname, lastname, email, uid, image, watch_videos, device_token, device_type }
    }
}
export const googleLogin = async (navigation: NavigationProp<ReactNavigation.RootParamList>, setLoading: any, setIsCreateCampaginRemaining?:any, setIsTooltipRemaining?:any ) => {

    let loginType = "google"
    setLoading(true)
    try {
        await GoogleSignin.hasPlayServices();
        const { accessToken, idToken }: any = await GoogleSignin.signIn();
        const credential = auth.GoogleAuthProvider.credential(
            idToken,
            accessToken,
        );
        Anaylitics("google_login_click", { token: credential?.token })
        await auth()
            .signInWithCredential(credential)
            .then(async (res: any) => {
                let userDetail = await onUserInfo(res?.user?._user)
                if (res?.additionalUserInfo?.isNewUser) {
                    setIsTooltipRemaining(true);
                    setIsCreateCampaginRemaining(true);
                    userLogin(userDetail).then(() => {
                    })
                }
                await LocalStorage.setValue(LocalStorageKeys.UserId, userDetail?.uid);
                await LocalStorage.setValue(LocalStorageKeys?.IsFirstTimeLogin, true);
                await LocalStorage.setValue(LocalStorageKeys?.isSocialLogin, true);
                Anaylitics("google_login", { user_id: userDetail?.uid, })
              
                navigation.reset({
                    index: 0,
                    routes: [{ name: ROUTES.TABLIST }],
                });
                Anaylitics("google_login_sucess", { loginType, email: userDetail?.email })
                setLoading(false)
            }).catch((error: any) => { Anaylitics("google_login_error", { loginType, error: error?.message }), console.log("error", error) }).finally(() => setLoading(false))
    } catch (error) {
        setLoading(false)
        console.log("error>>>>>>>>>>", error);
    }
};

export const appleLoginIos = async (navigation: NavigationProp<ReactNavigation.RootParamList>, setLoading: any, setIsCreateCampaginRemaining?:any, setIsTooltipRemaining?:any) => {
    // create login request for apple
    let loginType = "apple"
    const appleAuthRequestResponse: any = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    const {
        identityToken,
        nonce
    } = appleAuthRequestResponse;
    if (identityToken) {
        setLoading(true)
        const appleCredential = await auth.AppleAuthProvider.credential(identityToken, nonce);
        Anaylitics("apple_login_click", { token: appleCredential?.token })
        await auth()
            .signInWithCredential(appleCredential)
            .then(async (res: any) => {
                let userDetail = await onUserInfo(res?.user?._user)
                if (res?.additionalUserInfo?.isNewUser) {
                    userLogin(userDetail)
                    setIsTooltipRemaining(true);
                    setIsCreateCampaginRemaining(true);
                }
                await LocalStorage.setValue(LocalStorageKeys?.isSocialLogin, true);
                await LocalStorage.setValue(LocalStorageKeys.UserId, userDetail?.uid);
                await LocalStorage.setValue(LocalStorageKeys?.IsFirstTimeLogin, true);
                navigation.reset({
                    index: 0,
                    routes: [{ name: ROUTES.TABLIST }],
                });
                Anaylitics("apple_login_sucess", { loginType, email: userDetail?.email })
                setLoading(false)
            }).catch((error: any) => { Anaylitics("apple_login_error", { loginType, error: error?.message }), setLoading(false) }).finally(() => setLoading(false))
    } else {
        Anaylitics("apple_login_sucess", { loginType, error: "Auth token not found" })
        Alert.alert("Unable to login with apple. Please try with other login method")
    }
};
