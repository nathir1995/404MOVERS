import React from "react";
import Move from "@/models/Move/Move.model";

import styles from "./MoveCard.module.scss";
import Image from "next/image";
import CALENDAR_ADD from "@/assets/images/icons/calendar-add.png";
import START_IMG from "@/assets/images/icons/truck-go.png";
import END_IMG from "@/assets/images/icons/truck-tick.png";
import Link from "next/link";
import sm from "@/configs/site-map";
import MoveStatus from "../MoveStatus";
import useAuth from "@/features/auth/utils/useAuth";
import { ROLE } from "@/constants/roles";
import { PiPackage } from "react-icons/pi";
import { formatDateTime } from "@/utility/date";

type IProps = {
  move: Move;
};

const formatMoveDateTime = (date_time: string): string =>
  date_time.split("T")[0];

const MoveCard = ({ move }: IProps) => {
  const { role } = useAuth();
  const move_id = move.id;
  const detailsUrl = React.useMemo(() => {
    if (!role) return "/";
    if (role === ROLE.USER)
      return sm.portal.user.moves.details.navLink(move.id);
    return sm.portal.mover.moves.details.navLink(move.id);
  }, [move_id, role]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <Image src={CALENDAR_ADD} alt="" />
          <p style={{ fontWeight: "bold" }}>
            {formatDateTime(move.move_date_time)}
          </p>
        </div>
        <MoveStatus status={move.move_status.key} />
      </div>

      <div className={styles.content}>
        <div>
          <PiPackage />
          <p>
            <strong>{move.move_package.name}</strong>
          </p>
        </div>
        <div>
          <Image src={START_IMG} alt="" />
          <p>{move.start_point_name}</p>
        </div>
        <div>
          <Image src={END_IMG} alt="" />
          <p>{move.end_point_name}</p>
        </div>
      </div>

      <div className={styles.footer}>
        <Link href={detailsUrl}>View Details</Link>
      </div>
    </div>
  );
};

export default MoveCard;
