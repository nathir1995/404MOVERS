import useAuth from "@/features/auth/utils/useAuth";
import Move from "@/models/Move/Move.model";
import React from "react";
import { isUserAlreadyAcceptedMove } from "./actions/permissions";
import { MOVE_STATUS } from "@/constants/move_status";

type IProps = {
  move: Move;
};

const AcceptedIndicator = ({ move }: IProps) => {
  const { user } = useAuth();
  const isAccepted = React.useMemo(
    () => isUserAlreadyAcceptedMove(user!, move),
    [move, user]
  );

  if (isAccepted && move?.move_status?.key === MOVE_STATUS.PENDING) {
    return (
      <p
        style={{
          fontSize: ".75em",
          backgroundColor: "#006400",
          color: "#fff",
          padding: "4px 10px 4px 10px",
          borderStyle: "solid",
          borderWidth: "1px",
          borderRadius: "24px",
        }}
      >
        Accepted
      </p>
    );
  }
  return null;
};

export default AcceptedIndicator;
