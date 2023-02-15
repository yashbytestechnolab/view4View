import remoteConfig from '@react-native-firebase/remote-config';
import crashlytics from '@react-native-firebase/crashlytics';

export async function ReviewVersionIos() {
    crashlytics().log("review_version_ios")
    return remoteConfig().fetchAndActivate().then(async (res: any) => {
        let rewardCoinAmt: object | any = remoteConfig().getValue("review_version_ios")
        return rewardCoinAmt?._value
    }).catch((error) => error)
}   