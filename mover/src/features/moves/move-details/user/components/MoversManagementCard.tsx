import React from "react";
import Move, { Mover } from "@/models/Move/Move.model";
import moveCardStyles from "@/features/moves/components/MoveCard/MoveCard.module.scss";
import ConfirmMoverStart from "../actions/ConfirmMoverStart";
import ConfirmMoverFinish from "../actions/ConfirmMoverFinish";
import { formatDateTime } from "@/utility/date";

type IProps = {
  move: Move;
};

const itemStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: ".5rem",
};
const Item = ({ label, value }: { label: string; value: React.ReactNode }) => {
  return (
    <div style={itemStyles}>
      <p style={{ opacity: ".75" }}>{label}</p>
      <p>{value}</p>
    </div>
  );
};

const MoverDetails = ({
  mover,
  isLast,
  move_id,
}: {
  mover: Mover;
  isLast: boolean;
  move_id: number;
}) => {
  return (
    <div
      className={moveCardStyles.container}
      style={{
        ...(!isLast && {
          marginBottom: "1rem",
        }),
      }}
    >
      <div style={itemStyles}>
        <p>
          <strong>
            {mover.first_name} {mover.last_name}
          </strong>
        </p>
      </div>
      <div style={{ ...itemStyles, marginBottom: ".5rem" }}>
        <p style={{ textTransform: "capitalize" }}>{mover.user_role.key}</p>
        <p>{mover.phone_number}</p>
      </div>

      <Item
        label="Started At"
        value={
          mover.pivot.started_at
            ? formatDateTime(mover.pivot.started_at)
            : "N/A"
        }
      />
      <Item
        label="Confirmation At"
        value={
          mover.pivot.confirm_started_at ? (
            formatDateTime(mover.pivot.confirm_started_at)
          ) : (
            <ConfirmMoverStart move_id={move_id} mover={mover} />
          )
        }
      />

      <div style={{ marginBottom: ".5rem" }}></div>
      <Item
        label="Finished At"
        value={
          mover.pivot.finished_at
            ? formatDateTime(mover.pivot.finished_at)
            : "N/A"
        }
      />
      <Item
        label="Confirmation At"
        value={
          mover.pivot.confirm_finished_at ? (
            formatDateTime(mover.pivot.confirm_finished_at)
          ) : (
            <ConfirmMoverFinish move_id={move_id} mover={mover} />
          )
        }
      />
    </div>
  );
};

const MoversManagementCard = ({ move }: IProps) => {
  return (
    <div style={{ marginTop: "1.5rem" }}>
      <h5
        style={{
          lineHeight: 1.25,
          marginBottom: ".5rem",
          marginInlineStart: "5px",
        }}
      >
        Movers
      </h5>

      {move.movers?.map((mover, index) => (
        <MoverDetails
          key={mover.id}
          mover={mover}
          isLast={index === move.movers!.length - 1}
          move_id={move.id}
        />
      ))}
    </div>
  );
};

export default MoversManagementCard;
