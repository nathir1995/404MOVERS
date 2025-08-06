import messages_en from "assets/data/locales/en.json";
// import messages_ar from "assets/data/locales/ar-SY.json";

export const menu_messages = {
  en: messages_en,
  // "ar-SY": messages_ar,
};

const languageConfig = {
  en: {
    name: "English",
    dir: "ltr",
    countryCode: "us",
    backendCode: 1,
    headerCode: "en",
  },
  // "ar-SY": {
  //   name: "العربية",
  //   dir: "rtl",
  //   countryCode: "ae",
  //   backendCode: 2,
  //   headerCode: "ar",
  // },
};

export default languageConfig;
