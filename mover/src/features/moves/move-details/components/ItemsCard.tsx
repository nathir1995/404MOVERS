import React from "react";
import Move from "@/models/Move/Move.model";
import colors from "@/assets/scss/colors.module.scss";

import moveCardStyles from "@/features/moves/components/MoveCard/MoveCard.module.scss";

import styles from "../MoveDetails.module.scss";
import SelectableItem from "@/components/SelectableItem";

type IProps = {
  move: Move;
};

const ItemsCard = ({ move }: IProps) => {
  return (
    <div className={moveCardStyles.container}>
      <div className={moveCardStyles.header}>
        <h5
          style={{
            lineHeight: 1.25,
            textTransform: "uppercase",
            color: colors.primary,
          }}
        >
          ITEMS
        </h5>
        <p>Total: {move.items.length}</p>
      </div>

      <div className={styles.items_card_content}>
        {move.items.map((item) => (
          <SelectableItem
            // isSelected
            key={item.id}
            style={{
              position: "relative",
              flexGrow: 1,
              boxShadow: "-2px 2px 0 #b0b0b0",
            }}
            type="button"
          >
            <p style={{ lineHeight: 1.2, fontWeight: "bold" }}>{item.name}</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
                marginTop: "3px",
              }}
            >
              <p>{item.unit_price}$</p>
              <p>
                <strong>x{item.pivot.quantity}</strong>
              </p>
            </div>
          </SelectableItem>
        ))}
      </div>
    </div>
  );
};

export default ItemsCard;
