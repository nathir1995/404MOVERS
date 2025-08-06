import React from "react";

import commonStyles from "@/assets/scss/common.module.scss";
import styles from "@/styles/team.module.scss";
import colors from "@/assets/scss/colors.module.scss";

import teamMembers from "@/data/team";
import Image from "next/image";

import DocumentTitle from "@/components/meta/DocumentTitle";

import NotFoundPage from "./404";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "@/layout/types";
import MainLayout from "@/layout/MainLayout";

const OurTeamPage: NextPageWithLayout = () => {
  const router = useRouter();
  React.useEffect(() => {
    router.replace("/");

    //elint-disable-next-line
  }, [router]);

  return <NotFoundPage />;
  //elint-disable-next-line
  return (
    <>
      <DocumentTitle title="Our Team" />
      <div
      // style={{ backgroundColor: colors.bg }}
      >
        <main className="page__content" style={{ paddingBlock: "3em" }}>
          <h1 style={{ textAlign: "center" }}>
            <span style={{ color: colors.primary }}>Our</span> Team
          </h1>
          <div className={styles.teams_container}>
            {teamMembers.map((member) => (
              <div
                className={styles.item}
                key={`${member.first_name} ${member.last_name}`}
              >
                <div className={styles.image_container}>
                  <Image
                    src={member.image}
                    alt={`${member.first_name} ${member.last_name}`}
                  />
                </div>
                <h5>
                  {member.first_name}{" "}
                  <span style={{ color: colors.primary }}>
                    {member.last_name}
                  </span>
                </h5>
                <p>{member.role}</p>

                <div className={styles.social_media}>
                  {member.social_media.map(({ link, Icon }) => (
                    <a
                      key={link}
                      href={link}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <Icon color={colors.primary} size={24} />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

OurTeamPage.getLayout = (page: React.ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default OurTeamPage;
