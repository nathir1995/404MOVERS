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
      // Check if we're in browser environment
      if (typeof window === "undefined" || !("Notification" in window)) {
        console.log("Notifications not supported in this environment");
        setIsInitialized(true);
        return;
      }

      const permission = Notification.permission;
      setNotificationPermission(permission);

      if (permission === 'denied') {
        console.log("Notifications are blocked. Skipping FCM initialization.");
        setIsInitialized(true);
        return;
      }

      try {
        // Only proceed if permission is granted
        if (permission === 'granted') {
          const messaging = getMessaging(firebaseApp);
          
          // Try to get token - this might fail if VAPID key is not configured
          try {
            const token = await getToken(messaging, {
              // You need to get your VAPID key from Firebase Console
              // Go to: Project Settings > Cloud Messaging > Web Push certificates
              vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || undefined
            });

            if (token) {
              console.log("FCM token obtained:", token);
              setFcmToken(token);
            } else {
              console.log("No FCM token received - VAPID key might be missing");
            }
          } catch (tokenError: any) {
            console.log("FCM token generation failed:", tokenError.message);
            // Don't throw error, just log it
          }
        }
      } catch (error: any) {
        console.log("FCM initialization failed:", error.message);
        // Don't throw error, just log it
      } finally {
        setIsInitialized(true);
      }
    };

    initFCM();
  }, []);

  const requestNotificationPermission = React.useCallback(async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      console.log("Notifications not supported");
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);

      if (permission === 'granted') {
        try {
          const messaging = getMessaging(firebaseApp);
          const token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || undefined
          });
          
          if (token) {
            setFcmToken(token);
            return true;
          } else {
            console.log("FCM token not received - check VAPID key configuration");
            return false;
          }
        } catch (tokenError) {
          console.log("FCM token generation failed after permission grant:", tokenError);
          return false;
        }
      }
      return false;
    } catch (error) {
      console.log("Permission request failed:", error);
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
