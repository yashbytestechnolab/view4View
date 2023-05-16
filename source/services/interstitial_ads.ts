import remoteConfig from '@react-native-firebase/remote-config';
import crashlytics from '@react-native-firebase/crashlytics';

export async function interstitial_ads() {
    crashlytics().log("reward_coins config file interstitial_ads")
    return remoteConfig().fetch(3000).then(async (res: any) => {
        let rewardCoinAmt = remoteConfig().getValue("interstitial_ads").asBoolean()
        return rewardCoinAmt
    })
}
