import React from "react";
import { useGetCountries } from "api/countries";

const useCountryOptions = () => {
  const { data } = useGetCountries();

  return React.useMemo(() => {
    let options = [];
    if (data && Array.isArray(data)) {
      options = data.map(({ id, full_name, iso_3166_3 }) => ({
        value: id,
        label: `${full_name} (${iso_3166_3})`,
      }));
    }
    return options;
  }, [data]);
};

export default useCountryOptions;
