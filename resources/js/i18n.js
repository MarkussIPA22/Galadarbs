import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./lang/en.json";
import lv from "./lang/lv.json";

const savedLang = localStorage.getItem("language") || "lv";

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        lv: { translation: lv },
    },
    lng: savedLang,
    fallbackLng: "en",
});

i18n.on("languageChanged", (lang) => {
    localStorage.setItem("language", lang);
});

export default i18n;
