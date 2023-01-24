import remoteConfig from '@react-native-firebase/remote-config';
export async function rewardConfig() {
    return remoteConfig().fetch(3000).then(async (res: any) => {
        let rewardCoinAmt = remoteConfig().getValue("reward_coins").asString()
        return await JSON.parse(rewardCoinAmt)
    })
}