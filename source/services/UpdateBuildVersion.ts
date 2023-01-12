import remoteConfig from '@react-native-firebase/remote-config';
import VersionInfo from 'react-native-version-info';
import makeRemoteConfig from "@react-native-firebase/remote-config";


export const UpdateBuildVersion = async (updateAlert: any) => {
    const getVersionNo = VersionInfo.appVersion;
    const remoteConfig: any = makeRemoteConfig();
    remoteConfig
        .setDefaults({
            someValue: {}
        })
        .then(() => remoteConfig.fetchAndActivate())
        .then(() => {
            const getConfigValue: any = remoteConfig.getValue("UpdateDescription").asString()
            const data = JSON?.parse(getConfigValue)
            console.log("data",data,)
            try {
                if (data?.build_version != getVersionNo) {
                    updateAlert(true);
                } else {
                    updateAlert(false);
                }
            } catch (error: any) {
                console.log('err', error);
            }
        })
        .catch((error: any) => console.error(error));
}

