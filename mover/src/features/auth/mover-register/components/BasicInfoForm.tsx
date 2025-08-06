import React from "react";

import colors from "@/assets/scss/colors.module.scss";
import { MdEmail } from "react-icons/md";
import { BiSolidUser, BiSolidPhone, BiSolidCalendarAlt } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import TextField from "@/components/TextField";

import styles from "../../styles/RegisterForm.module.scss";
import Button from "@/components/Button";
import { ROLE } from "@/constants/roles";
import Link from "next/link";

type IProps = {
  isLoading?: boolean;
  role: ROLE.DRIVER | ROLE.LABOR;
};

const BasicInfoForm = ({ isLoading = false, role }: IProps) => {
  return (
    <div className={styles.form}>
      <h4 style={{ marginBottom: ".5rem" }}>
        Register as{" "}
        <span style={{ color: colors.primary, textTransform: "capitalize" }}>
          {role}
        </span>
      </h4>

      <p style={{ marginBottom: "1rem", fontSize: ".9em" }}>
        <strong>ZERO</strong> commission! Our active members can make up to{" "}
        <strong style={{ color: colors.primary }}>
          ${role === ROLE.DRIVER ? "2.5k" : "1.5k"}/week!
        </strong>
      </p>

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

      <TextField
        name="date_of_birth"
        label="Date of Birth"
        placeholder="Your Date of Birth"
        type="date"
        icon={<BiSolidCalendarAlt color={colors.primary} size={22} />}
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

      <div className={styles.btn_wrapper}>
        <Button isLoading={isLoading} type="submit">
          NEXT
        </Button>
      </div>

      <div className={styles.links_container}>
        <p className={styles.link}>
          Already have an account? <Link href="/login">Login</Link>
        </p>
        <p className={styles.link}>
          Register As{" "}
          {role === ROLE.DRIVER ? (
            <Link href="/register/labor">Labor</Link>
          ) : (
            <Link href="/register/driver">Driver</Link>
          )}
        </p>
      </div>
    </div>
  );
};

export default BasicInfoForm;
