import remoteConfig from '@react-native-firebase/remote-config';

export const AdsCount = async () => {
    return remoteConfig().fetchAndActivate().then(async (res: any) => {
        let ads: any = remoteConfig().getValue("ads_count")
        return JSON.parse(ads?._value)
    })
}