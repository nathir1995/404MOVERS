import React from "react";
import AppHead from "@/components/meta/AppHead";
import "@/styles/globals.scss";

import queryClient from "@/configs/queryClient";
import { AuthProvider } from "@/features/auth/utils/useAuth";
import { QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { NextPageWithLayout } from "@/layout/types";
import type { AppProps } from "next/app";

import ErrorBoundary from "@/components/ErrorBoundary";
import GlobalErrorBoundary from "@/components/GlobalErrorBoundary";
import { FirebaseContextProvider } from "@/firebase/FirebaseContext";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  // ✅ FIXED: Added window error handler for unhandled promise rejections
  React.useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      // Prevent the error from being logged to the console
      event.preventDefault();
    };

    const handleError = (event: ErrorEvent) => {
      console.error('Global error:', event.error);
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <GlobalErrorBoundary>
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
    </GlobalErrorBoundary>
  );
}
