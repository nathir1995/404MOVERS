import React from "react";
import axios from "axios";
import { tokenStorage } from "./tokenStorage";

const Context = React.createContext();

export const useAccessToken = () => React.useContext(Context);

const AccessTokenProvider = ({ children }) => {
  const [accessToken, _setAccessToken] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const setAccessToken = React.useCallback(
    (value) => {
      _setAccessToken(value);
      tokenStorage.store(value);
    },
    [_setAccessToken]
  );

  React.useEffect(() => {
    setIsLoading(true);
    const TOKEN = tokenStorage.get();
    if (TOKEN) {
      axios
        .get("https://www.googleapis.com/oauth2/v1/tokeninfo", {
          params: {
            access_token: TOKEN,
          },
        })
        .then((response) => {
          console.log("Google Token Verified", response.data);
          _setAccessToken(TOKEN);
        })
        .catch((err) => {
          console.log("Error in Verifying Google Token", err);
          tokenStorage.remove();
        });
    }
    setIsLoading(false);
  }, []);

  const memoedValue = React.useMemo(
    () => ({
      isLoading,
      accessToken,
      setAccessToken,
      error,
      setError,
      isSuccess: !isLoading && !error && accessToken,
    }),
    [accessToken, setAccessToken, error, setError, isLoading]
  );

  return <Context.Provider value={memoedValue}>{children}</Context.Provider>;
};
export default AccessTokenProvider;
