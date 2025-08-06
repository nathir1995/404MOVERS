import * as Yup from "yup";

export const getInitialValues = (objectToEdit = null) => {
  if (!objectToEdit) {
    return {
      name: "",
      price: "",
      description: "",
    };
  }

  return {
    package_id: objectToEdit.id,
    name: objectToEdit.name ?? "",
    price: objectToEdit.price ?? "",
    description: objectToEdit.description ?? "",
  };
};

export const getValidationSchema = (editMode = false) => {
  return Yup.object().shape({
    name: Yup.string().required("required"),
    price: Yup.number().required("required"),
    description: Yup.string().required("required"),
  });
};

export const getDataToSend = (values) => {
  return values;
};
