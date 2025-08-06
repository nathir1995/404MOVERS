// import { ROLE } from "@/constants/roles";
import React from "react";
import { FaTruck, FaUser } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa6";

import styles from "./MoverUserMarker.module.scss";

const MoverUserMarker = ({ mover, onClick, isClicked = false }) => {
  const Icon = React.useMemo(() => {
    if (mover.user_role.key === "driver") return FaTruck;
    if (mover.user_role.key === "labor") return FaUser;
    return FaHouseUser;
  }, [mover]);

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
