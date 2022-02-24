// UTILS
import i18n from 'i18next';
// import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// TRANSLATIONS
import commonEn from 'asset/locales/en/common.json';

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // debug: false,
        fallbackLng: 'en',
        // initImmediate: false,
        compatibilityJSON: 'v3',

        defaultNS: 'common',
        resources: {
            en: {
                common: Object.assign(commonEn),
            },
        },

        supportedLngs: ['en', 'tl'],

        interpolation: {
            escapeValue: false,
        },
    });
