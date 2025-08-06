import React from "react";
import { NextPageWithLayout } from "@/layout/types";
import RequireAuth from "@/features/auth/utils/RequireAuth";
import { ROLE } from "@/constants/roles";
import UserLayout from "@/layout/user-layout/UserLayout";
import DocumentTitle from "@/components/meta/DocumentTitle";
import UpcomingMovesMover from "@/features/moves/index-moves/mover/UpcomingMovesMover";

const UpcomingMovesPage: NextPageWithLayout = () => {
  return <UpcomingMovesMover />;
};

UpcomingMovesPage.getLayout = (page: React.ReactElement) => {
  return (
    <RequireAuth allowedRoles={[ROLE.DRIVER, ROLE.LABOR]}>
      <DocumentTitle title="Upcoming Moves" />
      <UserLayout>{page}</UserLayout>
    </RequireAuth>
  );
};

export default UpcomingMovesPage;
