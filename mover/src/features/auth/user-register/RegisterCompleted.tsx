import React from "react";

import colors from "@/assets/scss/colors.module.scss";

import styles from "../styles/RegisterForm.module.scss";
import Button from "@/components/Button";
import Link from "next/link";

import { AiFillCheckCircle } from "react-icons/ai";

type IProps = {
  onClick?: () => void;
};

const RegisterCompleted = ({ onClick }: IProps) => {
  return (
    <div className={styles.congrats_container}>
      <AiFillCheckCircle size={75} color={colors.primary} />

      <div className={styles.texts}>
        <h4>CONGRATULATIONS!</h4>
        <p>
          You Have Successfully Registered, please login to your account to
          start using <span style={{ color: colors.primary }}>404Movers</span>
        </p>
      </div>

      <Link href="/login">
        <Button
          type="button"
          style={{ width: "100%" }}
          onClick={() => onClick?.()}
        >
          LOGIN
        </Button>
      </Link>
    </div>
  );
};

export default RegisterCompleted;
