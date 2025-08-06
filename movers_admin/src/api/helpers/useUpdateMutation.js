import { useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";
import { useTranslation } from "utility/language";
import { useAxios } from "./useAxios";
import { validateSession } from "./validateSession";

import confirmAlert from "extensions/confirm-alert/ErrorAlert";

export const useUpdateMutation = (key, url, { onSuccess } = {}) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const t = useTranslation();

  return useMutation(
    async (dataToSend) => {
      const { data } = await axios.post(url, dataToSend);
      return data;
    },
    {
      onSuccess: (data, variables) => {
        const { message } = data;
        toast.success(message || t("_success.update_data"));
        if (key) {
          queryClient.invalidateQueries([key]);
        }

        onSuccess?.(data, variables);
      },
      onError: (err) => {
        const message = err?.response?.data?.message || t("_error.update_data");
        // toast.error(message);
        confirmAlert({ status: err?.response?.status, message });
        validateSession(err.response);
      },
    }
  );
};
