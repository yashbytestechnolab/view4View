import { ROUTES } from "./NavigationRoutes"
import { Profile, More } from "../assets/icons"
import * as LocalStorage from '../services/LocalStorage';
import { LocalStorageKeys } from "./LocalStorageKeys";
import { Linking } from "react-native";
import { Platform } from "react-native";
let socilaLoginFlag: boolean | undefined | null = false

export const getSocialLoginValue = async () => {
    socilaLoginFlag = await LocalStorage.getValue(LocalStorageKeys.isSocialLogin)
    return socilaLoginFlag
}

export const settingProfileArr: any = [
    {
        name: "AccountInformation",
        isHeaderUi: true,
        isUiRender: false,
        action: "",
        pastAction: function (navigation: any) {
            return null
        },
        icon: Profile,
        isShowChangePass: () => {
            return false
        },
    },
    {
        name: "EditProfile",
        action: ROUTES?.EDITPROFILE,
        isHeaderUi: false,
        isUiRender: false,
        pastAction: function (navigation: any) {
            return navigation.navigate(ROUTES?.EDITPROFILE)
        },
        icon: "",
        isShowChangePass: () => {
            return false
        }
    },
    {
        name: "ChangePassword",
        action: ROUTES?.CHANGEPASSWORD,
        isHeaderUi: false,
        isUiRender: false,
        pastAction: function (navigation: any) {
            return navigation.navigate(ROUTES?.CHANGEPASSWORD)
        },
        icon: "",
        isShowChangePass: () => {
            return socilaLoginFlag
        }
    },
    {
        name: "DeleteAccount",
        isHeaderUi: false,
        isUiRender: false,
        pastAction: function (navigation: any, darkMode: any, deleteAccount: any | void) {
            return deleteAccount()
        },
        icon: "",
        isShowChangePass: () => {
            return false
        }
    },
    {
        name: "More",
        isHeaderUi: true,
        isUiRender: false,
        action: "",
        pastAction: function (navigation: any) {
            return
        },
        icon: More,
        isShowChangePass: () => {
            return false
        }
    },
    {
        name: "Language",
        id: "105",
        isUiRender: false,
        isHeaderUi: false,
        pastAction: function (navigation: any) {
            return navigation.navigate(ROUTES?.LANGUAGE)
        },
        icon: "",
        action: ROUTES?.LANGUAGE,
        isShowChangePass: () => {
            return false
        }
    },
    {
        name: "RateUs",
        action: "",
        isHeaderUi: false,
        isUiRender: false,
        pastAction: function (navigation: any) {
            let url = Platform.OS === "ios" ? 'https://apps.apple.com/us/app/uview-increase-youtube-views/id1658265805' : 'https://play.google.com/store/apps/details?id=com.bytes.uview'
            return Linking.openURL(url)
        },
        icon: "",
        isShowChangePass: () => {
            return false
        }
    },
    {
        name: "InviteFriends",
        action: ROUTES?.INVITEFRIEND,
        isHeaderUi: false,
        isUiRender: false,
        pastAction: function (navigation: any) {
            return navigation.navigate(ROUTES?.INVITEFRIEND)
        },
        icon: "",
        isShowChangePass: () => {
            return false
        }
    },

    {
        name: "PrivacyPolicy",
        action: "",
        isHeaderUi: false,
        isUiRender: false,
        pastAction: function (navigation: any) {
            return Linking.openURL('https://view4view-dcb01.web.app/')
        },
        icon: "",
        isShowChangePass: () => {
            return false
        }
    },
    {
        name: "DarkMode",
        id: "100",
        isUiRender: true,
        isHeaderUi: false,
        pastAction: function (navigation: any, darkMode: void | any) {
            return darkMode()
        },
        icon: "",
        action: "",
        isShowChangePass: () => {
            return false
        },
    },

]