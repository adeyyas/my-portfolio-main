import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "deneme": "welcome and react-i18next"
    }
  },
  tr: {
    translation: {
      "deneme": "deneme metin degistirici"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "tr",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;