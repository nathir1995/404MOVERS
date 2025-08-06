import React, { createContext, useContext } from "react";
import FirebaseContextType from "./FirebaseContextType";
import { app as firebaseApp } from "@/firebase";
import { getMessaging, getToken } from "firebase/messaging";

const FirebaseContext = createContext<FirebaseContextType>(
  {} as FirebaseContextType
);

export const FirebaseContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [fcmToken, setFcmToken] = React.useState<undefined | string>();

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

    getTokenFromFirebase();
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
