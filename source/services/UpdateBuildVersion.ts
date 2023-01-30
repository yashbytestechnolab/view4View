import VersionInfo from 'react-native-version-info';
import remoteConfig from '@react-native-firebase/remote-config';
const appVersion: any = VersionInfo.appVersion;
const defaultValue = {
    build_version: appVersion,
    title: "Update the app",
    subTtile: "Please update to continue using the app",
    Update: "https://play.google.com/store/apps/details?id=com.bytes.photolia"
}
export const UpdateBuildVersion = async (updateAlert: any) => {
    

    await remoteConfig().setConfigSettings({
        minimumFetchIntervalMillis: 30000,
    });

    await remoteConfig()
        .setDefaults(defaultValue)
        .then(() => remoteConfig().fetchAndActivate())
        .then(() => {
            const getConfigValue: any = remoteConfig().getValue("UpdateDescription").asString()
            const data: any = JSON?.parse(getConfigValue)
            try {
                if (data?.build_version != appVersion) {
                    updateAlert(true);
                } else {
                    updateAlert(false);
                }
            } catch (error: any) {
                console.log('err', error);
            }
        }).catch((error) => {
            console.log("error", error?.message);

        }).catch((error) => {
            console.log("error22", error?.message);

        })
}

