import React from "react";

import commonStyles from "@/assets/scss/common.module.scss";
import colors from "@/assets/scss/colors.module.scss";
import styles from "@/styles/register.module.scss";

import DocumentTitle from "@/components/meta/DocumentTitle";
import UserRegisterForm from "@/features/auth/user-register/UserRegisterForm";
import Image from "next/image";

import IMG from "@/assets/images/logo.png";
import NotRequireAuth from "@/features/auth/utils/NotRequireAuth";
import { NextPageWithLayout } from "@/layout/types";
import MainLayout from "@/layout/MainLayout";

const RegisterAsUser: NextPageWithLayout = () => {
  return (
    <div style={{ backgroundColor: colors.bg }}>
      <NotRequireAuth>
        <DocumentTitle title="Register" />
        <div className={commonStyles.page}>
          <main className="page__content" style={{ paddingBlock: "4em" }}>
            <div className={styles.content}>
              <div className={styles.img_container}>
                <Image src={IMG} alt="" />
              </div>
              <div className={styles.container}>
                <UserRegisterForm />
              </div>
            </div>
          </main>
        </div>
      </NotRequireAuth>
    </div>
  );
};

RegisterAsUser.getLayout = (page: React.ReactElement) => {
  return <MainLayout disablePadding>{page}</MainLayout>;
};

export default RegisterAsUser;
