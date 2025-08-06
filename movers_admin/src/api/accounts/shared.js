import { useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";
import { useTranslation } from "utility/language";
import { useAxios } from "../helpers/useAxios";
import { validateSession } from "../helpers/validateSession";

import confirmAlert from "extensions/confirm-alert/ErrorAlert";

import { KEY as LABORS_KEY } from "./labors";
import { KEY as DRIVERS_KEY } from "./drivers";
import { ACCOUNT_TYPE } from "enums/Account_Types";

const API = {
  REJECT_ACCOUNT: `/api/admin/mover/reject-account`,
  APPROVE_ACCOUNT_AND_REQUEST_FOR_DOCUMENTS: `/api/admin/mover/approve-account-and-request-documents`,
  REJECT_DOCUMENTS_AND_REQUEST_FOR_REUPLOAD: `/api/admin/mover/reject-documents-and-request-reupload`,
  APPROVE_DOCUMENTS: `/api/admin/mover/approve-documents`,
};

const useMoverMutation = (url, moverType, { onSuccess } = {}) => {
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
        if (moverType === ACCOUNT_TYPE.DRIVER) {
          queryClient.invalidateQueries([DRIVERS_KEY]);
        }
        if (moverType === ACCOUNT_TYPE.LABOR) {
          queryClient.invalidateQueries([LABORS_KEY]);
        }

        onSuccess?.(data, variables);
      },
      onError: (err) => {
        const message = err?.response?.data?.message || t("_error.update_data");
        confirmAlert({ status: err?.response?.status, message });
        validateSession(err.response);
      },
    }
  );
};

export const useRejectAccount = (moverType) =>
  useMoverMutation(API.REJECT_ACCOUNT, moverType);
export const useApproveAccountAndRequestForDocuments = (moverType) =>
  useMoverMutation(API.APPROVE_ACCOUNT_AND_REQUEST_FOR_DOCUMENTS, moverType);
export const useRejectDocumentsAndRequestForReupload = (moverType) =>
  useMoverMutation(API.REJECT_DOCUMENTS_AND_REQUEST_FOR_REUPLOAD, moverType);
export const useApproveDocuments = (moverType) =>
  useMoverMutation(API.APPROVE_DOCUMENTS, moverType);
