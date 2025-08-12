import React from "react";
import { useGetMoveDetails } from "../api";
import QueryStatus from "@/components/QueryStatus";
import colors from "@/assets/scss/colors.module.scss";

import styles from "../../MoveDetails.module.scss";
import BasicDetailsCard from "../../components/BasicDetailsCard";
import { MOVE_STATUS } from "@/constants/move_status";
import { useRouter } from "next/router";
import sm from "@/configs/site-map";
import StripeCard from "./StripeCard";
import ItemsCard from "../../components/ItemsCard";
import Link from "next/link";
import AddressCard from "../../components/AddressCard";

type IProps = {
  moveId: string | number;
};

const PayForMove = ({ moveId }: IProps) => {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useGetMoveDetails(moveId);
  const move = React.useMemo(() => data?.data["move-details"], [data]);

  if (isLoading || isError || move === undefined || move === null) {
    return (
      <QueryStatus isError={isError} isLoading={isLoading} refetch={refetch} />
    );
  }
  if (move?.move_status?.key !== MOVE_STATUS.DRAFT) {
    if (move?.id) {
      router.replace(sm.portal.user.moves.details.navLink(move.id));
    }
    return <QueryStatus isError={false} isLoading={true} />;
  }
  return (
    <>
      <div className={styles.padding_container}>
        <h4 style={{ marginBottom: "1rem" }}>
          <span style={{ color: colors.primary }}>PAY</span> FOR YOUR MOVE
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className={styles.row_2_sm_1}>
            <BasicDetailsCard
              move={move}
              contentStyles={{ gridTemplateColumns: "auto" }}
              footer={
                <Link href={sm.portal.user.moves.details.navLink(move?.id || 0)}>
                  View Details
                </Link>
              }
            />
            <StripeCard move={move} />
          </div>
          <ItemsCard move={move} />
          <div className={styles.row_2_sm_1}>
            <AddressCard move={move} type="start" />
            <AddressCard move={move} type="end" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PayForMove;
