import { Alert, Linking, Platform } from "react-native";
import * as LocalStorage from '../../source/services/LocalStorage';
import { LocalStorageKeys } from "../constants";
// import Rate, { AndroidMarket } from "react-native-rate";

export const AppRating = async (updateAlert: boolean) => {
    const countStartApp = await LocalStorage?.getValue(LocalStorageKeys?.AppActiveStatus)
    const count = countStartApp ? parseInt(countStartApp) : 1;

    console.log("updateAlert", count);
    const RateMessageBox = () => {
        return (
            Alert.alert('App Rating', 'Please give us your opinion!', [
                {
                    text: 'Later',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        // setTimeout(() => {
                          
                        //     let options = {
                        //         GooglePackageName: "com.bytes.photolia",
                        //         preferredAndroidMarket: AndroidMarket.Google,
                        //         // OtherAndroidURL:
                        //         //     'https://play.google.com/store/apps/details?id=com.bytes.photolia',
                        //         preferInApp: false,
                        //         openAppStoreIfInAppFails: true,
                        //     };
                        //     Rate.rate(options, (success, error) => {
                        //         if (error) {
                        //             if (Platform.OS === 'android') {
                        //                 Linking.openURL(
                        //                     'https://play.google.com/store/apps/details?id=com.bytes.photolia',
                        //                 );
                        //             }
                        //             console.error(error);
                        //         }
                        //     });
                        // }, 500);
                    },
                },
            ]
            ))
    }
    if (count % 3 === 0) {
        RateMessageBox()

    }
    else if (updateAlert) {
        if (count % 3 === 0) {
            RateMessageBox()

        }
    }
    await LocalStorage?.setValue(LocalStorageKeys?.AppActiveStatus, (count || 0) + 1)

}
