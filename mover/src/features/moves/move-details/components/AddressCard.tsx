import React from "react";
import Move from "@/models/Move/Move.model";
import colors from "@/assets/scss/colors.module.scss";

import moveCardStyles from "@/features/moves/components/MoveCard/MoveCard.module.scss";

import { MdLocationPin } from "react-icons/md";
import { MdOutlineNumbers } from "react-icons/md";
// import { BsFillBuildingFill } from "react-icons/bs";

import styles from "../MoveDetails.module.scss";
import usePopup from "@/hooks/usePopup";
import AddressMapPopup from "./AddressMapPopup";

type IProps = {
  move: Move;
  type: "start" | "end";
};

const AddressCard = ({ move, type }: IProps) => {
  const mapPopup = usePopup();

  const { point_name, apartment_number } = React.useMemo(
    () => ({
      point_name: move?.[`${type}_point_name`] || "",
      // building_number: move?.[`${type}_building_number`],
      apartment_number: move?.[`${type}_apartment_number`] || null,
    }),
    [move, type]
  );

  return (
    <div
      className={`${moveCardStyles.container} ${styles.address_card_container}`}
    >
      <div className={moveCardStyles.header}>
        <h5
          style={{
            lineHeight: 1.25,
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: colors.primary }}>{type}</span> POINT
        </h5>
      </div>

      <div className={styles.address_content}>
        <p className={styles.card_row}>
          <MdLocationPin size={18} />
          {point_name}
        </p>
        {/* <p className={styles.card_row}>
          <BsFillBuildingFill size={18} />
          Building: <strong>{building_number}</strong>
        </p> */}
        {apartment_number !== null && (
          <p className={styles.card_row}>
            <MdOutlineNumbers size={18} />
            Apartment: <strong>{apartment_number}</strong>
          </p>
        )}
      </div>

      <div className={moveCardStyles.footer}>
        <button
          type="button"
          className={styles.view_on_map_btn}
          onClick={mapPopup.handleOpen}
        >
          View on Map
        </button>
      </div>

      <AddressMapPopup popup={mapPopup} move={move} type={type} />
    </div>
  );
};

export default AddressCard;
