import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import pt from './pt/pt.json';
import es from './es/es.json';

const resources = { es: {translation: es}, pt: {translation: pt} };
const {languageTag} = getLocales()[0];
i18n.use(initReactI18next).init({
    compatibilityJSON: "v4",
    lng: languageTag.startsWith("pt") ? "pt" : "es",
    resources,
    fallbackLng: "es",
    interpolation: {escapeValue: false},
});
export default i18n;