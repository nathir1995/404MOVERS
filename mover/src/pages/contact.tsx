import React from "react";

import colors from "@/assets/scss/colors.module.scss";
import DocumentTitle from "@/components/meta/DocumentTitle";
import ContactUsForm from "@/components/ContactUsForm";
import styles from "@/styles/contact.module.scss";
import Image from "next/image";

import LOGO from "@/assets/images/logo.png";
import socialMedia from "@/data/social_media";
import { NextPageWithLayout } from "@/layout/types";
import MainLayout from "@/layout/MainLayout";

const ContactUsPage: NextPageWithLayout = () => {
  return (
    <>
      <DocumentTitle title="Contact Us" />
      <div>
        <main className="page__content" style={{ paddingBlock: "4em" }}>
          <div className={styles.layout_container}>
            <div>
              <Image className={styles.logo} src={LOGO} alt="" />
              <div className={styles.social_media_container}>
                {socialMedia.map(({ link, Icon }) => (
                  <a
                    href={link}
                    key={link}
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    <Icon size={30} color={colors.primary} />
                  </a>
                ))}
              </div>
            </div>
            <ContactUsForm />
          </div>
        </main>
      </div>
    </>
  );
};

ContactUsPage.getLayout = (page: React.ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default ContactUsPage;
