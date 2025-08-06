import { useTranslation } from "utility/language"

export const useStatusOptions = () => {
    const t = useTranslation();
    let options = [{
        value: null,
        label: t("all")
    },
    {
        value: "pending",
        label: t("pending")
    },
    {
        value: "delivering",
        label: t("delivering")
    },
    {
        value: "delivered",
        label: t("delivered")
    },
    {
        value: "canceled",
        label: t("canceled")
    },
    {
        value: "accepted",
        label: t("accepted")
    }];
    return options;
}