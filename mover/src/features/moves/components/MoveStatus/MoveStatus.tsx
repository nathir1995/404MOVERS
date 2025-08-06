import React from "react";
import { MOVE_STATUS_ENUM, UI_MOVE_STATUS } from "@/constants/move_status";
import styles from "./MoveStatus.module.scss";

type IProps = {
  status: MOVE_STATUS_ENUM;
};

const MoveStatus = ({ status }: IProps) => {
  const { label, color } = UI_MOVE_STATUS[status];
  return (
    <p
      className={styles.status}
      style={{ borderColor: color, color: "#fff", backgroundColor: color }}
    >
      {label}
    </p>
  );
};

export default MoveStatus;
