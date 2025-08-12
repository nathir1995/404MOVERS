import React from "react";

import homeStyles from "@/styles/commonStyles.module.scss";
import colors from "@/assets/scss/colors.module.scss";
import styles from "@/styles/more-info.module.scss";

import Image from "next/image";
import HERO_IMG from "@/assets/images/more-info/individuals.jpg";
import Link from "next/link";
import Button from "@/components/Button";
import HowItWorksSteps from "@/components/HowItWorksSteps/HowItWorksSteps";
import individualsSteps from "@/data/individualsSteps";
import PinnedMap from "@/components/PinnedMap";
import advantageItems from "@/data/advantages";
import DocumentTitle from "@/components/meta/DocumentTitle";
import { NextPageWithLayout } from "@/layout/types";
import MainLayout from "@/layout/MainLayout";
import { safeMap, hasItems } from "@/utility/arraySafety";

const MoreInfoIndividualsPage: NextPageWithLayout = () => {
  return (
    <>
      <DocumentTitle title="For Individuals" />
      <div>
        <main className="page__content" style={{ paddingBlock: "3em" }}>
          <section
            className={`${homeStyles.hero_section} ${styles.hero_section}`}
          >
            <div className={homeStyles.content}>
              <h1>
                Moving Made <span style={{ color: colors.primary }}>EASY!</span>
              </h1>
              <p>
                <span style={{ color: colors.primary }}>404MOVERS</span>{" "}
                connects you to Movers that bring the truck and manpower to get
                you covered for your moving needs.
              </p>
              <Link href="/book/get-started">
                <Button style={{ fontWeight: "bold", letterSpacing: "1px" }}>
                  GET STARTED
                </Button>
              </Link>
            </div>
            <Image src={HERO_IMG} alt="" />
          </section>

          <section className={styles.section} style={{ paddingInline: "1rem" }}>
            <h2 style={{ textAlign: "center" }}>
              Get the moving <span style={{ color: colors.primary }}>help</span>{" "}
              you need
            </h2>
            <h3 style={{ textAlign: "center", marginBlock: "1rem" }}>
              <span style={{ color: colors.primary }}>How</span> it works?
            </h3>

            <HowItWorksSteps steps={individualsSteps} />
          </section>

          <section style={{ paddingBlock: "2rem" }}>
            <h3 style={{ textAlign: "center" }}>
              If it&apos;s heavy,{" "}
              <span style={{ color: colors.primary }}>
                get it with 404MOVERS!
              </span>
            </h3>
            <div className={styles.items_container}>
              {safeMap(advantageItems, (item) => (
                <div className={styles.item} key={item.title}>
                  <div>
                    <item.Icon size={48} style={{ color: colors.primary }} />
                    <h5>{item.title}</h5>
                  </div>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <PinnedMap />
          </section>
        </main>
      </div>
    </>
  );
};

MoreInfoIndividualsPage.getLayout = (page: React.ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default MoreInfoIndividualsPage;
