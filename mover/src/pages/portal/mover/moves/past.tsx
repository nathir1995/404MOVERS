import React from "react";
import { NextPageWithLayout } from "@/layout/types";
import RequireAuth from "@/features/auth/utils/RequireAuth";
import { ROLE } from "@/constants/roles";
import UserLayout from "@/layout/user-layout/UserLayout";
import DocumentTitle from "@/components/meta/DocumentTitle";
import PastMovesMover from "@/features/moves/index-moves/mover/PastMovesMover";

const PastMovesPage: NextPageWithLayout = () => {
  return <PastMovesMover />;
};

PastMovesPage.getLayout = (page: React.ReactElement) => {
  return (
    <RequireAuth allowedRoles={[ROLE.DRIVER, ROLE.LABOR]}>
      <DocumentTitle title="Past Moves" />
      <UserLayout>{page}</UserLayout>
    </RequireAuth>
  );
};

export default PastMovesPage;
