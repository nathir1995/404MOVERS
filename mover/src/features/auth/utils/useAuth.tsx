import { ACCOUNT_STATUS } from "@/constants/account_status";
import { ROLE } from "@/constants/roles";
import useFirebaseContext from "@/firebase/FirebaseContext";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AuthContextType, { User } from "./AuthContextType";
import { tokenStorage } from "./tokenStorage";
import { userAPI } from "./userAPI";
// import { toast } from "react-toastify";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Export the provider as we need to wrap the entire app with it
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [openedChatId, setOpenedChatId] = useState<number | null>(null);

  const [accountStatus, setAccountStatus] =
    React.useState<ACCOUNT_STATUS | null>(null);
  const [role, setRole] = useState<ROLE | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<null | any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  // Check if there is a currently active session
  // when the provider is mounted for the first time.
  //
  // If there is an error, it means there is no session.
  //
  // Finally, just signal the component that the initial load
  // is over.
  useEffect(() => {
    const _token = tokenStorage.get();
    if (_token) {
      userAPI
        .getCurrentUser(_token)
        .then((data) => {
          const user = data?.user;
          const userRole = data?.role;
          const status = user?.mover_account_status?.key;

          setUser(user);
          setToken(_token);
          setRole(userRole);
          setAccountStatus(status);

          setIsAuthenticated(true);
          setError(null);
        })
        .catch((_error) => {
          console.log(
            "ERROR in getCurrentUser: ",
            _error?.response?.data?.message || "ERROR"
          );
          const status = _error?.response?.status;
          if (status === 401 || status === 403) {
            tokenStorage.remove();
          }
        })
        .finally(() => setLoadingInitial(false));
    } else {
      setLoadingInitial(false);
    }
  }, []);

  const authResolver = useCallback(({ data }: { data: any }) => {
    const user = data?.user;
    const token = data?.token;
    const userRole = data?.role;
    const status = user?.mover_account_status?.key;

    setUser(user);
    setToken(token);
    tokenStorage.store(token);
    setRole(userRole);
    setAccountStatus(status);

    setIsAuthenticated(true);
    setError(null);
  }, []);

  // Flags the component loading state and posts the login
  // data to the server.
  //
  // An error means that the email/password combination is
  // not valid.
  //
  // Finally, just signal the component that loading the
  // loading state is over.
  const { fcmToken } = useFirebaseContext();
  const loginViaEmail = useCallback(
    ({ email, password }: { email: string; password: string }): void => {
      setIsLoading(true);
      userAPI
        .loginViaEmail(email, password, fcmToken)
        .then(authResolver)
        .catch((_error) => {
          const isVerified = _error?.response?.data?.data?.isVerified;
          if (isVerified === false) {
            setAccountStatus(ACCOUNT_STATUS.EMAIL_VERIFICATION_PENDING);
          } else {
            setError(_error?.response?.data?.message || "ERROR in LOGIN");
            // toast.error(_error?.response?.data?.message || "ERROR in LOGIN");
          }
        })
        .finally(() => setIsLoading(false));
    },
    [authResolver, fcmToken]
  );

  const loginViaPhone = useCallback(
    ({ phone, password }: { phone: string; password: string }): void => {
      setIsLoading(true);
      userAPI
        .loginViaPhone(phone, password)
        .then(authResolver)
        .catch((_error) => {
          setError(_error?.response?.data?.message || "ERROR in LOGIN");
          // toast.error(_error?.response?.data?.message || "ERROR in LOGIN");
        })
        .finally(() => setIsLoading(false));
    },
    [authResolver]
  );

  // Call the logout endpoint and then remove the user
  // from the state.
  const logout = useCallback((): void => {
    setUser(null);
    setIsAuthenticated(false);
    tokenStorage.remove();

    userAPI
      .logout(token)
      .then(() => {
        setError(null);
      })
      .catch((_error) =>
        console.log(_error?.response?.data?.message || "ERROR in LOGOUT")
      )
      .finally(() => {
        setToken("");
      });
  }, [token]);

  function clearError() {
    setError(null);
  }

  // function updateUserInfo(newValues) {
  //   setUser((prevUser) => ({ ...prevUser, ...newValues }));
  // }

  // Make the provider update only when it should.
  // We only want to force re-renders if the user,
  // loading or error states change.
  //
  // Whenever the `value` passed into a provider changes,
  // the whole tree under the provider re-renders, and
  // that can be very costly! Even in this case, where
  // you only get re-renders when logging in and out
  // we want to keep things very performant.
  const memoedValue: AuthContextType = useMemo(
    () => ({
      user,
      role,
      accountStatus,
      setAccountStatus,
      token,
      isAuthenticated,
      isLoading,
      loadingInitial,
      error,
      loginViaEmail,
      loginViaPhone,
      logout,
      clearError,
      openedChatId,
      setOpenedChatId,
      // updateUserInfo,
    }),
    [
      user,
      role,
      accountStatus,
      setAccountStatus,
      token,
      isAuthenticated,
      isLoading,
      loadingInitial,
      error,
      logout,
      loginViaEmail,
      loginViaPhone,
      openedChatId,
      setOpenedChatId,
    ]
  );

  // We only want to render the underlying app after we
  // assert for the presence of a current user.
  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth() {
  return useContext(AuthContext);
}
