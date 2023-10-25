import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "/locales/i18n/{{ns}}/{{lng}}.json",
    },
    //disable in production
    debug: false,
    //can have multiple namespaces , in case  you want to devide a huge
    // translation into smaller pieces  and load  them  on demand
    ns: [
      "home",
      "aboutus",
      "privacy",
      "navbar",
      "Translate",
      "userSignUp",
      "userSingIn",
    ],
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
      formatSeparator: ",",
    },
    react: {
      wait: true,
    },
  });

export default i18n;
