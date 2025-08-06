import React from "react";

import colors from "@/assets/scss/colors.module.scss";

import styles from "../../styles/RegisterForm.module.scss";

import { AiFillCheckCircle } from "react-icons/ai";

const RegisterCompleted = () => {
  return (
    <div className={styles.congrats_container}>
      <AiFillCheckCircle size={75} color={colors.primary} />

      <div className={styles.texts}>
        <h4>Thank you for registering!</h4>
        <p>
          Your registration is currently being reviewed by us. You will receive
          an email once your account has been approved.
        </p>
      </div>
    </div>
  );
};

export default RegisterCompleted;
