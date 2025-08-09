import React, { createContext, useContext } from "react";
import FirebaseContextType from "./FirebaseContextType";
import { app as firebaseApp } from "@/firebase";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

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
  const [initializationAttempted, setInitializationAttempted] = React.useState(false);

  React.useEffect(() => {
    const initFCM = async () => {
      // Prevent multiple initialization attempts
      if (initializationAttempted) {
        return;
      }
      setInitializationAttempted(true);

      if (typeof window === "undefined" || !("Notification" in window)) {
        console.warn("Notifications not supported in this environment");
        setIsInitialized(true);
        return;
      }

      try {
        const permission = Notification.permission;
        setNotificationPermission(permission);

        if (permission === "default") {
          // User hasn't made a choice yet - don't attempt to get token
          console.info("Notification permission not yet requested");
          setIsInitialized(true);
          return;
        }

        if (permission === "denied") {
          console.warn("Notifications are blocked. Skipping FCM initialization.");
          setIsInitialized(true);
          return;
        }

        if (permission === "granted") {
          // Check if Firebase messaging is supported
          const supported = await isSupported();
          if (!supported) {
            console.warn(
              "Firebase messaging is not supported in this browser. Skipping FCM initialization."
            );
            setIsInitialized(true);
            return;
          }

          const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
          if (!vapidKey) {
            console.warn(
              "NEXT_PUBLIC_FIREBASE_VAPID_KEY is not set. Skipping FCM token generation."
            );
            setIsInitialized(true);
            return;
          }

          try {
            const messaging = getMessaging(firebaseApp);
            const token = await getToken(messaging, { vapidKey });
            
            if (token) {
              console.info("FCM token obtained successfully (length):", token.length);
              setFcmToken(token);
            } else {
              console.warn(
                "No FCM token received – check your VAPID key configuration"
              );
            }
          } catch (tokenError: any) {
            console.error(
              "FCM token generation failed:",
              tokenError?.code,
              tokenError?.message ?? tokenError
            );
            
            // Handle specific Firebase errors
            if (tokenError?.code === 'messaging/permission-blocked') {
              console.warn("Permission was blocked after being granted - updating state");
              setNotificationPermission("denied");
            }
          }
        }
      } catch (error: any) {
        console.error("FCM initialization failed:", error?.message ?? error);
      } finally {
        setIsInitialized(true);
      }
    };

    initFCM();
  }, [initializationAttempted]);

  const requestNotificationPermission = React.useCallback(async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      console.warn("Notifications not supported");
      return false;
    }

    try {
      // Check current permission before requesting
      const currentPermission = Notification.permission;
      if (currentPermission === "denied") {
        console.warn("Notifications are already denied");
        return false;
      }

      if (currentPermission === "granted") {
        console.info("Notifications are already granted");
        // Try to get token if we don't have one
        if (!fcmToken) {
          return await generateFCMToken();
        }
        return true;
      }

      // Request permission
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);

      if (permission === "default") {
        console.warn("Notification permission request dismissed");
        return false;
      }

      if (permission === "denied") {
        console.warn("Notification permission was denied");
        return false;
      }

      if (permission === "granted") {
        return await generateFCMToken();
      }

      return false;
    } catch (error: any) {
      console.error("Permission request failed:", error?.message ?? error);
      return false;
    }
  }, [fcmToken]);

  const generateFCMToken = async (): Promise<boolean> => {
    try {
      const supported = await isSupported();
      if (!supported) {
        console.warn(
          "Firebase messaging is not supported in this browser. Cannot generate FCM token."
        );
        return false;
      }

      const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
      if (!vapidKey) {
        console.warn(
          "NEXT_PUBLIC_FIREBASE_VAPID_KEY is not set. Unable to generate FCM token."
        );
        return false;
      }

      const messaging = getMessaging(firebaseApp);
      const token = await getToken(messaging, { vapidKey });

      if (token) {
        console.info("FCM token obtained successfully (length):", token.length);
        setFcmToken(token);
        return true;
      } else {
        console.warn(
          "FCM token not received – check VAPID key configuration"
        );
        return false;
      }
    } catch (tokenError: any) {
      console.error(
        "FCM token generation failed:",
        tokenError?.code,
        tokenError?.message ?? tokenError
      );
      
      // Handle specific Firebase errors
      if (tokenError?.code === 'messaging/permission-blocked') {
        console.warn("Permission was blocked - updating state");
        setNotificationPermission("denied");
      }
      
      return false;
    }
  };

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
  const context = useContext(FirebaseContext);
  
  if (!context) {
    throw new Error('useFirebaseContext must be used within a FirebaseContextProvider');
  }
  
  return context;
}
