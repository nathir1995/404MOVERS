import React from "react";
import colors from "@/assets/scss/colors.module.scss";

import RequireAuth from "@/features/auth/utils/RequireAuth";
import FallbackPage from "@/components/FallbackPage";
import { useRouter } from "next/router";
import useAuth from "@/features/auth/utils/useAuth";
import { ROLE } from "@/constants/roles";

const PortalSelector = () => {
  const router = useRouter();
  const { role, logout } = useAuth();

  React.useEffect(() => {
    if (role === ROLE.DRIVER) router.replace("/portal/mover");
    else if (role === ROLE.LABOR) router.replace("/portal/mover");
    else if (role === ROLE.USER) router.replace("/portal/user");
    else if (role === "admin") {
      logout();
      router.replace("/login");
    }
  }, [role]);

  return <FallbackPage />;
};

const Portal = () => {
  return (
    <RequireAuth>
      <div style={{ backgroundColor: colors.bg }}>
        <PortalSelector />
      </div>
    </RequireAuth>
  );
};

export default Portal;
