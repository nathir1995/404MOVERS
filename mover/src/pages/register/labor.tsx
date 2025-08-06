import React from "react";

import commonStyles from "@/assets/scss/common.module.scss";
import colors from "@/assets/scss/colors.module.scss";
import styles from "@/styles/register.module.scss";

import DocumentTitle from "@/components/meta/DocumentTitle";
import LaborRegisterForm from "@/features/auth/mover-register/labor/LaborRegisterForm";
import Image from "next/image";

import IMG from "@/assets/images/thumb1.jpg";
import NotRequireAuth from "@/features/auth/utils/NotRequireAuth";
import { NextPageWithLayout } from "@/layout/types";
import MainLayout from "@/layout/MainLayout";

const RegisterAsLabor: NextPageWithLayout = () => {
  return (
    <div style={{ backgroundColor: colors.bg }}>
      <NotRequireAuth>
        <DocumentTitle title="Register As Labor" />
        <div className={commonStyles.page}>
          <main className="page__content" style={{ paddingBlock: "4em" }}>
            <div className={styles.content}>
              <div className={styles.img_container}>
                <Image
                  src={IMG}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
              <div className={styles.container}>
                <LaborRegisterForm />
              </div>
            </div>
          </main>
        </div>
      </NotRequireAuth>
    </div>
  );
};

RegisterAsLabor.getLayout = (page: React.ReactElement) => {
  return <MainLayout disablePadding>{page}</MainLayout>;
};

export default RegisterAsLabor;
