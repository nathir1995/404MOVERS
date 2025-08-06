import React from "react";

import colors from "@/assets/scss/colors.module.scss";
import { FaCity, FaTruck } from "react-icons/fa";
import TextField from "@/components/TextField";

import styles from "../../styles/RegisterForm.module.scss";
import Button from "@/components/Button";
import { ROLE } from "@/constants/roles";
import SelectField from "@/components/SelectField";
import RadioInput from "@/components/RadioInput";
import { METROPOLITAN_AREAS_AS_OPTIONS } from "@/constants/metropolitan_areas";
// import { T_SHIRT_SIZES_AS_OPTIONS } from "@/constants/t_shirt_sizes";

type IProps = {
  isLoading?: boolean;
  onPrevClick: () => void;
  role: ROLE.DRIVER | ROLE.LABOR;
  isError: boolean;
  error_message?: string;
};

const JobInfoForm = ({
  isLoading = false,
  onPrevClick,
  role,
  isError,
  error_message,
}: IProps) => {
  return (
    <div className={styles.form}>
      <h4 style={{ marginBottom: ".5rem" }}>
        Job <span style={{ color: colors.primary }}>Info</span>
      </h4>

      <SelectField
        name="metropolitan_area"
        label="Which metropolitan area do you want to work in?"
        placeholder="Select a Metropolitan Area..."
        icon={<FaCity color={colors.primary} size={22} />}
        disabled={isLoading}
        options={METROPOLITAN_AREAS_AS_OPTIONS}
      />

      {/* <SelectField
        name="t_shirt_size"
        label="What size t-shirt do you wear?"
        placeholder="Select a T-shirt Size..."
        icon={<FaTshirt color={colors.primary} size={22} />}
        disabled={isLoading}
        options={T_SHIRT_SIZES_AS_OPTIONS}
      /> */}

      <TextField
        name="moves_each_week"
        label="Each trip typically takes 1-2 hours to perform. How many 404Moves are you hoping to do each week?"
        placeholder="Please enter a number"
        type="number"
        min="1"
        max="100"
        icon={<FaTruck color={colors.primary} size={22} />}
        disabled={isLoading}
      />

      {role === ROLE.LABOR && (
        <RadioInput
          name="able"
          label="Are you able to lift 75 lbs over your head, and are you willing to lift and carry large, bulky items such as couches and desks?"
          options={[
            { label: "Yes", value: 1 },
            { label: "No", value: 0 },
          ]}
        />
      )}

      {isError && (
        <p style={{ marginTop: "1.5rem" }} className={styles.error_message}>
          {error_message || "An error occured, Please try again."}
        </p>
      )}

      <div className={styles.btn_wrapper}>
        <Button
          isDisabled={isLoading}
          variant="outlined"
          type="button"
          onClick={onPrevClick}
        >
          PREV
        </Button>
        <Button isLoading={isLoading} type="submit">
          REGISTER
        </Button>
      </div>
    </div>
  );
};

export default JobInfoForm;
