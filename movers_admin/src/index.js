import { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { IntlProviderWrapper } from "./utility/context/Internationalization";
import { Layout } from "./utility/context/Layout";
// import * as serviceWorker from "./serviceWorker";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./components/@vuexy/spinner/Fallback-spinner";
import "./index.scss";
import { store } from "./store";

import ErrorBoundary from "components/ErrorBoundary";
import ChatContextProvidor from "utility/context/ChatContext";
import { FirebaseContextProvider } from "./@firebase/FirebaseContext";

const LazyApp = lazy(() => import("./App"));
const ErrorPage = lazy(() => import("views/pages/misc/error/500"));
// import LazyApp from "./App";

// configureDatabase()

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //TODO Remove retry: 0
      retry: 0,
      retryDelay: 3000,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.render(
  <FirebaseContextProvider>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Spinner />}>
          <Layout>
            <IntlProviderWrapper>
              <ChatContextProvidor>
                <ErrorBoundary fallback={<ErrorPage />}>
                  <LazyApp />
                </ErrorBoundary>
                <ToastContainer />
              </ChatContextProvidor>
            </IntlProviderWrapper>
          </Layout>
        </Suspense>
      </QueryClientProvider>
    </Provider>
  </FirebaseContextProvider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
// if (module.hot) {
//   module.hot.accept();
// }
