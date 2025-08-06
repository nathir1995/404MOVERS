import React from "react";

import colors from "@/assets/scss/colors.module.scss";
import { MdEmail } from "react-icons/md";
import { FaNewspaper } from "react-icons/fa";
import { BiSolidUser, BiSolidPhone } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import TextField from "@/components/TextField";

import styles from "../styles/RegisterForm.module.scss";
import Button from "@/components/Button";
import Link from "next/link";

import SelectField from "@/components/SelectField";
import { HEAR_ABOUT_AS_OPTIONS } from "@/constants/hear_about";

type IProps = {
  isLoading: boolean;
  isError: boolean;
  error_message?: string;
};

const BasicInfoForm = ({ isLoading, isError, error_message }: IProps) => {
  return (
    <div className={styles.form}>
      <h4 style={{ marginBottom: "1rem" }}>Register</h4>

      <div className={styles.row}>
        <TextField
          name="first_name"
          label="First Name"
          placeholder="Your First Name"
          type="text"
          icon={<BiSolidUser color={colors.primary} size={22} />}
          disabled={isLoading}
        />
        <TextField
          name="last_name"
          label="Last Name"
          placeholder="Your Last Name"
          type="text"
          icon={null}
          disabled={isLoading}
        />
      </div>

      <TextField
        name="email"
        label="Email"
        placeholder="Your Email"
        type="text"
        icon={<MdEmail color={colors.primary} size={22} />}
        disabled={isLoading}
      />
      <TextField
        name="phone"
        label="Phone Number"
        placeholder="Your Phone Number"
        type="text"
        icon={<BiSolidPhone color={colors.primary} size={22} />}
        disabled={isLoading}
      />

      <div className={styles.row}>
        <TextField
          name="password"
          label="Password"
          placeholder="Your Password"
          type="password"
          icon={<RiLockPasswordFill color={colors.primary} size={22} />}
          disabled={isLoading}
        />
        <TextField
          name="password_confirmation"
          label="Password Confirmation"
          placeholder="Confirm Your Password"
          type="password"
          icon={<RiLockPasswordFill color={colors.primary} size={22} />}
          disabled={isLoading}
        />
      </div>

      <SelectField
        name="hear_about_us"
        label="How did you hear about us?"
        placeholder="Select..."
        icon={<FaNewspaper color={colors.primary} size={22} />}
        disabled={isLoading}
        options={HEAR_ABOUT_AS_OPTIONS}
      />

      {isError && (
        <p style={{ marginTop: "1.5rem" }} className={styles.error_message}>
          {error_message || "An error occured, Please try again."}
        </p>
      )}

      <div className={styles.btn_wrapper}>
        <Button isLoading={isLoading} type="submit">
          Register
        </Button>
      </div>

      <div className={styles.links_container}>
        <p className={styles.link}>
          Already have an account? <Link href="/login">Login</Link>
        </p>
        <p className={styles.link}>
          Register As <Link href="/register/labor">Labor</Link>, Or{" "}
          <Link href="/register/driver">Driver</Link>
        </p>
      </div>
    </div>
  );
};

export default BasicInfoForm;
