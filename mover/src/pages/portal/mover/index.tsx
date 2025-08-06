import React from "react";

import RequireAuth from "@/features/auth/utils/RequireAuth";
import { ROLE } from "@/constants/roles";
import { NextPageWithLayout } from "@/layout/types";
import UserLayout from "@/layout/user-layout/UserLayout";

import Image from "next/image";
import LOGO from "@/assets/images/logo.png";
import colors from "@/assets/scss/colors.module.scss";
import Link from "next/link";
import sm from "@/configs/site-map";
import Button from "@/components/Button";

const MoverIndexPortal: NextPageWithLayout = () => {
  return (
    <div
      style={{
        padding: "2em 1em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Image
        src={LOGO}
        alt=""
        style={{
          maxWidth: "10rem",
          height: "auto",
          display: "block",
        }}
      />
      <h3 style={{ textAlign: "center", marginBlock: "1rem" }}>
        Welcome to <span style={{ color: colors.primary }}>404 Movers!</span>
      </h3>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Link href={sm.portal.mover.moves.my.url}>
          <Button variant="outlined" style={{ fontWeight: "bold" }}>
            My Moves
          </Button>
        </Link>
        <Link href={sm.portal.mover.moves.upcoming.url}>
          <Button variant="outlined" style={{ fontWeight: "bold" }}>
            Upcoming Moves
          </Button>
        </Link>
      </div>
    </div>
  );
};

MoverIndexPortal.getLayout = (page: React.ReactElement) => {
  return (
    <RequireAuth allowedRoles={[ROLE.DRIVER, ROLE.LABOR]}>
      <UserLayout>{page}</UserLayout>
    </RequireAuth>
  );
};

export default MoverIndexPortal;
