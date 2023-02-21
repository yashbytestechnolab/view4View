import remoteConfig from '@react-native-firebase/remote-config';

export async function StickyTextEnable() {
    return remoteConfig().fetchAndActivate().then(async (res: any) => {
        let stickeyText: object | any = remoteConfig().getValue("campaign_stickey_text")
        return await JSON.parse(stickeyText?._value)
    }).catch((error) => error)
}   