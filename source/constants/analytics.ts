import { firebase } from "@react-native-firebase/auth"
import auth from '@react-native-firebase/auth';
import { Platform } from "react-native";
import analytics from '@react-native-firebase/analytics';

export const userInfo = () => {
    const userId = auth()?.currentUser?.uid;
    const deviceName = Platform.OS
    return { "user_id": userId, "device_type": deviceName }
}

export const Anaylitics = (eventName: string, params: object | any | null | undefined) => {
    let body: any = {}
    const { user_id, device_type } = userInfo()
    body["user_id"] = user_id
    body["device_type"] = device_type
    if (params === null || params === undefined) {
        body
    }
    else {
        body = { ...body, ...params }
    }    
    analytics().logEvent(eventName, body)
}