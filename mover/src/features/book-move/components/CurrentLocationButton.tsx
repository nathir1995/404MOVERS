import React from "react";
import { BiTargetLock } from "react-icons/bi";
import styles from "./styles.module.scss";

type IProps = React.ComponentProps<"button"> & {
  status: "idle" | "success" | "error";
};

const color = {
  idle: "#666666",
  success: "#0C43C5",
  error: "red",
} as const;

const CurrentLocationButton = ({ status, ...props }: IProps) => {
  return (
    <button type="button" className={styles.current_location_btn} {...props}>
      <BiTargetLock size={32} color={color[status]} />
    </button>
  );
};

export default CurrentLocationButton;
