import AppHead from "@/components/meta/AppHead";
import "@/styles/globals.scss";

import queryClient from "@/configs/queryClient";
import { AuthProvider } from "@/features/auth/utils/useAuth";
import { QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { NextPageWithLayout } from "@/layout/types";
import type { AppProps } from "next/app";

// NEW: import the ErrorBoundary component (place ErrorBoundary.tsx in your components folder)
import ErrorBoundary from "@/components/ErrorBoundary";

import { FirebaseContextProvider } from "@/firebase/FirebaseContext";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ErrorBoundary>
      <FirebaseContextProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <AppHead />
            {getLayout(<Component {...pageProps} />)}
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </QueryClientProvider>
        </AuthProvider>
      </FirebaseContextProvider>
    </ErrorBoundary>
  );
}
