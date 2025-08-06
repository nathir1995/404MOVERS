import React from "react";
import Move from "@/models/Move/Move.model";
import colors from "@/assets/scss/colors.module.scss";

import moveCardStyles from "@/features/moves/components/MoveCard/MoveCard.module.scss";

type IProps = {
  move: Move;
};

const InstructionsCard = ({ move }: IProps) => {
  if (!move.instruction) {
    return null;
  }
  return (
    <div className={moveCardStyles.container} style={{ marginTop: "1.5rem" }}>
      <div className={moveCardStyles.header}>
        <h6
          style={{
            color: colors.primary,
          }}
        >
          INSTRUCTIONS
        </h6>
      </div>
      <div style={{ paddingTop: "1rem" }}>
        <p>{move.instruction}</p>
      </div>
    </div>
  );
};

export default InstructionsCard;
