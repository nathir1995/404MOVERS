import React, { createContext, useContext } from "react";
import FirebaseContextType from "./FirebaseContextType";
import { app as firebaseApp } from "@/firebase";
import { getMessaging, getToken } from "firebase/messaging";

// Fix: Provide a proper default context value to avoid runtime errors
const defaultContext: FirebaseContextType = {
  fcmToken: undefined,
  notificationPermission: "default",
  requestNotificationPermission: async () => false,
  isInitialized: false,
};

const FirebaseContext = createContext<FirebaseContextType>(defaultContext);

export const FirebaseContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [fcmToken, setFcmToken] = React.useState<string | undefined>(undefined);
  const [notificationPermission, setNotificationPermission] = React.useState<NotificationPermission>("default");
  const [isInitialized, setIsInitialized] = React.useState(false);

  React.useEffect(() => {
    const initFCM = async () => {
      if (typeof window === "undefined" || !("Notification" in window)) {
        // Fix: use warn for environment issues
        console.warn("Notifications not supported in this environment");
        setIsInitialized(true);
        return;
      }

      const permission = Notification.permission;
      setNotificationPermission(permission);

      if (permission === "denied") {
        console.warn("Notifications are blocked. Skipping FCM initialization.");
        setIsInitialized(true);
        return;
      }

      try {
        if (permission === "granted") {
          const messaging = getMessaging(firebaseApp);

          try {
            const token = await getToken(messaging, {
              vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
            });

            if (token) {
              console.info("FCM token obtained:", token);
              setFcmToken(token);
            } else {
              console.warn("No FCM token received - VAPID key might be missing");
            }
          } catch (tokenError: any) {
            console.error("FCM token generation failed:", tokenError?.message ?? tokenError);
          }
        }
      } catch (error: any) {
        console.error("FCM initialization failed:", error?.message ?? error);
      } finally {
        setIsInitialized(true);
      }
    };

    initFCM();
  }, []);

  const requestNotificationPermission = React.useCallback(async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      console.warn("Notifications not supported");
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);

      if (permission === "granted") {
        try {
          const messaging = getMessaging(firebaseApp);
          const token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          });

          if (token) {
            setFcmToken(token);
            return true;
          } else {
            console.warn("FCM token not received - check VAPID key configuration");
            return false;
          }
        } catch (tokenError: any) {
          console.error("FCM token generation failed after permission grant:", tokenError?.message ?? tokenError);
          return false;
        }
      }
      return false;
    } catch (error: any) {
      console.error("Permission request failed:", error?.message ?? error);
      return false;
    }
  }, []);

  const memoedValue = React.useMemo(
    () => ({
      fcmToken,
      notificationPermission,
      requestNotificationPermission,
      isInitialized,
    }),
    [fcmToken, notificationPermission, requestNotificationPermission, isInitialized]
  );

  return <FirebaseContext.Provider value={memoedValue}>{children}</FirebaseContext.Provider>;
};

export default function useFirebaseContext() {
  return useContext(FirebaseContext);
}
