import React from "react";

import styles from "@/styles/Home.module.scss";
import colors from "@/assets/scss/colors.module.scss";

import Image from "next/image";
import HERO_IMG from "@/assets/images/hero.webp";
import Button from "@/components/Button";

import Link from "next/link";

import ReviewsCarousel from "@/components/ReviewsCarousel";
import BigBoxRetailersIMG from "@/assets/images/icons/big-box-retailers.png";
import IndividualsIMG from "@/assets/images/icons/house.png";
import PinnedMap from "@/components/PinnedMap";
import Hero from "@/components/Hero";

import { NextPageWithLayout } from "@/layout/types";
import MainLayout from "@/layout/MainLayout";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Hero
        backgroundImageSrc={HERO_IMG.src}
        containerClassName={styles.hero_container}
      >
        <div className={styles.hero_section_content}>
          <h5>I Like to move it move it</h5>
          <h1 style={{ lineHeight: 1.25, marginTop: "1.25em" }}>
            <span className={styles.title_left}>404</span>
            <span className={styles.title_right}>MOVERS</span>
          </h1>
          <h3 style={{ lineHeight: 1.25, marginBottom: "1.25em" }}>Delivers</h3>

          <p style={{ marginBottom: "3rem" }}>
            Province wide, same-day and scheduled delivery with exceptional
            customer satisfaction.
          </p>

          <div className={styles.hero_btn_container}>
            <Link href={"/"}>
              {/** TODO: LINK */}
              <Button variant="outlined">GET A QUOTE</Button>
            </Link>
          </div>
        </div>
      </Hero>

      <main className="page__content">
        <section className={styles.same_day_section}>
          <h2 className={styles.title}>
            <span style={{ color: colors.primary }}>Same</span>-day delivery for
            all
          </h2>
          <h6 className={styles.desc}>
            From large retail to personal delivery, you can now have bulky items
            delivered on your terms.
          </h6>
          <div className={styles.items_container}>
            <div className={styles.item}>
              <Image src={BigBoxRetailersIMG} alt="Big Box Retailers" />
              <h5>Big Box Retailers</h5>
              <p>
                Provide your customers with consistent, flexible, delivery
                integrated delivery.
              </p>
            </div>
            <div className={styles.item}>
              <Image src={IndividualsIMG} alt="Individuals" />
              <h5>Individuals</h5>
              <p>
                Whether you&apos;re moving a sofa or desk, 404movers can lend a
                hand.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.reviewsSection}>
          <h3 style={{ marginBottom: ".25em", textAlign: "center" }}>
            Our <span style={{ color: colors.primary }}>Reviews</span>
          </h3>
          <ReviewsCarousel />
        </section>

        <section className={styles.section}>
          <PinnedMap />
        </section>

        <section className={`${styles.section} ${styles.last_section}`}>
          <h2>
            Start earning with{" "}
            <span style={{ color: colors.primary }}>404Movers</span>
          </h2>
          <h4>Build your own delivery business</h4>
          <div className={styles.btn_container}>
            <Link href="/more-info/movers">
              <Button style={{ fontWeight: "bold", letterSpacing: "1px" }}>
                GET STARTED
              </Button>
            </Link>
          </div>
          <p>
            Join 404Movers and use your truck, trailer, or just your hands to
            get paid working whenever you choose.
          </p>
        </section>
      </main>
    </>
  );
};

Home.getLayout = (page: React.ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
