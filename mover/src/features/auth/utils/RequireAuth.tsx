import React from "react";
import { useRouter } from "next/router";
import useAuth from "./useAuth";
import FallbackPage from "@/components/FallbackPage";
import { ROLE } from "@/constants/roles";

type IProps = {
  children: React.ReactNode;
  redirectTo?: string;
  fallback?: React.ReactNode;
  allowedRoles?: ROLE[];
};

const RequireAuth = ({
  children,
  redirectTo = "/login",
  allowedRoles,
}: IProps) => {
  const router = useRouter();
  const { isAuthenticated, role, loadingInitial } = useAuth();

  const canAccess = React.useMemo(
    () =>
      isAuthenticated &&
      (!allowedRoles || allowedRoles.find((r) => r === role)),
    [isAuthenticated, role]
  );

  React.useEffect(() => {
    if (!canAccess && !loadingInitial) {
      if (isAuthenticated) {
        router.replace("/portal");
      } else {
        router.replace(redirectTo);
      }
    }
  }, [canAccess, isAuthenticated, loadingInitial]);

  if (loadingInitial || !canAccess) {
    return <FallbackPage withLoading={true} />;
  }
  return children;
};

export default RequireAuth;
