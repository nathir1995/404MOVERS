import * as Yup from "yup";
import { defaultCetner } from "../utils/mapProps";

export const TOTAL_FORMS = 5;

export type ValuesType = {
  // 1) Move Package
  move_package_id: number | "";

  // 2) Items
  item_ids: { id: number; quantity: number }[];

  // 3) Pick-up location
  start_point_name: string;
  start_lat: number | "";
  start_lang: number | "";
  start_building_number: string;
  start_apartment_number: string;

  // 4) Drop-off location
  end_point_name: string;
  end_lat: number | "";
  end_lang: number | "";
  end_building_number: string;
  end_apartment_number: string;

  // 5) Finalize your booking
  move_date_time: string;
  number_of_drivers: number;
  number_of_labors: number;
  instruction: string;
};

export const initialValues: ValuesType = {
  // 1) Move Package
  move_package_id: "",

  // 2) Items
  item_ids: [],

  // 3) Pick-up location
  start_point_name: "",
  start_lat: "",
  start_lang: "",
  start_building_number: "-",
  start_apartment_number: "",

  // 4) Drop-off location
  end_point_name: "",
  end_lat: "",
  end_lang: "",
  end_building_number: "-",
  end_apartment_number: "",

  // 5) Finalize your booking
  move_date_time: "",
  number_of_drivers: 1,
  number_of_labors: 0,
  instruction: "",
};

export const movePackageValidationSchema = Yup.object().shape({
  move_package_id: Yup.number().required("Move Package is Required"),
});

export const itemsValidationSchema = Yup.object().shape({
  item_ids: Yup.array().min(1, "Please select at least one item"),
});

export const locationValidationSchema = Yup.object().shape({
  start_point_name: Yup.string().required("Starting Point name is required"),
  start_lat: Yup.number().required("Starting Latitude is required"),
  start_lang: Yup.number().required("Starting Longitude is required"),
  // start_building_number: Yup.string().required("Building number is Required"),
  end_point_name: Yup.string().required("Ending Point name is required"),
  end_lat: Yup.number().required("Ending Latitude is required"),
  end_lang: Yup.number().required("Ending Longitude is required"),
  // end_building_number: Yup.string().required("Building number is Required"),
});

// export const pickUpValidationSchema = Yup.object().shape({
//   start_point_name: Yup.string().required("Starting Point name is required"),
//   start_lat: Yup.number().required("Starting Latitude is required"),
//   start_lang: Yup.number().required("Starting Longitude is required"),
//   // start_building_number: Yup.string().required("Building number is Required"),
// });

// export const dropOffValidationSchema = Yup.object().shape({
//   end_point_name: Yup.string().required("Ending Point name is required"),
//   end_lat: Yup.number().required("Ending Latitude is required"),
//   end_lang: Yup.number().required("Ending Longitude is required"),
//   // end_building_number: Yup.string().required("Building number is Required"),
// });

export const dateTimeFormValidationSchema = Yup.object().shape({
  move_date_time: Yup.string().required("Date and time is Required"),
});

export const finalizeBookingValidationSchema = Yup.object().shape(
  {
    number_of_drivers: Yup.number()
      .min(0, "Minimum is 0")
      .max(100, "Too large number")
      .when("number_of_labors", {
        is: (val: number | "") => !val,
        then: (schema) =>
          schema
            .positive("You must enter the number of drivers")
            .required("You must enter the number of drivers"),
      }),
    number_of_labors: Yup.number()
      .min(0, "Minimum is 0")
      .max(100, "Too large number")
      .when("number_of_drivers", {
        is: (val: number | "") => !val,
        then: (schema) =>
          schema
            .positive("You must enter the number of labors")
            .required("You must enter the number of labors"),
      }),
  },
  [["number_of_labors", "number_of_drivers"]]
);

export const MAP_FORM_STEP_TO_VALIDATION = [
  // pickUpValidationSchema,
  // dropOffValidationSchema,
  locationValidationSchema,
  movePackageValidationSchema,
  itemsValidationSchema,
  dateTimeFormValidationSchema,
  finalizeBookingValidationSchema,
];
