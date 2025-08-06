import React from "react";

import commonStyles from "@/assets/scss/common.module.scss";
import colors from "@/assets/scss/colors.module.scss";
import styles from "@/styles/register.module.scss";

import DocumentTitle from "@/components/meta/DocumentTitle";
import DriverRegsiterForm from "@/features/auth/mover-register/driver/DriverRegisterForm";
import Image from "next/image";

import IMG from "@/assets/images/register-driver.png";
import NotRequireAuth from "@/features/auth/utils/NotRequireAuth";
import { NextPageWithLayout } from "@/layout/types";
import MainLayout from "@/layout/MainLayout";

const RegisterAsDriver: NextPageWithLayout = () => {
  return (
    <div style={{ backgroundColor: colors.bg }}>
      <NotRequireAuth>
        <DocumentTitle title="Register As Driver" />
        <div className={commonStyles.page}>
          <main className="page__content" style={{ paddingBlock: "4em" }}>
            <div className={styles.content}>
              <div className={styles.img_container}>
                <Image src={IMG} alt="" />
              </div>
              <div className={styles.container}>
                <DriverRegsiterForm />
              </div>
            </div>
          </main>
        </div>
      </NotRequireAuth>
    </div>
  );
};

RegisterAsDriver.getLayout = (page: React.ReactElement) => {
  return <MainLayout disablePadding>{page}</MainLayout>;
};

export default RegisterAsDriver;
