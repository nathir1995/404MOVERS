import React from "react";
import { useGetMoveDetails } from "./api";
import QueryStatus from "@/components/QueryStatus";
import colors from "@/assets/scss/colors.module.scss";

import styles from "../MoveDetails.module.scss";
import BasicDetailsCard from "../components/BasicDetailsCard";
import AddressCard from "../components/AddressCard";
import ItemsCard from "../components/ItemsCard";
import InstructionsCard from "../components/InstructionsCard";
import ProcessPaymentButton from "./actions/ProcessPaymentButton";
import MoversManagementCard from "./components/MoversManagementCard";
import StartMoveButton from "./actions/StartMoveButton";
import FinishMoveButton from "./actions/FinishMoveButton";
import TrackMove from "./actions/TrackMove";

type IProps = {
  moveId: string | number;
};

const UserMoveDetails = ({ moveId }: IProps) => {
  const { data, isLoading, isError, refetch } = useGetMoveDetails(moveId);
  const move = React.useMemo(() => data?.data["move-details"], [data]);

  if (isLoading || isError || move === undefined || move === null) {
    return (
      <QueryStatus isError={isError} isLoading={isLoading} refetch={refetch} />
    );
  }

  const canShowMoversManagement = React.useMemo(() => {
    if (!move || move === null) return false;
    
    const hasMovers = move.movers && Array.isArray(move.movers) && move.movers.length > 0;
    const noRemainingDrivers = move.remaining_number_of_drivers === 0;
    const noRemainingLabors = move.remaining_number_of_labors === 0;
    
    return hasMovers && noRemainingDrivers && noRemainingLabors;
  }, [move]);

  return (
    <>
      <div className={styles.padding_container}>
        <h4 style={{ marginBottom: "1rem" }}>
          <span style={{ color: colors.primary }}>MOVE</span> DETAILS
        </h4>
        <BasicDetailsCard move={move} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <ProcessPaymentButton move={move} />
          <TrackMove move={move} />
          <StartMoveButton move={move} />
          <FinishMoveButton move={move} />
        </div>

        {canShowMoversManagement && <MoversManagementCard move={move} />}

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

export default UserMoveDetails;
