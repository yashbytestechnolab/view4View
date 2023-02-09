import remoteConfig from '@react-native-firebase/remote-config';
export async function rewardConfig() {
    return remoteConfig().fetch(3000).then(async (res: any) => {
        let rewardCoinAmt = await remoteConfig().getValue("reward_coins").asString()
        return JSON.parse(rewardCoinAmt)
    })
}
export const rewardCoinsDefaultValue:any ={ referReward: 300, adsReward: 100 }
