import React from "react";
import styles from "./styles.module.scss";
import TextField from "@/components/TextField";
import colors from "@/assets/scss/colors.module.scss";
import AddressIndicator from "./AddressIndicator";
import { MdLocationPin, MdOutlineNumbers } from "react-icons/md";
import { useFormikContext } from "formik";
import { ValuesType } from "../forms/formUtils";
import { useLatLngToAddress } from "@/extensions/geocode";
import PlacesAutocomplete from "./PlacesAutocomplete";

type IProps = {
  type: "start" | "end";
  disabled?: boolean;
  setSelectedType: (newType: "start" | "end") => void;
};

const AddressDetails = ({
  type,
  disabled = false,
  setSelectedType,
}: IProps) => {
  const formik = useFormikContext<ValuesType>();
  const {
    validateForm,
    values: { start_point_name, end_point_name },
  } = formik;
  React.useEffect(() => {
    if (start_point_name && end_point_name) {
      validateForm();
    }
  }, [start_point_name, end_point_name]);

  // const lat = formik.values[`${type}_lat`];
  // const lng = formik.values[`${type}_lang`];
  // const { data: address, isLoading, isError } = useLatLngToAddress(lat, lng);
  // React.useEffect(() => {
  //   if (typeof address === "string") {
  //     formik.setFieldValue(`${type}_point_name`, address);
  //   }
  // }, [address, type]);

  return (
    // <div className={styles.padding}>
    // <div className={styles.row_2_3}>
    <div style={{ display: "grid", gap: ".5rem" }}>
      <PlacesAutocomplete
        type={type}
        onSelect={({ lat, lng, description }) => {
          formik.setFieldValue(`${type}_lat`, lat);
          formik.setFieldValue(`${type}_lang`, lng);
          formik.setFieldValue(`${type}_point_name`, description);
        }}
        onFocus={() => setSelectedType(type)}
      />
      {/* <TextField
        name={`${type}_point_name`}
        label={
          <span style={{ fontSize: "12px" }}>
            Address{" "}
            {
              <AddressIndicator
                isLoading={!!lat && !!lng && isLoading}
                isError={isError}
              />
            }
          </span>
        }
        placeholder="Location"
        icon={<MdLocationPin size={20} color={colors.primary} />}
        // disabled={disabled || isLoading}
        onFocus={() => setSelectedType(type)}
      /> */}
      <TextField
        name={`${type}_apartment_number`}
        label={<span style={{ fontSize: "12px" }}>Apartment Number</span>}
        placeholder="Apartment Number"
        icon={<MdOutlineNumbers size={20} color={colors.primary} />}
        disabled={disabled}
      />
    </div>
    // </div>
    // </div>
  );
};

export default AddressDetails;
