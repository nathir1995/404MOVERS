import React from "react";
import { NextPageWithLayout } from "@/layout/types";
import RequireAuth from "@/features/auth/utils/RequireAuth";
import { ROLE } from "@/constants/roles";
import UserLayout from "@/layout/user-layout/UserLayout";
import DocumentTitle from "@/components/meta/DocumentTitle";
import DraftMovesUser from "@/features/moves/index-moves/user/DraftMovesUser";

const DraftMovesPage: NextPageWithLayout = () => {
  return <DraftMovesUser />;
};

DraftMovesPage.getLayout = (page: React.ReactElement) => {
  return (
    <RequireAuth allowedRoles={[ROLE.USER]}>
      <DocumentTitle title="Draft Moves" />
      <UserLayout>{page}</UserLayout>
    </RequireAuth>
  );
};

export default DraftMovesPage;
