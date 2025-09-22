// Importē i18next bibliotēku
import i18n from 'i18next';
// Importē integrācijas moduli priekš React
import { initReactI18next } from 'react-i18next';
// Importē tulkojumu failus (angļu un latviešu)
import en from './lang/en.json';
import lv from './lang/lv.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    lv: { translation: lv }
  },
  lng: 'lv', 
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
