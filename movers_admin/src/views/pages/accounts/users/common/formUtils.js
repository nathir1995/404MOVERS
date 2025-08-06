import { formatFromBackend } from "helpers/date";
import * as Yup from "yup";

export const getInitialValues = (objectToEdit = null) => {
  if (!objectToEdit) {
    return {};
  }

  return {
    first_name: objectToEdit?.first_name ?? "",
    last_name: objectToEdit?.last_name ?? "",
    email: objectToEdit?.email ?? "",
    phone_number: objectToEdit?.phone_number ?? "",
    created_at: formatFromBackend(objectToEdit?.created_at) ?? "",
    hear_about: objectToEdit?.hear_about?.value ?? "",
  };
};

export const getValidationSchema = (editMode = false) => {
  return Yup.object().shape({});
};

export const getDataToSend = (values) => {
  return values;
};
