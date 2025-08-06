import React from "react";

import colors from "@/assets/scss/colors.module.scss";
import { FaShuttleVan, FaTruckMoving } from "react-icons/fa";
import { BiSolidCalendarAlt } from "react-icons/bi";
import { MdFactory } from "react-icons/md";

import styles from "../../styles/RegisterForm.module.scss";

import Button from "@/components/Button";
import TextField from "@/components/TextField";

import {
  MAX_VEHICLE_YEAR,
  MIN_VEHICLE_YEAR,
  VEHICLE_TYPES_AS_OPTIONS,
} from "@/constants/vehicle";
import SelectField from "@/components/SelectField";

type IProps = {
  isLoading?: boolean;
  onPrevClick: () => void;
};

const VehicleForm = ({ isLoading = false, onPrevClick }: IProps) => {
  return (
    <div className={styles.form}>
      <h4 style={{ marginBottom: ".5rem" }}>
        Vehicle <span style={{ color: colors.primary }}>Info</span>
      </h4>

      <p style={{ marginBottom: "1rem", fontSize: ".9em" }}>
        You must have a{" "}
        {VEHICLE_TYPES_AS_OPTIONS.map((v) => v.label).join(", ")} to become a
        Driver.
      </p>

      <TextField
        name="vehicle_make"
        label="Make"
        placeholder="Ex: Ford"
        icon={<MdFactory color={colors.primary} size={22} />}
        disabled={isLoading}
      />
      <TextField
        name="vehicle_model"
        label="Model"
        placeholder="Ex: F-150"
        type="text"
        icon={<FaShuttleVan color={colors.primary} size={22} />}
        disabled={isLoading}
      />
      <TextField
        name="vehicle_year"
        label="Year"
        placeholder="Ex: 2016"
        type="number"
        min={MIN_VEHICLE_YEAR}
        max={MAX_VEHICLE_YEAR}
        step="1"
        icon={<BiSolidCalendarAlt color={colors.primary} size={22} />}
        disabled={isLoading}
      />
      <SelectField
        name="vehicle_type"
        label="Type"
        placeholder="Select your Vehicle Type..."
        icon={<FaTruckMoving color={colors.primary} size={22} />}
        disabled={isLoading}
        options={VEHICLE_TYPES_AS_OPTIONS}
      />
      <div className={styles.btn_wrapper}>
        <Button
          isLoading={isLoading}
          variant="outlined"
          type="button"
          onClick={onPrevClick}
        >
          PREV
        </Button>
        <Button isLoading={isLoading} type="submit">
          NEXT
        </Button>
      </div>
    </div>
  );
};

export default VehicleForm;
