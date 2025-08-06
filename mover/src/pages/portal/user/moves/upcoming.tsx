import React from "react";
import { NextPageWithLayout } from "@/layout/types";
import RequireAuth from "@/features/auth/utils/RequireAuth";
import { ROLE } from "@/constants/roles";
import UserLayout from "@/layout/user-layout/UserLayout";
import DocumentTitle from "@/components/meta/DocumentTitle";
import UpcomingMovesUser from "@/features/moves/index-moves/user/UpcomingMovesUser";

const UpcomingMovesPage: NextPageWithLayout = () => {
  return <UpcomingMovesUser />;
};

UpcomingMovesPage.getLayout = (page: React.ReactElement) => {
  return (
    <RequireAuth allowedRoles={[ROLE.USER]}>
      <DocumentTitle title="Upcoming Moves" />
      <UserLayout>{page}</UserLayout>
    </RequireAuth>
  );
};

export default UpcomingMovesPage;
