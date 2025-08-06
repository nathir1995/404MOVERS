import React from "react";
import Head from "next/head";
import { APP_NAME } from "@/configs/globals";

interface IProps {
  title: string;
}

const DocumentTitle = ({ title }: IProps) => {
  return (
    <Head>
      <title>{`${APP_NAME} - ${title}`}</title>
      <meta
        key="og:title"
        property="og:title"
        content={`${APP_NAME} - ${title}`}
      />
      <meta
        key="twitter:title"
        name="twitter:title"
        content={`${APP_NAME} - ${title}`}
      />
    </Head>
  );
};

export default DocumentTitle;
