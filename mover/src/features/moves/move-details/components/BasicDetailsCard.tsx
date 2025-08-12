import React from "react";
import Move from "@/models/Move/Move.model";

import Image from "next/image";
import CALENDAR_ADD from "@/assets/images/icons/calendar-add.png";
import START_IMG from "@/assets/images/icons/truck-go.png";
import moveCardStyles from "@/features/moves/components/MoveCard/MoveCard.module.scss";

import { AiOutlineDollarCircle } from "react-icons/ai";
import { GiSteeringWheel } from "react-icons/gi";
import { BsFillPersonFill } from "react-icons/bs";

import styles from "../MoveDetails.module.scss";
import MoveStatus from "../../components/MoveStatus";
import AcceptedMovers from "./AcceptedMovers";
import { filterAcceptedMovers } from "../../utils/filter-accepted-movers";
import { ROLE } from "@/constants/roles";
import { formatDateTime } from "@/utility/date";

type IProps = {
  move: Move;
  contentStyles?: React.CSSProperties;
  footer?: React.ReactNode;
};

const BasicDetailsCard = ({ move, contentStyles = {}, footer }: IProps) => {
  const { accepted_drivers, accepted_labors } = React.useMemo(
    () => {
      if (!move) {
        return {
          accepted_drivers: [],
          accepted_labors: [],
        };
      }
      
      const safeMovers = move.movers ?? [];
      return {
        accepted_drivers: filterAcceptedMovers(safeMovers, ROLE.DRIVER),
        accepted_labors: filterAcceptedMovers(safeMovers, ROLE.LABOR),
      };
    },
    [move]
  );

  if (!move || move === null) {
    return null;
  }

  return (
    <div className={moveCardStyles.container}>
      <div className={moveCardStyles.header}>
        <div>
          <Image src={CALENDAR_ADD} alt="" />
          <p style={{ lineHeight: 1.25 }}>
            {formatDateTime(move.move_date_time)}
          </p>
        </div>
        <MoveStatus status={move.move_status.key} />
      </div>

      <div className={styles.basic_card_content} style={contentStyles}>
        <div>
          <p className={styles.card_row}>
            <Image src={START_IMG} alt="" />
            Package: <strong>{move.move_package.name}</strong>
          </p>
          <p className={styles.card_row}>
            <AiOutlineDollarCircle size={20} />
            Expected Price: <strong>{move.expected_price} $</strong>
          </p>
        </div>
        <div>
          <p className={styles.card_row}>
            <GiSteeringWheel size={20} /># Drivers:{" "}
            <strong>{move.number_of_drivers}</strong>{" "}
            <AcceptedMovers movers={accepted_drivers} mover_type="Driver" />
          </p>
          <p className={styles.card_row}>
            <BsFillPersonFill size={20} /># Labors:{" "}
            <strong>{move.number_of_labors}</strong>{" "}
            <AcceptedMovers movers={accepted_labors} mover_type="Labor" />
          </p>
        </div>
      </div>

      {footer && <div className={moveCardStyles.footer}>{footer}</div>}
    </div>
  );
};

export default BasicDetailsCard;
