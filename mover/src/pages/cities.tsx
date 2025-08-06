import React from "react";

import colors from "@/assets/scss/colors.module.scss";
import PinnedMap from "@/components/PinnedMap";
import DocumentTitle from "@/components/meta/DocumentTitle";
import { NextPageWithLayout } from "@/layout/types";
import MainLayout from "@/layout/MainLayout";

const CitiesPage: NextPageWithLayout = () => {
  return (
    <>
      <DocumentTitle title="Cities" />
      <div style={{ backgroundColor: colors.bg }}>
        <main className="page__content" style={{ paddingBlock: "4em" }}>
          <PinnedMap />
        </main>
      </div>
    </>
  );
};

CitiesPage.getLayout = (page: React.ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default CitiesPage;
