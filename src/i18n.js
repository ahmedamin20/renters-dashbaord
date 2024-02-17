import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import arData from "./locale/Ar.json";
import enData from "./locale/En.json";
import frData from "./locale/Fr.json";
import { useSidebarContext } from "./pages/global/sidebar/sidebarContext";

const resources = {
  en: {
    translation: enData,
  },
  ar: {
    translation: arData,
  },
  fr: {
    translation: frData,
  },
};

const langFromLocalStorage = localStorage.getItem("lang") || "fr";

i18n.use(initReactI18next).init({
  resources,
  lng: langFromLocalStorage,
  interpolation: {
    escapeValue: false,
  },
  rtl: langFromLocalStorage === "ar",
});

export default i18n;
