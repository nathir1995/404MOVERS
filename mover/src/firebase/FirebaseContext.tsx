import React, { createContext, useContext } from "react";
import FirebaseContextType from "./FirebaseContextType";
import { app as firebaseApp } from "@/firebase";
import { getMessaging, getToken } from "firebase/messaging";

const FirebaseContext = createContext<FirebaseContextType>({} as FirebaseContextType);

export const FirebaseContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [fcmToken, setFcmToken] = React.useState<string | undefined>();
  const [notificationPermission, setNotificationPermission] = React.useState<NotificationPermission>('default');
  const [isInitialized, setIsInitialized] = React.useState(false);

  React.useEffect(() => {
    const initFCM = async () => {
      if (typeof window === "undefined" || !("Notification" in window)) {
        console.log("Notifications not supported in this environment");
        setIsInitialized(true);
        return;
      }

      const permission = Notification.permission;
      setNotificationPermission(permission);

      if (permission === 'denied') {
        console.warn("Notifications are blocked. Cannot proceed.");
        setIsInitialized(true);
        return;
      }

      try {
        if (permission === 'default') {
          const requested = await Notification.requestPermission();
          setNotificationPermission(requested);
          if (requested !== 'granted') {
            console.warn("Permission not granted after request.");
            setIsInitialized(true);
            return;
          }
        }

        if (Notification.permission === 'granted') {
          const messaging = getMessaging(firebaseApp);
          const token = await getToken(messaging, {
            vapidKey: "YOUR_VAPID_KEY_HERE" // Replace with your actual VAPID key
          });

          if (token) {
            console.log("FCM token obtained:", token);
            setFcmToken(token);
          } else {
            console.warn("No token received. Permission might be missing.");
          }
        }
      } catch (error: any) {
        console.error("FCM error:", error.message || error);
        setFcmToken(undefined);
      } finally {
        setIsInitialized(true);
      }
    };

    initFCM();
  }, []);

  const requestNotificationPermission = React.useCallback(async () => {
    if (typeof window === "undefined" || !("Notification" in window)) return false;

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);

      if (permission === 'granted') {
        const messaging = getMessaging(firebaseApp);
        const token = await getToken(messaging, {
          vapidKey: "YOUR_VAPID_KEY_HERE"
        });
        setFcmToken(token);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Permission request failed:", error);
      return false;
    }
  }, []);

  const memoedValue = React.useMemo(() => ({
    fcmToken,
    notificationPermission,
    requestNotificationPermission,
    isInitialized,
  }), [fcmToken, notificationPermission, requestNotificationPermission, isInitialized]);

  return (
    <FirebaseContext.Provider value={memoedValue}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default function useFirebaseContext() {
  return useContext(FirebaseContext);
}
