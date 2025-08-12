import React from "react";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import styles from "./styles.module.scss";
import colors from "@/assets/scss/colors.module.scss";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useFormikContext } from "formik";
import { ValuesType } from "../forms/formUtils";
import TextField from "@/components/TextField";
import AddressIndicator from "./AddressIndicator";
import { MdLocationPin } from "react-icons/md";
import { safeMap, hasItems } from "@/utility/arraySafety";

const getErrorMessage = (status: string): string => {
  if (status === "ZERO_RESULTS") return "No Results";
  if (status === "NOT_FOUND") return "Place not found";
  return "An error occured, please try again";
};

type IProps = {
  type: "start" | "end";
  onSelect: (props: { lat: number; lng: number; description: string }) => void;
  onFocus: () => void;
};

const PlacesAutocomplete = ({ type, onSelect, onFocus }: IProps) => {
  const formik = useFormikContext<ValuesType>();

  const {
    ready,
    value: inputValue,
    suggestions: { loading, data, status },
    setValue: setInputValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: {
        country: ["ca"],
      },
    },
    debounce: 300,
    defaultValue: formik.values[`${type}_point_name`],
  });

  const handleSelectOption = (
    option: google.maps.places.AutocompletePrediction
  ) => {
    setInputValue(option.description, false);
    clearSuggestions();

    getGeocode({ address: option.description }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      // formik.setFieldValue(`${type}_lat`, lat);
      // formik.setFieldValue(`${type}_lang`, lng);

      onSelect({ lat, lng, description: option.description });
    });
  };

  return (
    <div className={styles.places_auto_complete_container}>
      {/* <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search for a place..."
        // disabled={!ready}
        /> */}
      <TextField
        name={`${type}_point_name`}
        label={<span style={{ fontSize: "12px" }}>Address</span>}
        placeholder="Location"
        icon={<MdLocationPin size={20} color={colors.primary} />}
        value={inputValue}
        disabled={!ready}
        onChange={(e: any) => setInputValue(e.target.value)}
        onFocus={onFocus}
        // disabled={disabled || isLoading}
        // onFocus={() => setSelectedType(type)}
      />
      {inputValue !== "" && (
        <>
          {loading ? (
            <ul className={styles.suggestions_container}>
              <div className={styles.status_container}>
                <ScaleLoader color={colors.primary} />
              </div>
            </ul>
          ) : (
            <>
              {status !== "OK" && status !== "" && (
                <ul className={styles.suggestions_container}>
                  <div className={styles.status_container}>
                    <p style={{ color: "red" }}>{getErrorMessage(status)}</p>
                  </div>
                </ul>
              )}

              {status === "OK" && hasItems(data) && (
                <ul className={styles.suggestions_container}>
                  {safeMap(data, (option) => (
                    <li
                      key={option.place_id}
                      onClick={() => handleSelectOption(option)}
                    >
                      {option.description}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PlacesAutocomplete;
