import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "store/auth/useAuth";

export const AuthComponent = (props) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect to={{ pathname: "/login" }} />;
  }

  return props.children;
};
