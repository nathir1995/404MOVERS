import React from "react";

import styles from "./Footer.module.scss";
import { companyLinks, links } from "@/configs/footerLinks";
import Link from "next/link";
import socialMedia from "@/data/social_media";
import { APP_NAME } from "@/configs/globals";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="page__content">
        <div className={styles.content_container}>
          <div>
            <h4>COMPANY</h4>
            <div className={styles.links_container}>
              {companyLinks.map((item) => (
                <Link key={item.link} href={item.link}>
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4>LINKS</h4>
            <div className={styles.links_container}>
              {links.map((item) => (
                <Link key={item.link} href={item.link}>
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4>SOCIAL MEDIA</h4>
            <div className={styles.social_media_container}>
              {socialMedia.map((item) => (
                <Link
                  key={item.link}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {<item.Icon size={30} color="#fff" />}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.copyright_container}>
          <p>2023 © All Rights Reserved | {APP_NAME} Inc.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
