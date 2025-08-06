import React from "react";
import { Spinner } from "reactstrap";

const LoadingLayer = () => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, .4)",
        zIndex: 3,
      }}
    >
      <Spinner size="lg" color="warning" />
    </div>
  );
};

export default LoadingLayer;
