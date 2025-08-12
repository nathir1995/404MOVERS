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
import { setupErrorHandling, setupDevelopmentErrorHandling, setupProductionErrorHandling } from "@/utils/errorSetup";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  // ✅ FIXED: Initialize comprehensive error handling system
  React.useEffect(() => {
    // Setup error handlers for all environments
    setupErrorHandling();
    
    // Setup environment-specific error handling
    setupDevelopmentErrorHandling();
    setupProductionErrorHandling();
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
