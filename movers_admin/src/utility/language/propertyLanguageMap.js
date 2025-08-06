import useLanguageSelector from "./useLanguageSelector";

const propertyLanguageMap = {
  category_name: {
    en: "category_name_en",
    "ar-SY": "category_name_ar",
  },
  subcategory_name: {
    en: "subcategory_name_en",
    "ar-SY": "subcategory_name_ar",
  },
};

export const usePropertyLanguageMap = (propertyName) => {
  const { activeLanguage } = useLanguageSelector();
  return propertyLanguageMap[propertyName][activeLanguage];
};
