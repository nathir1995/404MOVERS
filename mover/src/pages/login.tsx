import React from "react";

import commonStyles from "@/assets/scss/common.module.scss";
import colors from "@/assets/scss/colors.module.scss";
import styles from "@/styles/login.module.scss";

import DocumentTitle from "@/components/meta/DocumentTitle";
import LoginForm from "@/features/auth/login/components/LoginForm";
import Image from "next/image";

import IMG from "@/assets/images/thumb1.jpg";
import NotRequireAuth from "@/features/auth/utils/NotRequireAuth";
import { NextPageWithLayout } from "@/layout/types";
import MainLayout from "@/layout/MainLayout";

const LoginPage: NextPageWithLayout = () => {
  return (
    <div style={{ backgroundColor: colors.bg }}>
      <NotRequireAuth>
        <DocumentTitle title="Login" />
        <div className={commonStyles.page}>
          <main className="page__content" style={{ paddingBlock: "4em" }}>
            <div className={styles.content}>
              <Image src={IMG} alt="" />
              <LoginForm />
            </div>
          </main>
        </div>
      </NotRequireAuth>
    </div>
  );
};

LoginPage.getLayout = (page: React.ReactElement) => {
  return <MainLayout disablePadding>{page}</MainLayout>;
};

export default LoginPage;
