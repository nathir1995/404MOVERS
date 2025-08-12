import React from "react";
import Move from "@/models/Move/Move.model";
import moveCardStyles from "@/features/moves/components/MoveCard/MoveCard.module.scss";
import useAuth from "@/features/auth/utils/useAuth";
import StartMoveButton from "../actions/StartMoveButton";
import FinishMoveButton from "../actions/FinishMoveButton";
import StatusProgress from "./StatusProgress";
import { findSafe } from "@/utils/safeArray";

type IProps = {
  move: Move;
};

const ProcessStatusCard = ({ move }: IProps) => {
  const { user } = useAuth();
  const userId = user?.id;
  
  const meAsMover = React.useMemo(() => {
    if (!userId || !move) {
      return null;
    }
    
    // ✅ FIXED: Use safe find to prevent TypeError
    return findSafe(move.movers, (mover) => mover.id === userId) || null;
  }, [move, userId]);

  if (!meAsMover) {
    return null;
  }
  
  return (
    <div className={moveCardStyles.container} style={{ marginBottom: "1rem" }}>
      <div className={moveCardStyles.header}>
        <h6 style={{ lineHeight: 1.25, fontWeight: "bold" }}>Status</h6>
        <StartMoveButton move={move} />
        <FinishMoveButton move={move} />
      </div>

      <div style={{ marginTop: ".5rem" }}>
        <StatusProgress mover={meAsMover} />
      </div>
    </div>
  );
};

export default ProcessStatusCard;
