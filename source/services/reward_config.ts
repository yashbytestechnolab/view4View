import remoteConfig from '@react-native-firebase/remote-config';
import crashlytics from '@react-native-firebase/crashlytics';

export async function rewardConfig() {
    crashlytics().log(" reward_coins config file")
    return remoteConfig().fetch(3000).then(async (res: any) => {
        let rewardCoinAmt = remoteConfig().getValue("reward_coins").asString()
        return await JSON.parse(rewardCoinAmt)
    })
}
export const rewardCoinsDefaultValue:any ={ referReward: 300, adsReward: 100 }