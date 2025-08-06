import React from "react";
import { useRouter } from "next/router";
import useAuth from "./useAuth";
import FallbackPage from "@/components/FallbackPage";

type IProps = {
  children: React.ReactNode;
  redirectTo?: string;
  fallback?: React.ReactNode;
};

const NotRequireAuth = ({ children, redirectTo = "/portal" }: IProps) => {
  const router = useRouter();
  const { isAuthenticated, loadingInitial } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated]);

  if (loadingInitial || isAuthenticated) {
    return <FallbackPage withLoading={true} />;
  }
  return children;
};

export default NotRequireAuth;
