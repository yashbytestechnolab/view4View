import remoteConfig from '@react-native-firebase/remote-config';
import VersionInfo from 'react-native-version-info';

export const UpdateBuildVersion = async (updateAlert: any) => {
    const getVersionNo = VersionInfo.appVersion;
    remoteConfig()
        .setDefaults({
            awesome_new_feature: '1.0',
        })
        .then(() => remoteConfig().fetchAndActivate())
        .then(fetchedRemotely => {
            if (fetchedRemotely) {
                console.log('Configs were retrieved from the backend and activated.');
            } else {
                console.log(
                    'No configs were fetched from the backend, and the local configs were already activated',
                );
            }
        })
        const getConfigValue: any = remoteConfig().getValue("UpdateDescription");
        const description = JSON.parse(JSON.stringify(getConfigValue?._value))
        const data = JSON?.parse(description)
    console.log("data", data?.build_version,)
    try {
        if (data?.build_version > getVersionNo) {
            updateAlert(true);
        } else {
            updateAlert(false);
        }
    } catch (error: any) {
        console.log('err', error);
    }
}

