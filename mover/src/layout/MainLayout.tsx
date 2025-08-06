import React from "react";

import commonStyles from "@/assets/scss/common.module.scss";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollToTopButton from "@/components/ScrollToTopButton";

type IProps = {
  children: React.ReactNode;
  disablePadding?: boolean;
};

const MainLayout = ({ children, disablePadding = false }: IProps) => {
  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "100vh",
        }}
      >
        <div
          className={commonStyles.page}
          style={disablePadding ? { paddingTop: 0 } : undefined}
        >
          {children}
        </div>
        <Footer />
      </div>
      <ScrollToTopButton />
    </>
  );
};

export default MainLayout;
