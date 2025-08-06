import React from "react";
import { useGetMoveDetails } from "../api";
import QueryStatus from "@/components/QueryStatus";
import colors from "@/assets/scss/colors.module.scss";

import styles from "../../MoveDetails.module.scss";
import BasicDetailsCard from "../../components/BasicDetailsCard";
import { MOVE_STATUS_ENUM } from "@/constants/move_status";
import { useRouter } from "next/router";
import sm from "@/configs/site-map";
import Link from "next/link";
import TrackMap from "./TrackMap";

type IProps = {
  moveId: string | number;
};

const MoveTrack = ({ moveId }: IProps) => {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useGetMoveDetails(moveId);
  const move = React.useMemo(() => data?.data["move-details"], [data]);

  if (isLoading || isError || move === undefined) {
    return (
      <QueryStatus isError={isError} isLoading={isLoading} refetch={refetch} />
    );
  }
  if (
    ![MOVE_STATUS_ENUM.ONGOING, MOVE_STATUS_ENUM.STARTED].includes(
      move.move_status.key
    )
  ) {
    router.replace(sm.portal.user.moves.details.navLink(move.id));
    return <QueryStatus isError={false} isLoading={true} />;
  }
  return (
    <>
      <div className={styles.padding_container}>
        <h4 style={{ marginBottom: "1rem" }}>
          <span style={{ color: colors.primary }}>TRACK</span> YOUR MOVE
        </h4>

        <TrackMap move={move} />

        <br />

        <BasicDetailsCard
          move={move}
          contentStyles={{ gridTemplateColumns: "auto" }}
          footer={
            <Link href={sm.portal.user.moves.details.navLink(move.id)}>
              View Details
            </Link>
          }
        />
      </div>
    </>
  );
};

export default MoveTrack;
