import React from "react";
import { NextPageWithLayout } from "@/layout/types";

import RequireAuth from "@/features/auth/utils/RequireAuth";
import { ROLE } from "@/constants/roles";
import UserLayout from "@/layout/user-layout/UserLayout";
import { useRouter } from "next/router";
import sm from "@/configs/site-map";
import MoverMoveDetails from "@/features/moves/move-details/mover/MoverMoveDetails";
import DocumentTitle from "@/components/meta/DocumentTitle";

const MoveDetailsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const moveId = router.query?.["move-id"];

  if (typeof moveId !== "string") {
    router.replace(sm.portal.mover.moves.upcoming.url);
    return null;
  }
  return (
    <>
      <DocumentTitle title="Move Details" />
      <MoverMoveDetails moveId={parseInt(moveId)} />
    </>
  );
};

MoveDetailsPage.getLayout = (page: React.ReactElement) => {
  return (
    <RequireAuth allowedRoles={[ROLE.DRIVER, ROLE.LABOR]}>
      <UserLayout>{page}</UserLayout>
    </RequireAuth>
  );
};

export default MoveDetailsPage;
