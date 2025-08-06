import React from "react";
import Image from "next/image";
import { APP_NAME } from "@/configs/globals";
import LOGO from "@/assets/images/logo.png";
import ScaleLoader from "react-spinners/ScaleLoader";
import colors from "@/assets/scss/colors.module.scss";

type IProps = {
  withLoading?: boolean;
  withLogo?: boolean;
};

const FallbackPage = ({ withLoading = true, withLogo = false }: IProps) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.bg,
      }}
    >
      {withLogo && (
        <Image
          src={LOGO}
          alt={APP_NAME}
          style={{
            maxWidth: "min(80%, 10rem)",
            height: "auto",
            display: "block",
            objectFit: "contain",
            marginBottom: withLoading ? "3rem" : 0,
          }}
        />
      )}
      <div
        style={{ opacity: withLoading ? 1 : 0, transition: "opacity 200ms" }}
      >
        <ScaleLoader color={colors.primary} />
      </div>
    </div>
  );
};

export default FallbackPage;
