import React from "react";
import Head from "next/head";
import { APP_META_TITLE, APP_URL } from "@/configs/globals";
import { APP_META_KEYWORDS, APP_META_DESCRIPTION } from "@/configs/globals";

const AppHead = () => {
  return (
    <Head>
      <meta
        key="viewport"
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <title>{APP_META_TITLE}</title>

      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />

      <meta name="keywords" content={APP_META_KEYWORDS} />

      <meta
        key="description"
        name="description"
        content={APP_META_DESCRIPTION}
      />
      <meta key="og:title" property="og:title" content={APP_META_TITLE} />
      <meta
        key="og:description"
        property="og:description"
        content={APP_META_DESCRIPTION}
      />

      <meta key="og:url" property="og:url" content={APP_URL} />
      <meta
        key="og:site_name"
        property="og:site_name"
        content={APP_META_TITLE}
      />
      <meta key="og:type" property="og:type" content="website" />

      <meta key="og:image:type" property="og:image:type" content="image/png" />
      <meta key="og:image:width" property="og:image:width" content="1000" />
      <meta key="og:image:height" property="og:image:height" content="1000" />
      <meta
        key="og:image"
        property="og:image"
        content={`${APP_URL}/thumbnail.png`}
      />
      <meta
        key="og:image:secure_url"
        property="og:image:secure_url"
        content={`${APP_URL}/thumbnail.png`}
      />

      <meta
        key="twitter:card"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta key="twitter:title" name="twitter:title" content={APP_META_TITLE} />
      <meta
        key="twitter:description"
        name="twitter:description"
        content={APP_META_DESCRIPTION}
      />
      <meta
        key="twitter:image"
        name="twitter:image"
        content={`${APP_URL}/thumbnail.png`}
      />
    </Head>
  );
};

export default AppHead;
