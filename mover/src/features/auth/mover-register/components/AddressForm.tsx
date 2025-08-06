import React from "react";

import colors from "@/assets/scss/colors.module.scss";
import { FaCity, FaRoad, FaBuilding } from "react-icons/fa";
import { BsMailbox2 } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";

import styles from "../../styles/RegisterForm.module.scss";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import SelectField from "@/components/SelectField/index";

import { PROVINCES_AS_OPTIONS } from "@/constants/provinces";

type IProps = {
  isLoading?: boolean;
  onPrevClick: () => void;
};

const AddressForm = ({ isLoading = false, onPrevClick }: IProps) => {
  return (
    <div className={styles.form}>
      <h4>
        Address <span style={{ color: colors.primary }}>Info</span>
      </h4>

      <SelectField
        name="province"
        label="Province"
        placeholder="Select a Province..."
        icon={<MdLocationOn color={colors.primary} size={22} />}
        disabled={isLoading}
        options={PROVINCES_AS_OPTIONS}
      />

      <TextField
        name="city"
        label="City"
        placeholder="Your City"
        type="text"
        icon={<FaCity color={colors.primary} size={22} />}
        disabled={isLoading}
      />

      <TextField
        name="street"
        label="Street"
        placeholder="Your Street"
        type="text"
        icon={<FaRoad color={colors.primary} size={22} />}
        disabled={isLoading}
      />

      <div className={styles.row}>
        <TextField
          name="appartment_or_unit_number"
          label="Appartment or Unit number"
          placeholder="Appartment or Unit number"
          type="text"
          icon={<FaBuilding color={colors.primary} size={22} />}
          disabled={isLoading}
        />
        <TextField
          name="postal_code"
          label="Postal Code"
          placeholder="Postal Code"
          type="text"
          icon={<BsMailbox2 color={colors.primary} size={22} />}
          disabled={isLoading}
        />
      </div>

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

export default AddressForm;
