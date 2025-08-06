import React from "react";

import colors from "@/assets/scss/colors.module.scss";
import DocumentTitle from "@/components/meta/DocumentTitle";
import homeStyles from "@/styles/commonStyles.module.scss";
import styles from "@/styles/get-started.module.scss";

import Button from "@/components/Button";
import Link from "next/link";
import HERO_IMG from "@/assets/images/truck-bg.jpeg";
import bookOptions from "@/data/bookOptions";
import Hero from "@/components/Hero";
import { NextPageWithLayout } from "@/layout/types";
import MainLayout from "@/layout/MainLayout";

const GetStartedPage: NextPageWithLayout = () => {
  return (
    <>
      <DocumentTitle title="Schedule a 404Move" />
      <>
        <Hero
          backgroundImageSrc={HERO_IMG.src}
          containerClassName={styles.hero_container}
        >
          <div className={styles.hero_section_content}>
            <h1>
              Schedule a <span style={{ color: colors.primary }}>404Move</span>
            </h1>
            <h4>Register here if you&apos;re not registered yet</h4>

            <div className={styles.center}>
              <Link href={"/register"}>
                <Button
                  variant="outlined"
                  style={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </Hero>

        <main className="page__content" style={{ paddingBlock: "3em" }}>
          <section className={homeStyles.same_day_section}>
            <h2 className={homeStyles.title}>
              <span style={{ color: colors.primary }}>Same</span>-day delivery
              for all
            </h2>
            <h6 className={homeStyles.desc}>
              From large retail to personal delivery, you can now have bulky
              items delivered on your terms.
            </h6>
            <div
              className={`${homeStyles.items_container} ${styles.items_container}`}
            >
              {bookOptions.map((item) => (
                <div
                  className={`${homeStyles.item} ${styles.item}`}
                  key={item.title}
                >
                  <div>
                    <item.Icon size={42} style={{ color: colors.primary }} />
                    <h5>{item.title}</h5>
                  </div>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </>
    </>
  );
};

GetStartedPage.getLayout = (page: React.ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default GetStartedPage;
