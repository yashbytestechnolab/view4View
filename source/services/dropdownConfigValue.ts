import remoteConfig from '@react-native-firebase/remote-config';

export const dropdownConfigValue = async () => {
    return remoteConfig().fetchAndActivate().then(async (res: any) => {
        let data1: any = remoteConfig().getValue("campaign_dropdown_value")
        return JSON.parse(data1?._value)
    })
}