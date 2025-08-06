import { MoverRegisterRequestType } from "@/api/register/mover/registerMover.model";
import { METROPOLITAN_AREAS } from "@/constants/metropolitan_areas";
import { PROVINCES } from "@/constants/provinces";
// import { T_SHIRT_SIZES } from "@/constants/t_shirt_sizes";
import {
  MAX_VEHICLE_YEAR,
  MIN_VEHICLE_YEAR,
  VEHICLE_TYPES,
} from "@/constants/vehicle";
import * as Yup from "yup";

export const DRIVER_TOTAL_FORMS = 4;
export const LABOR_TOTAL_FORMS = 3;

const phoneRegExp = /^\+?\d+.{4,15}$/gm;

export type ValuesType = MoverRegisterRequestType;

export const initialValues: ValuesType = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  date_of_birth: "",
  password: "",
  password_confirmation: "",

  province: PROVINCES[0],
  city: "",
  street: "",
  appartment_or_unit_number: "",
  postal_code: "",

  vehicle_make: "",
  vehicle_model: "",
  vehicle_year: "",
  vehicle_type: "",

  metropolitan_area: METROPOLITAN_AREAS[0],
  // t_shirt_size: "",
  moves_each_week: "",
  able: 1,

  // hear_about_us: "",
  // why_great_mover: "",
};

export const basicInfoValidationSchema = Yup.object().shape({
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
  date_of_birth: Yup.string().required("Please enter your date of birth"),
  password: Yup.string()
    .min(8, "The password must be at least 8 characters")
    .required("Please enter a password"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export const addressInfoValidationSchema = Yup.object().shape({
  city: Yup.string().required("Please enter your city"),
  street: Yup.string().required("Please enter your Street"),
  province: Yup.mixed().oneOf(PROVINCES).required("Please enter your Province"),
});

export const vehicleInfoValidationSchema = Yup.object().shape({
  vehicle_make: Yup.string().required("Please enter your vehicle Make"),
  vehicle_model: Yup.string().required("Please enter your vehicle Model"),
  vehicle_year: Yup.number()
    .min(
      MIN_VEHICLE_YEAR,
      `Year must be between [${MIN_VEHICLE_YEAR}-${MAX_VEHICLE_YEAR}]`
    )
    .max(
      MAX_VEHICLE_YEAR,
      `Year must be between [${MIN_VEHICLE_YEAR}-${MAX_VEHICLE_YEAR}]`
    )
    .required("Please enter your vehicle Year"),
  vehicle_type: Yup.mixed()
    .oneOf(VEHICLE_TYPES)
    .required("Please enter your vehicle Type"),
});

export const jobInfoValidationSchema = Yup.object().shape({
  metropolitan_area: Yup.mixed()
    .oneOf(METROPOLITAN_AREAS)
    .required("Please select a Metropolitan Area"),
  // t_shirt_size: Yup.mixed()
  //   .oneOf(T_SHIRT_SIZES)
  //   .required("Please select a T-Shirt size"),
  moves_each_week: Yup.number()
    .min(1, "Please enter a number between 1 and 100")
    .max(100, "Please enter a number between 1 and 100"),
});

export const MAP_LABOR_FORM_TO_VALIDATION = [
  basicInfoValidationSchema,
  addressInfoValidationSchema,
  jobInfoValidationSchema,
];
export const MAP_DRIVER_FORM_TO_VALIDATION = [
  basicInfoValidationSchema,
  addressInfoValidationSchema,
  vehicleInfoValidationSchema,
  jobInfoValidationSchema,
];
