import VersionInfo from 'react-native-version-info';
import remoteConfig from '@react-native-firebase/remote-config';
import crashlytics from '@react-native-firebase/crashlytics';
import { Platform } from 'react-native';

const appVersion: any = VersionInfo.appVersion;

export const UpdateBuildVersion = async (updateAlert: any) => {
    crashlytics().log(" UpdateDescription config file")
    await remoteConfig().fetch(3000).then(async (res: any) => {
        let UpdateDescription = await remoteConfig().getValue("UpdateDescription").asString()
        const data: any = JSON?.parse(UpdateDescription)
        const buildVersion = data == undefined ? '1.0' : data?.android_build_version
        const iosBuildVersion = data == undefined ? '1.0' : data?.ios_build_version
        try {
            if ((Platform.OS == 'android' && Number(buildVersion) > Number(appVersion)) || (Platform.OS == 'ios' && Number(iosBuildVersion) > Number(appVersion))) {
                updateAlert(true);
            } else {
                updateAlert(false);
            }
        } catch (error: any) {
            console.log('err', error);
        }
    })
}



































// export const UpdateBuildVersion = async (updateAlert: any) => {


//     await remoteConfig().setConfigSettings({
//         minimumFetchIntervalMillis: 30000,
//     });

//     await remoteConfig()
//         .setDefaults({ build_version: appVersion, })
//         .then(() => remoteConfig().fetchAndActivate())
//         .then(() => {
//             const getConfigValue: any = remoteConfig().getValue("UpdateDescription").asString()
//             const data: any = JSON?.parse(getConfigValue)
//             const buildVersion = data == undefined ? '1.0' : data?.build_version
//             try {
//                 if (buildVersion != appVersion) {
//                     updateAlert(true);
//                 } else {
//                     updateAlert(false);
//                 }
//             } catch (error: any) {
//                 console.log('err', error);
//             }
//         }).catch((error) => {
//             console.log("error", error?.message);

//         }).catch((error) => {
//             console.log("error22", error?.message);

//         })
// }
