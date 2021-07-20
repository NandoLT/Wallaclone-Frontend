import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en'
import es from './es'


const translations = i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            es: { translation: es }
        },
        lng: "es",
        fallbackLng: "es",
        interpolation: { escapeValue: false }
    });


export default i18n;