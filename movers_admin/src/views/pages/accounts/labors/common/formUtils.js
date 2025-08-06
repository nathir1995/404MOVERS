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
    dob: objectToEdit?.dob ?? "",

    province: objectToEdit?.province?.value ?? "",
    city: objectToEdit?.city ?? "",
    street: objectToEdit?.street ?? "",
    appartment_or_unit_number: objectToEdit?.appartment_or_unit_number ?? "",
    postal_code: objectToEdit?.postal_code ?? "",

    metropolitan_area: objectToEdit?.metropolitan_area?.value ?? "",
    moves_each_week: objectToEdit?.moves_each_week ?? "",
    able: objectToEdit?.able === 1 ? "Yes" : "No",
  };
};

export const getValidationSchema = (editMode = false) => {
  return Yup.object().shape({});
};

export const getDataToSend = (values) => {
  return values;
};
