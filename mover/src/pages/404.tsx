import React from "react";

import commonStyles from "@/assets/scss/common.module.scss";

import DocumentTitle from "@/components/meta/DocumentTitle";

import styles from "@/styles/404.module.scss";
import { NextPageWithLayout } from "@/layout/types";
import MainLayout from "@/layout/MainLayout";

const NotFoundPage: NextPageWithLayout = () => {
  return (
    <>
      <DocumentTitle title="404: This page could not be found" />
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className={styles.title}>
          <h1>404</h1>
          <p>This page could not be found.</p>
        </div>
      </div>
    </>
  );
};

NotFoundPage.getLayout = (page: React.ReactElement) => {
  return <MainLayout disablePadding>{page}</MainLayout>;
};

export default NotFoundPage;
