import React from "react";
import { NextPageWithLayout } from "@/layout/types";
import RequireAuth from "@/features/auth/utils/RequireAuth";
import { ROLE } from "@/constants/roles";
import UserLayout from "@/layout/user-layout/UserLayout";
import BookMove from "@/features/book-move/BookMove";
import DocumentTitle from "@/components/meta/DocumentTitle";
import { APIProvider } from "@vis.gl/react-google-maps";
// import Head from "next/head";

const CreateMovePage: NextPageWithLayout = () => {
  return (
    <>
      <DocumentTitle title="Book your move" />
      {/* <Head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&libraries=places&callback=initializeMap`}
          async
          defer
        ></script>
      </Head> */}
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!}>
        <BookMove />
      </APIProvider>
    </>
  );
};

CreateMovePage.getLayout = (page: React.ReactElement) => {
  return (
    <RequireAuth allowedRoles={[ROLE.USER]}>
      <UserLayout>{page}</UserLayout>
    </RequireAuth>
  );
};

export default CreateMovePage;
