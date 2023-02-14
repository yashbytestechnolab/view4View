import VersionInfo from 'react-native-version-info';
import remoteConfig from '@react-native-firebase/remote-config';
import crashlytics from '@react-native-firebase/crashlytics';

const appVersion: any = VersionInfo.appVersion;

export const UpdateBuildVersion = async (updateAlert: any) => {
    crashlytics().log(" UpdateDescription config file")

    await remoteConfig().fetch(3000).then(async (res: any) => {
        let UpdateDescription = await remoteConfig().getValue("UpdateDescription").asString()
        const data: any = JSON?.parse(UpdateDescription)
        const buildVersion = data == undefined ? '1.0' : data?.build_version
        try {
            if (buildVersion != appVersion) {
                updateAlert(true);
            } else {
                updateAlert(false);
            }
        } catch (error: any) {
            console.log('err', error);
        }
    })
}

//  yarn run ios --device