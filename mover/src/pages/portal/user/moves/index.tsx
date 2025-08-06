import React from "react";
import { NextPageWithLayout } from "@/layout/types";
import RequireAuth from "@/features/auth/utils/RequireAuth";
import { ROLE } from "@/constants/roles";
import UserLayout from "@/layout/user-layout/UserLayout";
import DocumentTitle from "@/components/meta/DocumentTitle";
import IndexMovesUser from "@/features/moves/index-moves/user/IndexMovesUser";

const IndexMovesPage: NextPageWithLayout = () => {
  return <IndexMovesUser />;
};

IndexMovesPage.getLayout = (page: React.ReactElement) => {
  return (
    <RequireAuth allowedRoles={[ROLE.USER]}>
      <DocumentTitle title="My Moves" />
      <UserLayout>{page}</UserLayout>
    </RequireAuth>
  );
};

export default IndexMovesPage;
