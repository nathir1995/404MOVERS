import React, { createContext, useContext } from "react";
import { app as firebaseApp } from "./index";
import { getMessaging, getToken } from "firebase/messaging";
import { authStorage } from "utility/authStorage";

const FirebaseContext = createContext();

export const FirebaseContextProvider = ({ children }) => {
  const [fcmToken, setFcmToken] = React.useState();

  React.useEffect(() => {
    const getTokenFromFirebase = async () => {
      if (typeof window !== "undefined") {
        const messaging = getMessaging(firebaseApp);
        try {
          const currentToken = await getToken(messaging);
          setFcmToken(currentToken);
        } catch (error) {
          console.error("Error retrieving token:", error);
        }
      }
    };

    const user = authStorage.getUser();
    if (user && user.fcm_token) {
      setFcmToken(user.fcm_token);
    } else {
      getTokenFromFirebase();
    }
  }, []);

  const memoedValue = React.useMemo(
    () => ({
      fcmToken,
    }),
    [fcmToken]
  );

  return (
    <FirebaseContext.Provider value={memoedValue}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default function useFirebaseContext() {
  return useContext(FirebaseContext);
}
