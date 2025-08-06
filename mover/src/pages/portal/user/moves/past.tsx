import React from "react";
import { NextPageWithLayout } from "@/layout/types";
import RequireAuth from "@/features/auth/utils/RequireAuth";
import { ROLE } from "@/constants/roles";
import UserLayout from "@/layout/user-layout/UserLayout";
import DocumentTitle from "@/components/meta/DocumentTitle";
import PastMovesUser from "@/features/moves/index-moves/user/PastMovesUser";

const PastMovesPage: NextPageWithLayout = () => {
  return <PastMovesUser />;
};

PastMovesPage.getLayout = (page: React.ReactElement) => {
  return (
    <RequireAuth allowedRoles={[ROLE.USER]}>
      <DocumentTitle title="Past Moves" />
      <UserLayout>{page}</UserLayout>
    </RequireAuth>
  );
};

export default PastMovesPage;
