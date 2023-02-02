import { Linking, Platform } from "react-native";
import * as LocalStorage from '../../source/services/LocalStorage';
import { LocalStorageKeys } from "../constants";
import Rate, { AndroidMarket } from "react-native-rate";
import VersionInfo from 'react-native-version-info';

export const Rating = async () => {
    const countStartApp = await LocalStorage?.getValue(LocalStorageKeys?.AppActiveStatus)
    const count = countStartApp ? parseInt(countStartApp) : 1;
    const appVersion: any = VersionInfo.appVersion;
    const RateMessageBox = async () => {
        let options = {
            AppleAppID: "1658265805",
            GooglePackageName: "com.bytes.view4View",
            preferredAndroidMarket: AndroidMarket.Google,
            preferInApp: true,
            openAppStoreIfInAppFails: false,
        };
        Rate.rate(options, async (success, error) => {
            if (success) { await LocalStorage?.setValue(LocalStorageKeys?.previousBuildVersion, appVersion) }
            if (error) {
                if (Platform.OS === 'android') {
                    Linking.openURL(
                        'https://play.google.com/store/apps/details?id=com.bytes.photolia',
                    );
                }
                console.error(error);
            }
        });
    }

    let previousBuildVersion = await LocalStorage?.getValue(LocalStorageKeys?.previousBuildVersion)
    if (appVersion != previousBuildVersion && count % 3 == 0) {
        await RateMessageBox()
    }
    await LocalStorage?.setValue(LocalStorageKeys?.AppActiveStatus, (count || 0) + 1)
}
