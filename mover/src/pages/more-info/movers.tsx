import React from "react";

import homeStyles from "@/styles/commonStyles.module.scss";
import colors from "@/assets/scss/colors.module.scss";
import styles from "@/styles/more-info.module.scss";

import Image from "next/image";
import HERO_IMG from "@/assets/images/more-info/hero_helpers.png";
import Link from "next/link";
import Button from "@/components/Button";

import HowItWorksSteps from "@/components/HowItWorksSteps/HowItWorksSteps";
import moversSteps from "@/data/moversSteps";
import PinnedMap from "@/components/PinnedMap";

import { FaUser, FaTruck } from "react-icons/fa";
import whyToJoinItems from "@/data/whyToJoin";
import DocumentTitle from "@/components/meta/DocumentTitle";
import { NextPageWithLayout } from "@/layout/types";
import MainLayout from "@/layout/MainLayout";
import { safeMap, hasItems } from "@/utility/arraySafety";

const MoreInfoMoversPage: NextPageWithLayout = () => {
  return (
    <>
      <DocumentTitle title="Become a Mover" />
      <div>
        <main className="page__content" style={{ paddingBlock: "2em" }}>
          <section
            className={`${homeStyles.hero_section} ${styles.hero_section}`}
          >
            <div className={homeStyles.content}>
              <h1>
                Build a delivery business{" "}
                <span style={{ color: colors.primary }}>on your terms!</span>
              </h1>
              <p>
                Use your truck, trailer, van, or just your muscle to work
                whenever you choose.
              </p>

              <div className={styles.become_btns_container}>
                <Link href={"/register/driver"}>
                  <Button>Become a Driver</Button>
                </Link>
                <Link href={"/register/labor"}>
                  <Button>Become a Labor</Button>
                </Link>
              </div>
            </div>
            <Image src={HERO_IMG} alt="" className={styles.helpers_hero_img} />
          </section>

          <section style={{ paddingBlock: "2rem" }}>
            <div className={`${styles.items_container} ${styles.helpers}`}>
              {safeMap([
                {
                  profit: "$2.5 K",
                  Icon: FaTruck,
                  btnText: "Apply As a Driver",
                  link: "/register/driver",
                },
                {
                  profit: "$1.5 K",
                  Icon: FaUser,
                  btnText: "Apply As a Labor",
                  link: "/register/labor",
                },
              ], (item, idx) => (
                <div className={styles.item} key={idx}>
                  <div>
                    <item.Icon size={62} style={{ color: colors.primary }} />
                    <h5>
                      <span style={{ fontSize: "1.1em" }}>ZERO</span>{" "}
                      commission!
                    </h5>
                  </div>
                  <p style={{ marginBottom: "1rem" }}>
                    Our active members can make up to{" "}
                    <span
                      style={{
                        color: colors.primary,
                        fontWeight: "bold",
                        fontSize: "1.25em",
                      }}
                    >
                      {item.profit}
                    </span>{" "}
                    / week!
                  </p>
                  <Link href={item.link}>
                    <Button style={{ fontWeight: "bold" }}>
                      {item.btnText}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.section} style={{ paddingInline: "1rem" }}>
            <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
              <span style={{ color: colors.primary }}>How</span> it works?
            </h2>

            <HowItWorksSteps steps={moversSteps} />
          </section>

          <section className={styles.section}>
            <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
              Here&apos;s why people are joining{" "}
              <span style={{ color: colors.primary }}>404Movers</span>
            </h3>
            <div className={`${styles.items_container} ${styles.why_to_join}`}>
              {safeMap(whyToJoinItems, (item) => (
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

MoreInfoMoversPage.getLayout = (page: React.ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default MoreInfoMoversPage;
