import { baseURL as _baseURL } from "api/config";
import axios from "axios";
import { useAuth } from "store/auth/useAuth";
// import useLanguageSelector from "utility/language/useLanguageSelector";
// import languageConfig from "configs/languageConfig";

export const useAxios = (baseURL = _baseURL) => {
  const { isAuthenticated, token } = useAuth();
  // const { activeLanguage } = useLanguageSelector();
  // const languageCode = languageConfig[activeLanguage].headerCode;

  if (isAuthenticated) {
    return axios.create({
      headers: {
        // language: languageCode,
        Authorization: `Bearer ${token}`,
      },
      baseURL,
    });
  }

  return axios.create({
    headers: {
      // language: languageCode,
    },
    baseURL,
  });
};
