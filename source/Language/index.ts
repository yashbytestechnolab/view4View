import i18n from 'i18next';
import { NativeModules, Platform } from 'react-native';
import { initReactI18next } from "react-i18next"
import { en } from './english';
import { po } from './portuguese';
import { indonesian } from './Indonesian';
import { spanish } from './spanish';
import { russia } from './russia';
import { turkish } from './turkish';
import { vietnam } from './vietnam';

export const locale =
    Platform.OS === "ios"
        ? NativeModules.SettingsManager.settings.AppleLocale
        : NativeModules.I18nManager.localeIdentifier;

const i18nLan = i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    // lng: "in",
    supportedLngs: ['en', 'po', 'es', 'in', 'tr', 'ru', 'vn'],
    resources: {
        en: en,
        po: po,
        es: spanish,
        in: indonesian,
        tr: turkish,
        ru: russia,
        vn: vietnam
    },
    react: { useSuspense: false },
    fallbackLng: ['en', 'po', 'es', 'in', 'tr', 'ru', 'vn'],
})
