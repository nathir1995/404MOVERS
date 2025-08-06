import React from "react";
import RingLoader from "react-spinners/RingLoader";
import colors from "@/assets/scss/colors.module.scss";

const LoadingPage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <RingLoader color={colors.primary} />
    </div>
  );
};

export default LoadingPage;
