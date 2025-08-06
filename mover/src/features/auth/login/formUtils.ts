import * as Yup from "yup";

// const phoneRegExp = /^\+?\d+.{4,15}$/gm;

export interface ValuesType {
  email: string;
  password: string;
}

export const initialValues: ValuesType = {
  email: "",
  password: "",
};

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  password: Yup.string()
    .min(8, "The password must be at least 8 characters")
    .required("Please enter your password"),
});
