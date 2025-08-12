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

      // ✅ FIXED: Better environment checks
      if (typeof window === "undefined") {
        console.info("Server-side rendering - skipping FCM initialization");
        setIsInitialized(true);
        return;
      }

      if (!("Notification" in window)) {
        console.info("Notifications not supported in this browser");
        setIsInitialized(true);
        return;
      }

      try {
        const permission = Notification.permission;
        setNotificationPermission(permission);

        // ✅ FIXED: Don't attempt token generation unless explicitly granted
        if (permission !== "granted") {
          console.info(`Notification permission is "${permission}" - not attempting token generation`);
          setIsInitialized(true);
          return;
        }

        // ✅ FIXED: Only proceed if permission is explicitly granted
        if (permission === "granted") {
          console.info("Notification permission granted - checking Firebase support");
          
          // Check environment variables first
          const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
          if (!vapidKey) {
            console.warn("NEXT_PUBLIC_FIREBASE_VAPID_KEY is not set - skipping FCM token generation");
            setIsInitialized(true);
            return;
          }

          // Check if Firebase messaging is supported
          const supported = await isSupported();
          if (!supported) {
            console.warn("Firebase messaging is not supported in this browser");
            setIsInitialized(true);
            return;
          }

          try {
            const messaging = getMessaging(firebaseApp);
            const token = await getToken(messaging, { vapidKey });
            
            if (token) {
              console.info("FCM token obtained successfully");
              setFcmToken(token);
            } else {
              console.warn("No FCM token received - check VAPID key configuration");
            }
          } catch (tokenError: any) {
            console.error("FCM token generation failed:", tokenError?.code || tokenError?.message || tokenError);
            
            // ✅ FIXED: Handle permission changes gracefully
            if (tokenError?.code === 'messaging/permission-blocked') {
              console.warn("Permission was blocked - updating state");
              setNotificationPermission("denied");
            }
          }
        }
      } catch (error: any) {
        console.error("FCM initialization failed:", error?.message || error);
      } finally {
        setIsInitialized(true);
      }
    };

    // ✅ FIXED: Add small delay to ensure DOM is ready
    const timer = setTimeout(initFCM, 100);
    return () => clearTimeout(timer);
  }, [initializationAttempted]);

  const requestNotificationPermission = React.useCallback(async () => {
    // ✅ FIXED: Better environment checks
    if (typeof window === "undefined") {
      console.warn("Server-side environment - notifications not available");
      return false;
    }

    if (!("Notification" in window)) {
      console.warn("Notifications not supported in this browser");
      return false;
    }

    try {
      // Check current permission before requesting
      const currentPermission = Notification.permission;
      
      if (currentPermission === "denied") {
        console.warn("Notifications are permanently denied by user");
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

      // ✅ FIXED: Only request if permission is "default"
      if (currentPermission === "default") {
        console.info("Requesting notification permission from user");
        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);

        if (permission === "granted") {
          return await generateFCMToken();
        } else {
          console.warn(`Notification permission ${permission} - not generating token`);
          return false;
        }
      }

      return false;
    } catch (error: any) {
      console.error("Permission request failed:", error?.message || error);
      return false;
    }
  }, [fcmToken]);

  const generateFCMToken = async (): Promise<boolean> => {
    try {
      // ✅ FIXED: Check environment variables first
      const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
      if (!vapidKey) {
        console.warn("NEXT_PUBLIC_FIREBASE_VAPID_KEY is not set - cannot generate FCM token");
        return false;
      }

      const supported = await isSupported();
      if (!supported) {
        console.warn("Firebase messaging is not supported in this browser");
        return false;
      }

      const messaging = getMessaging(firebaseApp);
      const token = await getToken(messaging, { vapidKey });

      if (token) {
        console.info("FCM token generated successfully");
        setFcmToken(token);
        return true;
      } else {
        console.warn("FCM token not received - check VAPID key configuration");
        return false;
      }
    } catch (tokenError: any) {
      console.error("FCM token generation failed:", tokenError?.code || tokenError?.message || tokenError);
      
      // ✅ FIXED: Handle specific error codes
      if (tokenError?.code === 'messaging/permission-blocked') {
        console.warn("Permission was blocked during token generation");
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
