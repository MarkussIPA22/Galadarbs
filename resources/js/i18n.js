import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './lang/en.json';
import lv from './lang/lv.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    lv: { translation: lv }
  },
  lng: 'lv', // default language
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
