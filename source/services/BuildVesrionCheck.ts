import remoteConfig from '@react-native-firebase/remote-config';
export async function getBuildVersionData() {
    return remoteConfig().fetch().then(async (res: any) => {
        let UpdateDescription = await remoteConfig().getValue("UpdateDescription").asString()
        return JSON.parse(UpdateDescription)
    })
}
