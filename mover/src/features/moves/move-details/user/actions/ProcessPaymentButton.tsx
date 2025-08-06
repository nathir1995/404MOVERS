import React from "react";
import Button from "@/components/Button";
import Move from "@/models/Move/Move.model";
import { MOVE_STATUS } from "@/constants/move_status";
import Link from "next/link";
import sm from "@/configs/site-map";

type IProps = {
  move: Move;
};

const ProcessPaymentButton = ({ move }: IProps) => {
  // if (move.move_status.key !== MOVE_STATUS.DRAFT) {
  //   return null;
  // }
  return (
    <div
      style={{
        marginTop: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Link href={sm.portal.user.moves.pay.navLink(move.id)}>
        <Button
          type="button"
          style={{
            padding: ".6rem .75rem",
          }}
        >
          Process Payment
        </Button>
      </Link>
    </div>
  );
};

export default ProcessPaymentButton;
