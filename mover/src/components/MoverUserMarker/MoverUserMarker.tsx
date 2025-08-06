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
    if (mover.user_role.key === ROLE.DRIVER) return FaTruck;
    if (mover.user_role.key === ROLE.LABOR) return FaUser;
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
