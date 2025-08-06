import React from "react";

import DocumentTitle from "@/components/meta/DocumentTitle";
import colors from "@/assets/scss/colors.module.scss";

import Faq from "@/components/Faq";
import { NextPageWithLayout } from "@/layout/types";
import MainLayout from "@/layout/MainLayout";

const FAQPage: NextPageWithLayout = () => {
  return (
    <>
      <DocumentTitle title="Frequently Asked Questions" />
      <div>
        <main className="page__content" style={{ paddingBlock: "3em" }}>
          <h1 style={{ marginBottom: "1rem" }}>
            Frequently Asked Questions -{" "}
            <span style={{ color: colors.primary }}>FAQ</span>
          </h1>
          <Faq />
        </main>
      </div>
    </>
  );
};

FAQPage.getLayout = (page: React.ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default FAQPage;
