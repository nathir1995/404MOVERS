import React from "react";
import { useGetMoveDetails } from "./api";
import QueryStatus from "@/components/QueryStatus";
import colors from "@/assets/scss/colors.module.scss";

import styles from "../MoveDetails.module.scss";
import BasicDetailsCard from "../components/BasicDetailsCard";
import AddressCard from "../components/AddressCard";
import ItemsCard from "../components/ItemsCard";
import InstructionsCard from "../components/InstructionsCard";
import AcceptedIndicator from "./AcceptedIndicator";
import AcceptMoveButton from "./actions/AcceptMoveButton";
import ProcessStatusCard from "./components/ProcessStatusCard";
import { LocationTracker } from "./location/useLocationTracker";
import { checkIfMoverShouldStreamLocation } from "./actions/permissions";
import useAuth from "@/features/auth/utils/useAuth";

type IProps = {
  moveId: number;
};

const MoverMoveDetails = ({ moveId }: IProps) => {
  const { data, isLoading, isError, refetch } = useGetMoveDetails(moveId);
  const move = React.useMemo(() => data?.data["move-details"], [data]);
  const { role, user } = useAuth();

  if (isLoading || isError || move === undefined || move === null) {
    return (
      <QueryStatus isError={isError} isLoading={isLoading} refetch={refetch} />
    );
  }

  const moverShouldStreamLocation = move && role && user ? checkIfMoverShouldStreamLocation(
    move,
    role,
    user
  ) : false;
  return (
    <>
      {moverShouldStreamLocation && <LocationTracker move_id={move.id} />}
      <div className={styles.padding_container}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h4>
            <span style={{ color: colors.primary }}>MOVE</span> DETAILS
          </h4>
          <AcceptedIndicator move={move} />
        </div>
        <BasicDetailsCard move={move} />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "1rem",
          }}
        >
          <AcceptMoveButton move={move} />
        </div>
        <ProcessStatusCard move={move} />

        <hr className={styles.divider} />
        <div className={styles.addresses_container}>
          <AddressCard move={move} type="start" />
          <AddressCard move={move} type="end" />
        </div>
        <ItemsCard move={move} />
        <InstructionsCard move={move} />
      </div>
    </>
  );
};

export default MoverMoveDetails;
