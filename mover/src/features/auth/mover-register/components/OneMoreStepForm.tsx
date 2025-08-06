import React from "react";

import colors from "@/assets/scss/colors.module.scss";
import { FaNewspaper } from "react-icons/fa";
import { BsFillPencilFill } from "react-icons/bs";
import TextField from "@/components/TextField";

import styles from "../../styles/RegisterForm.module.scss";
import Button from "@/components/Button";
import SelectField from "@/components/SelectField";
import { HEAR_ABOUT_AS_OPTIONS } from "@/constants/hear_about";

type IProps = {
  isLoading?: boolean;
  onPrevClick: () => void;
};

const OneMoreStepForm = ({ isLoading = false, onPrevClick }: IProps) => {
  return (
    <div className={styles.form}>
      <h4 style={{ marginBottom: ".5rem" }}>
        One More <span style={{ color: colors.primary }}>Step...</span>
      </h4>

      <SelectField
        name="hear_about_us"
        label="How did you hear about us?"
        placeholder="Select..."
        icon={<FaNewspaper color={colors.primary} size={22} />}
        disabled={isLoading}
        options={HEAR_ABOUT_AS_OPTIONS}
      />

      <TextField
        name="why_great_mover"
        label="In a few short sentences, tell us why you will be a great 404Mover?"
        placeholder="Type Here..."
        type="text"
        as="textarea"
        rows="7"
        icon={<BsFillPencilFill color={colors.primary} size={20} />}
        maxLength="1000"
        disabled={isLoading}
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

export default OneMoreStepForm;
