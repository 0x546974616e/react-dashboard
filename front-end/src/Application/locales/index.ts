import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import enGbTranslations from "./en-GB/translation.json";
import frFrTranslations from "./fr-FR/translation.json";

export const t = i18next.t;

export const Language = {
  French: {
    id: "fr-FR",
    set() {
      i18next.changeLanguage(this.id);
    },
  },
  English: {
    id: "en-GB",
    set() {
      i18next.changeLanguage(this.id);
    },
  },
};

export function initI18n() {
  i18next.use(initReactI18next).init({
    // Language to use.
    lng: Language.French.id,

    // Language to use if translations in user language are not available.
    fallbackLng: Language.French.id,

    // Translations per language.
    resources: {
      [Language.French.id]: { translation: frFrTranslations },
      [Language.English.id]: { translation: enGbTranslations },
    },
  });
}
