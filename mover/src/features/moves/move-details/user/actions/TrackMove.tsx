import Button from "@/components/Button";
import sm from "@/configs/site-map";
import { MOVE_STATUS_ENUM } from "@/constants/move_status";
import Move from "@/models/Move/Move.model";
import Link from "next/link";

type IProps = {
  move: Move;
};

const TrackMove = ({ move }: IProps) => {
  if (
    ![MOVE_STATUS_ENUM.ONGOING, MOVE_STATUS_ENUM.STARTED].includes(
      move?.move_status?.key
    )
  ) {
    return null;
  }

  return (
    <div
      style={{
        marginTop: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Link href={sm.portal.user.moves.track.navLink(move?.id || 0)}>
        <Button
          type="button"
          style={{
            padding: ".6rem .75rem",
          }}
        >
          Track
        </Button>
      </Link>
    </div>
  );
};

export default TrackMove;
