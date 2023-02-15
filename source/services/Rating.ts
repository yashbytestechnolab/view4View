import { Alert, Linking, Platform } from "react-native";
import * as LocalStorage from '../../source/services/LocalStorage';
import { LocalStorageKeys } from "../constants";
import Rate, { AndroidMarket } from "react-native-rate";
import { crashlyticslog } from "./crashlyticslog";
// import VersionInfo from 'react-native-version-info';

export const Rating = async () => {
    const countStartApp = await LocalStorage?.getValue(LocalStorageKeys?.AppActiveStatus)
    const count = countStartApp ? parseInt(countStartApp) : 1;
    // const appVersion: any = VersionInfo.appVersion;
    const RateMessageBox = () => {
        let options = {
            AppleAppID: "1658265805",
            GooglePackageName: "com.bytes.uview",
            preferredAndroidMarket: AndroidMarket.Google,
            preferInApp: true,
            openAppStoreIfInAppFails: false,
        };
        try {
            Rate.rate(options, async (success, error) => {
                if (success) {
                    return
                }
                if (error) {
                    if (Platform.OS === 'android') {
                        Linking.openURL(
                            'https://play.google.com/store/apps/details?id=com.bytes.uview',
                        );
                    }
                    console.error(error);
                }
            });
        } catch (error:any) {
            crashlyticslog("Rating_popup")
            Alert.alert(error?.message);
        }
    }
    // let previousBuildVersion = await LocalStorage?.getValue(LocalStorageKeys?.previousBuildVersion)
    if (count % 3 == 0 || count == 3) {
        RateMessageBox()
    }
    await LocalStorage?.setValue(LocalStorageKeys?.AppActiveStatus, (count || 0) + 1)
}
