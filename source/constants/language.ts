import { LocalStorageKeys } from './LocalStorageKeys';
import * as LocalStorage from '../services/LocalStorage';

export let onPress = async (
    changeLanguage: any,
    params: any,
    updateLanguage: any | void,
) => {
    await LocalStorage.setValue(LocalStorageKeys.language, params);
    updateLanguage();
    changeLanguage(params);
};

export const languagesArray = [
    {
        id: 1,
        languagesKey: 'en',
        name: 'English',
        onPress,
        selected: false,
    },
    {
        id: 2,
        name: 'Española',
        languagesKey: 'es',
        onPress,
        selected: false,
    },
    {
        id: 3,
        name: 'português',
        languagesKey: 'po',
        onPress,
        selected: false,
    },
    {
        id: 4,
        name: 'Türkçe',
        languagesKey: 'tr',
        onPress,
        selected: false,
    },
    {
        id: 5,
        name: 'Tiếng Việt',
        languagesKey: 'vn',
        onPress,
        selected: false,
    },
    {
        id: 6,
        name: 'Русский',
        languagesKey: 'ru',
        onPress,
        selected: false,
    },
    {
        id: 7,
        name: 'bahasa Indonesia',
        languagesKey: 'in',
        onPress,
        selected: false,
    },
];
