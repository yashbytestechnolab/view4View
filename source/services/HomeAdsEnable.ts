import remoteConfig from '@react-native-firebase/remote-config';

export async function HomeAdsEnable() {
    return remoteConfig().fetchAndActivate().then(async (res: any) => {
        let rewardCoinAmt: object | any = remoteConfig().getValue("home_ads_enable")
        return rewardCoinAmt?._value
    }).catch((error) => error)
}   