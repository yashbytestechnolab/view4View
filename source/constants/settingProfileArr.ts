import ToggleSwitch from "toggle-switch-react-native"
import { ROUTES } from "./NavigationRoutes"
import { String } from "./string"
import { Profile, More } from "../assets/icons"

export const settingProfileArr: any = [
    {
        name: String?.settingScreen?.AccountInformation,
        isHeaderUi: true,
        icon: Profile
    },
    {
        name: String?.settingScreen?.EditProfile,
        action: ROUTES?.EDITPROFILE
    },

    {
        name: String?.settingScreen?.ChangePassword,
        action: ROUTES?.CHANGEPASSWORD
    },
    {
        name: String?.settingScreen?.More,
        isHeaderUi: true,
        icon: More
    },
    {
        name: String?.settingScreen?.RateUs,
        action: ""
    },
    {
        name: String?.settingScreen?.InviteFriends,
        action: ROUTES?.INVITEFRIEND
    },

    {
        name: String?.settingScreen?.PrivacyPolicy,
        action: ""
    },
    {
        name: String?.settingScreen?.DarkMode,
        isUiRender: true,
    }
]