import React from "react";

import styles from "./styles.module.scss";

export const FadeIn = ({ show, duration = "1s", children }) => {
  if (!show) return null;

  return (
    <div
      style={{
        animation: `${show ? styles.fadeIn : styles.fadeOut} ${
          show ? "1s" : "1.5s"
        }`,
      }}
    >
      {children}
    </div>
  );
};
