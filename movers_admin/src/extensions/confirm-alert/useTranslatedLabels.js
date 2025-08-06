import { useMemo } from "react";
import { useTranslation } from "utility/language";

export const useTranslatedLabels = () => {
  const t = useTranslation();

  return useMemo(
    () => ({
      title: t("delete_are_you_sure"),
      confirmBtnText: t("yes_delete_it"),
      cancelBtnText: t("cancel"),
      body: t("no_revert"),
    }),
    [t]
  );
};
