import * as Yup from "yup";

const phoneRegExp = /^\+?\d+.{4,15}$/gm;

export interface ValuesType {
  name: string;
  email: string;
  phone: string;
  query: string;
  reach: "email" | "sms";
}

export const initialValues: ValuesType = {
  name: "",
  email: "",
  phone: "",
  query: "",
  reach: "email",
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  phone: Yup.string()
    .matches(phoneRegExp, "Please enter a valid phone number")
    .required("Please enter your phone number"),
  query: Yup.string().required("Please enter your message"),
  reach: Yup.mixed()
    .oneOf(["email", "sms"])
    .required("Please select a contact method"),
});
