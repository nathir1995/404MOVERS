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

    vehicle_make: objectToEdit?.get_car_user?.[0]?.vehicle_make ?? "",
    vehicle_model: objectToEdit?.get_car_user?.[0]?.vehicle_model ?? "",
    vehicle_year: objectToEdit?.get_car_user?.[0]?.vehicle_year ?? "",
    vehicle_type: objectToEdit?.get_car_user?.[0]?.vehicle_type?.value ?? "",

    metropolitan_area: objectToEdit?.metropolitan_area?.value ?? "",
    moves_each_week: objectToEdit?.moves_each_week ?? "",
  };
};

export const getValidationSchema = (editMode = false) => {
  return Yup.object().shape({});
};

export const getDataToSend = (values) => {
  return values;
};
