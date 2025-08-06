import { RegisterUserType } from "@/api/register/user/registerUser.model";
import * as Yup from "yup";

const phoneRegExp = /^\+?\d+.{4,15}$/gm;

export type ValuesType = RegisterUserType;

export const initialValues: ValuesType = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  password: "",
  password_confirmation: "",

  hear_about_us: "",
};

export const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .max(50, "First name must be less than 50")
    .required("Please enter your first name"),
  last_name: Yup.string()
    .max(50, "Last name must be less than 50")
    .required("Please enter your last name"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  phone: Yup.string()
    .matches(phoneRegExp, "Please enter a valid phone number")
    .required("Please enter your phone number"),
  password: Yup.string()
    .min(8, "The password must be at least 8 characters")
    .required("Please enter a password"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});
