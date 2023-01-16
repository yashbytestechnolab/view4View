import ToggleSwitch from "toggle-switch-react-native"
import { ROUTES } from "./NavigationRoutes"
import { String } from "./string"
import { Profile, More } from "../assets/icons"
import * as LocalStorage from '../services/LocalStorage';
import { LocalStorageKeys } from "./LocalStorageKeys";
let socilaLoginFlag: boolean | undefined | null = false
export const getSocialLoginValue = async () => {
    socilaLoginFlag = await LocalStorage.getValue(LocalStorageKeys.isSocialLogin)
    console.log("socilaLoginFlag", socilaLoginFlag);

    return socilaLoginFlag
}

export const settingProfileArr: any = [
    {
        name: String?.settingScreen?.AccountInformation,
        isHeaderUi: true,
        icon: Profile,
        isShowChangePass: () => {
            return false
        }
    },
    {
        name: String?.settingScreen?.EditProfile,
        action: ROUTES?.EDITPROFILE,
        isShowChangePass: () => {
            return false
        }
    },

    {
        name: String?.settingScreen?.ChangePassword,
        action: ROUTES?.CHANGEPASSWORD,
        isShowChangePass: () => {
            return socilaLoginFlag
        }
    },
    {
        name: String?.settingScreen?.More,
        isHeaderUi: true,
        icon: More,
        isShowChangePass: () => {
            return false
        }
    },
    {
        name: String?.settingScreen?.RateUs,
        action: "",
        isShowChangePass: () => {
            return false
        }
    },
    {
        name: String?.settingScreen?.InviteFriends,
        action: ROUTES?.INVITEFRIEND,
        isShowChangePass: () => {
            return false
        }
    },

    {
        name: String?.settingScreen?.PrivacyPolicy,
        action: "",
        isShowChangePass: () => {
            return false
        }
    },
    {
        name: String?.settingScreen?.DarkMode,
        isUiRender: true,
        isShowChangePass: () => {
            return false
        }
    }
]