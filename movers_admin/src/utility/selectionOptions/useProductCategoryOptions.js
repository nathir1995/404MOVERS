import React from "react";
import { useGetProductCategories } from "api/product_categories";
import { useTranslation } from "utility/language";

const useCategoryOptions = ({ withAllOption = false } = {}) => {
  const { data } = useGetProductCategories();
  const t = useTranslation();

  return React.useMemo(() => {
    let options = [];
    if (data && Array.isArray(data)) {
      options = data.map(({ id, name }) => ({
        value: id,
        label: name,
      }));
    }
    if (withAllOption) {
      return [{ label: t("all_categories"), value: "" }, ...options];
    }
    return options;
  }, [data, withAllOption, t]);
};

export default useCategoryOptions;
