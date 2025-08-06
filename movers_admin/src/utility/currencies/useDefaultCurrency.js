import { useMemo } from "react";
import { useGetCurrencies } from "api/currency";

import { useBackendLanguageCode } from "utility/language/useLanguageCode";
import { mapTranslatedProperties } from "helpers/language";

const returnValue = {
  currencyCode: "",
  defaultCurrency: null,
};

const useDefaultCurrency = () => {
  const { data } = useGetCurrencies();
  const languageCode = useBackendLanguageCode();

  return useMemo(() => {
    const currencies = data?.currencies;
    if (!Array.isArray(currencies)) {
      return returnValue;
    }
    const defaultCurrency = currencies.find((curr) => curr.is_default);
    if (!defaultCurrency) {
      return returnValue;
    }
    const currencyCode = mapTranslatedProperties(
      defaultCurrency.currency_details,
      "currency_code",
      languageCode
    );

    return { currencyCode, defaultCurrency };
  }, [data, languageCode]);
};

export default useDefaultCurrency;
