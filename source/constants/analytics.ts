import auth from '@react-native-firebase/auth';
import { Platform } from "react-native";
import analytics from '@react-native-firebase/analytics';
import VersionInfo from 'react-native-version-info';
import { ENV, person } from '../modules/View/increment'
import crashlytics from "@react-native-firebase/crashlytics"

export const userInfo = () => {
    const app_Version: any = VersionInfo.appVersion;
    const userId: any = auth()?.currentUser?.uid;
    const platform = Platform.OS
    return { "user_id": userId, "platform": platform, app_Version }
}

export const Anaylitics = (eventName: string, params?: object | any | null | undefined) => {
    let body: any = {}
    const { user_id, platform } = userInfo()
    user_id?.length > 0 && (body["user_id"] = user_id)
    body["platform"] = platform
    if (params === null || params === undefined) {
        body
    }
    else {
        body = { ...body, ...params }
    }    
    person?.environment() == ENV.production ? analytics().logEvent(eventName, body) : console.log("Event Data:", eventName,body);
    crashlytics().log(eventName)
}