import remoteConfig from '@react-native-firebase/remote-config';

export const getBuildVersionData = async () => {
    await remoteConfig()?.fetchAndActivate()

    let data: any = remoteConfig().getValue("UpdateDescription")
    return JSON.parse(data?._value);

}



// await remoteConfig()
// .setDefaults({
//     UpdateDescription: {
//         build_version: "1.0",
//         title: "Update the app",
//         subTtile: "Please update to continue using the app",
//         Upadte: {
//             "android": "https://play.google.com/store/apps/details?id=com.bytes.photolia",
//             "ios": "https://apps.apple.com/in/app/id6443736018"
//         }
//     },
// })
// .then(() => remoteConfig().fetchAndActivate())
// .then(fetchedRemotely => {
//     if (fetchedRemotely) {
//         const data: any = remoteConfig().getValue("UpdateDescription").asString()
//         return JSON.parse(data?._value)

//     }
// });