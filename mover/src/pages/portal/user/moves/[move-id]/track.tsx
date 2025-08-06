import React from "react";
import { NextPageWithLayout } from "@/layout/types";

import RequireAuth from "@/features/auth/utils/RequireAuth";
import { ROLE } from "@/constants/roles";
import UserLayout from "@/layout/user-layout/UserLayout";
import { useRouter } from "next/router";
import sm from "@/configs/site-map";
import MoveTrack from "@/features/moves/move-details/user/tracking/MoveTrack";
import DocumentTitle from "@/components/meta/DocumentTitle";

const MoveDetailsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const moveId = router.query?.["move-id"];

  if (typeof moveId !== "string") {
    router.replace(sm.portal.user.moves.upcoming.url);
    return null;
  }
  return (
    <>
      <DocumentTitle title="Track your move" />
      <MoveTrack moveId={moveId} />
    </>
  );
};

MoveDetailsPage.getLayout = (page: React.ReactElement) => {
  return (
    <RequireAuth allowedRoles={[ROLE.USER]}>
      <UserLayout>{page}</UserLayout>
    </RequireAuth>
  );
};

export default MoveDetailsPage;
