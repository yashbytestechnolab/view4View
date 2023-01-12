import remoteConfig from '@react-native-firebase/remote-config';
import VersionInfo from 'react-native-version-info';


export const UpdateBuildVersion = async (updateAlert: any) => {
    const getVersionNo = VersionInfo.appVersion;
    const getConfigValue: any = remoteConfig().getValue("UpdateDescription").asString()
    const data = JSON?.parse(getConfigValue)

    try {
        if (data?.build_version != getVersionNo) {
            updateAlert(true);
        } else {
            updateAlert(false);
        }
    } catch (error: any) {
        console.log('err', error);
    }
}

