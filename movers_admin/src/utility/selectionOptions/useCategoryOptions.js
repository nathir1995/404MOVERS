import React from "react";
import { useGetCategories } from "api/categories";
import { useTranslation } from "utility/language";
import { constructCategories } from "helpers/categories";

const useCategoryOptions = ({ withAllOption = false } = {}) => {
  const { data } = useGetCategories();
  const t = useTranslation();

  return React.useMemo(() => {
    let options = [];
    if (data && Array.isArray(data)) {
      // options = data.map(({ id, name }) => ({
      //   value: id,
      //   label: name,
      // }));

      options = constructCategories(data).map(({ id, full_name }) => ({
        value: id,
        label: full_name,
      }));
    }
    if (withAllOption) {
      return [{ label: t("all_categories"), value: "" }, ...options];
    }
    return options;
  }, [data, withAllOption, t]);
};

export default useCategoryOptions;
