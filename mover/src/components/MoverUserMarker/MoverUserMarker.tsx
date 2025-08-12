import { ROLE } from "@/constants/roles";
import { Mover } from "@/models/Move/Move.model";
import React from "react";
import { FaTruck, FaUser } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa6";

import styles from "./MoverUserMarker.module.scss";

type IProps = {
  mover: Mover;
  onClick?: () => void;
  isClicked?: boolean;
};

const MoverUserMarker = ({ mover, onClick, isClicked = false }: IProps) => {
  const Icon = React.useMemo(() => {
    // ✅ FIXED: Safety checks for mover and user_role
    if (!mover || !mover.user_role || !mover.user_role.key) {
      return FaHouseUser; // Default fallback icon
    }

    if (mover.user_role.key === ROLE.DRIVER) return FaTruck;
    if (mover.user_role.key === ROLE.LABOR) return FaUser;
    return FaHouseUser;
  }, [mover]);

  // ✅ FIXED: Early return if mover is invalid
  if (!mover) {
    return (
      <button
        type="button"
        className={styles.btn}
        data-is-clicked={false}
        onClick={() => onClick?.()}
      >
        <FaHouseUser size={20} color="#fff" />
      </button>
    );
  }

  return (
    <button
      type="button"
      className={styles.btn}
      data-is-clicked={isClicked}
      onClick={() => onClick?.()}
    >
      <Icon size={20} color="#fff" />
    </button>
  );
};

export default MoverUserMarker;
