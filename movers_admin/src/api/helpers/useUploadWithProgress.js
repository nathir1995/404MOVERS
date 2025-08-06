import { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";
import { useTranslation } from "utility/language";
import { useAxios } from "./useAxios";
import { validateSession } from "./validateSession";

import confirmAlert from "extensions/confirm-alert/ErrorAlert";

export const useUploadWithProgress = (key, url) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const t = useTranslation();
  const [percentCompleted, setPercentCompleted] = useState(0.0);

  const mutation = useMutation(
    async (dataToSend) => {
      setPercentCompleted(0.0);
      const { data } = await axios.post(url, dataToSend, {
        onUploadProgress: (event) => {
          setPercentCompleted(Math.round((event.loaded * 100) / event.total));
        },
      });
      return data;
    },
    {
      onSuccess: ({ message }) => {
        toast.success(message || t("_success.upload_data"));
        queryClient.invalidateQueries([key]);
      },
      onError: (err) => {
        const message = err?.response?.data?.message || t("_error.upload_data");
        // toast.error(message);
        confirmAlert({ status: err?.response?.status, message });
        validateSession(err.response);
      },
    }
  );

  return {
    percentCompleted,
    ...mutation,
  };
};
