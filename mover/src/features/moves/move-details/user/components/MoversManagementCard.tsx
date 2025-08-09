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
  move_id: number | undefined;
}) => {
  // Safely read nested fields with fallbacks
  const firstName = mover?.first_name ?? "";
  const lastName = mover?.last_name ?? "";
  const roleKey = mover?.user_role?.key ?? "—";
  const phone = mover?.phone_number ?? "—";

  const startedAt =
    mover?.pivot?.started_at ? formatDateTime(mover.pivot.started_at) : "N/A";
  const confirmStartedAt =
    mover?.pivot?.confirm_started_at
      ? formatDateTime(mover.pivot.confirm_started_at)
      : null;

  const finishedAt =
    mover?.pivot?.finished_at ? formatDateTime(mover.pivot.finished_at) : "N/A";
  const confirmFinishedAt =
    mover?.pivot?.confirm_finished_at
      ? formatDateTime(mover.pivot.confirm_finished_at)
      : null;

  // Only render confirm buttons when we have required IDs
  const canConfirm = Boolean(move_id && mover?.id);

  return (
    <div
      className={moveCardStyles.container}
      style={{
        ...(!isLast && { marginBottom: "1rem" }),
      }}
    >
      <div style={itemStyles}>
        <p>
          <strong>
            {firstName} {lastName}
          </strong>
        </p>
      </div>

      <div style={{ ...itemStyles, marginBottom: ".5rem" }}>
        <p style={{ textTransform: "capitalize" }}>{roleKey}</p>
        <p>{phone}</p>
      </div>

      <Item label="Started At" value={startedAt} />

      <Item
        label="Confirmation At"
        value={
          confirmStartedAt ??
          (canConfirm ? (
            <ConfirmMoverStart move_id={move_id as number} mover={mover} />
          ) : (
            "—"
          ))
        }
      />

      <div style={{ marginBottom: ".5rem" }} />

      <Item label="Finished At" value={finishedAt} />

      <Item
        label="Confirmation At"
        value={
          confirmFinishedAt ??
          (canConfirm ? (
            <ConfirmMoverFinish move_id={move_id as number} mover={mover} />
          ) : (
            "—"
          ))
        }
      />
    </div>
  );
};

const MoversManagementCard = ({ move }: IProps) => {
  // Safe access to movers array
  const safeMovers = React.useMemo<Mover[]>(() => {
    const list = move?.movers;
    return Array.isArray(list) ? list : [];
  }, [move?.movers]);

  if (safeMovers.length === 0) {
    return null;
  }

  const safeMoveId = typeof move?.id === "number" ? move.id : undefined;

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

      {safeMovers.map((mover, index) => (
        <MoverDetails
          key={mover?.id ?? `${index}`}
          mover={mover}
          isLast={index === safeMovers.length - 1}
          move_id={safeMoveId}
        />
      ))}
    </div>
  );
};

export default MoversManagementCard;
