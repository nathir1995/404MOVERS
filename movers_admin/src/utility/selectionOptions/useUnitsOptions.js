import React from "react";
import { useGetUnits } from "api/units";

const useUnitsOptions = ({ withAllOption = false } = {}) => {
  const { data } = useGetUnits();

  return React.useMemo(() => {
    let options = [];
    if (data && Array.isArray(data)) {
      options = data.map(({ id, name }) => ({
        value: id,
        label: name,
      }));
    }
    if (withAllOption) {
      return [{ label: "All Units", value: "" }, ...options];
    }
    return options;
  }, [data, withAllOption]);
};

export default useUnitsOptions;
