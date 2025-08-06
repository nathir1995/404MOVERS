import { useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";
import { useTranslation } from "utility/language";
import { useAxios } from "./useAxios";
import { validateSession } from "./validateSession";

export const useToggleStatus = (key, url, object_id, dataName) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const t = useTranslation();

  return useMutation(
    async ({ id, new_status, ...rest }) => {
      const { data } = await axios.post(url, {
        ...rest,
        [object_id]: id,
        active: new_status,
      });
      return { ...data, ...rest, id, active: new_status };
    },
    {
      onSuccess: ({ message, id, new_status }) => {
        toast.success(message || t("_success.update_data"));

        queryClient.invalidateQueries([key]);
      },
      onError: (err) => {
        const message = err?.response?.data?.message || t("_error.update_data");
        toast.error(message);
        validateSession(err.response);
      },
    }
  );
};
