import React, { createContext, useContext } from "react";
import FirebaseContextType from "./FirebaseContextType";
import { app as firebaseApp } from "@/firebase";
import { getMessaging, getToken } from "firebase/messaging";

const defaultContext: FirebaseContextType = {
  fcmToken: undefined,
  notificationPermission: "default",
  requestNotificationPermission: async () => false,
  isInitialized: false,
};

const FirebaseContext = createContext<FirebaseContextType>(defaultContext);

export const FirebaseContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [fcmToken, setFcmToken] = React.useState<string | undefined>(undefined);
  const [notificationPermission, setNotificationPermission] =
    React.useState<NotificationPermission>("default");
  const [isInitialized, setIsInitialized] = React.useState(false);

  React.useEffect(() => {
    const initFCM = async () => {
      if (typeof window === "undefined" || !("Notification" in window)) {
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
            // NEW: check for VAPID key before attempting token generation
            const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
            if (!vapidKey) {
              console.warn(
                "NEXT_PUBLIC_FIREBASE_VAPID_KEY is not set. Skipping FCM token generation."
              );
            } else {
              const token = await getToken(messaging, {
                vapidKey,
              });

              if (token) {
                console.info("FCM token obtained:", token);
                setFcmToken(token);
              } else {
                console.warn(
                  "No FCM token received - check your VAPID key configuration"
                );
              }
            }
          } catch (tokenError: any) {
            console.error(
              "FCM token generation failed:",
              tokenError?.message ?? tokenError
            );
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
          // NEW: guard against missing VAPID key when requesting token
          const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
          if (!vapidKey) {
            console.warn(
              "NEXT_PUBLIC_FIREBASE_VAPID_KEY is not set. Unable to request FCM token."
            );
            return false;
          }
          const token = await getToken(messaging, {
            vapidKey,
          });

          if (token) {
            setFcmToken(token);
            return true;
          } else {
            console.warn(
              "FCM token not received - check VAPID key configuration"
            );
            return false;
          }
        } catch (tokenError: any) {
          console.error(
            "FCM token generation failed after permission grant:",
            tokenError?.message ?? tokenError
          );
          return false;
        }
      } else if (permission === "denied") {
        console.warn("Notification permission was denied");
        return false;
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

  return (
    <FirebaseContext.Provider value={memoedValue}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default function useFirebaseContext() {
  return useContext(FirebaseContext);
}
