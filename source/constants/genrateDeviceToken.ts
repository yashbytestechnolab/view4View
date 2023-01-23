import * as LocalStorage from './../services/LocalStorage';
import messaging from '@react-native-firebase/messaging';
import { LocalStorageKeys } from './LocalStorageKeys';
export const getNotificationToken = async () => {
    let Ntoken: string | null | undefined | any = await messaging()?.getToken();    
    await LocalStorage.setValue(LocalStorageKeys.notificationToken, Ntoken)
    return Ntoken
}
