import React from "react";

import styles from "@/styles/about.module.scss";
import colors from "@/assets/scss/colors.module.scss";

import Image from "next/image";
import OurStoryIMG from "@/assets/images/about/our-story.jpg";
import OurValuesIMG from "@/assets/images/about/our-values.jpg";
import DocumentTitle from "@/components/meta/DocumentTitle";
import { NextPageWithLayout } from "@/layout/types";
import MainLayout from "@/layout/MainLayout";

const AboutUsPage: NextPageWithLayout = () => {
  return (
    <>
      <DocumentTitle title="About Us" />
      <div style={{ backgroundColor: colors.bg }}>
        <main className="page__content" style={{ paddingBlock: "3em" }}>
          <section className={`${styles.section} ${styles.top}`}>
            <div>
              <h1>
                <span style={{ color: colors.primary }}>Our</span> Story
              </h1>
              <p>
                The story began when our Founder and CEO was in high school back
                in Syria, and he was displaced in the beginning of the conflict
                that started in 2011. Nathir left most of his belongings behind
                and never came back to pick them up (until now). Luckily, Nathir
                and his family survived the war, but the grief over his
                belongings that were left behind a decade ago is still hanging
                in his heart.
              </p>
              <p>
                Thus, as a new Canadian, he believes that people should always
                have affordable means to keep their belongings and transport
                them to make the new place feel like home whenever someone
                moves. Our values of protecting customers’ belongings stem from
                the deep understanding of how important home is for us as an
                organization and for our leadership who went through certain
                hardships that ascertained these values.
              </p>
            </div>
            <Image src={OurStoryIMG} alt="" />
          </section>
          <section className={`${styles.section} ${styles.two}`}>
            <Image src={OurValuesIMG} alt="" />
            <div>
              <h1>
                Our <span style={{ color: colors.primary }}>Values</span>
              </h1>
              <p>
                404MOVERS is aware how difficult and overwhelming moving can be
                in terms of finding a new place, and logistically planning the
                moving.
              </p>
              <p>
                Thus, <strong>we believe</strong> in the right of customers to
                transport their belongings at an affordable rate without having
                to worry about operating a large vehicle or having to worry
                about finding helpers.
              </p>
              <p>
                Our business is here to help you manage your moving and make
                sure your new place feels like home by safely and smoothly
                transporting your belongings.
              </p>
            </div>
          </section>
          <section className={styles.bottom_section}>
            <h4>
              What does the <span style={{ color: colors.primary }}>404</span>{" "}
              stand for?
            </h4>
            <p>
              404 stands up for the <strong>HTTP 404</strong> Not Found response
              status code, which indicates that the server cannot find the
              requested resource. The reason{" "}
              <strong>behind choosing the name</strong> is that we believe that
              there is a significant vacuum in the moving market in Canada and
              our job is to fill in these gaps and correct the errors by
              providing an alternative to all other unaffordable or unreliable
              moving options.
            </p>
          </section>
        </main>
      </div>
    </>
  );
};

AboutUsPage.getLayout = (page: React.ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default AboutUsPage;
