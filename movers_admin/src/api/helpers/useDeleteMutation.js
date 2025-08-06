import { useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";
import { useTranslation } from "utility/language";
import { useAxios } from "./useAxios";
import { validateSession } from "./validateSession";

import confirmAlert from "extensions/confirm-alert/ErrorAlert";

export const useDeleteMutation = (key, url, object_id) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const t = useTranslation();

  return useMutation(
    async ({ id }) => {
      const { data } = await axios.post(url, {
        [object_id]: id,
      });
      return { ...data, id };
    },
    {
      onSuccess: ({ message, id }) => {
        toast.success(message || t("_success.delete_data"));
        queryClient.invalidateQueries([key]);
      },
      onError: (err) => {
        const message = err?.response?.data?.message || t("_error.delete_data");
        // toast.error(message);
        confirmAlert({ status: err?.response?.status, message });
        validateSession(err.response);
      },
    }
  );
};
