import React, { createContext, useContext } from "react";
import FirebaseContextType from "./FirebaseContextType";
import { app as firebaseApp } from "@/firebase";
import { getMessaging, getToken, isSupported } from "firebase/messaging";
import { isFeatureEnabled, safeFirebaseOperation } from "@/utils/featureFlags";

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

      // ✅ FIXED: Check if we're in a browser environment
      if (typeof window === "undefined" || !("Notification" in window)) {
        console.info("Notifications not supported in this environment");
        setIsInitialized(true);
        return;
      }

      // ✅ FIXED: Check feature flags before initializing Firebase
      if (!isFeatureEnabled.firebase()) {
        console.info("Firebase messaging disabled by feature flags");
        setIsInitialized(true);
        return;
      }

      try {
        // ✅ FIXED: Get current permission state without requesting
        const permission = Notification.permission;
        setNotificationPermission(permission);

        if (permission === "default") {
          // User hasn't made a choice yet - don't attempt to get token
          console.info("Notification permission not yet requested - skipping FCM initialization");
          setIsInitialized(true);
          return;
        }

        if (permission === "denied") {
          // ✅ FIXED: Silently handle denied permissions without errors
          console.info("Notifications are disabled by user - FCM unavailable");
          setIsInitialized(true);
          return;
        }

        if (permission === "granted") {
          // Only proceed if notifications are explicitly granted
          try {
            // Check if Firebase messaging is supported
            const supported = await isSupported();
            if (!supported) {
              console.info("Firebase messaging not supported in this browser");
              setIsInitialized(true);
              return;
            }

            const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
            if (!vapidKey) {
              console.info("VAPID key not configured - FCM token generation skipped");
              setIsInitialized(true);
              return;
            }

            // ✅ FIXED: Wrap token generation in try-catch to prevent uncaught errors
            try {
              const messaging = getMessaging(firebaseApp);
              const token = await getToken(messaging, { vapidKey });
              
              if (token) {
                console.info("FCM token obtained successfully");
                setFcmToken(token);
              } else {
                console.info("FCM token not received - check VAPID configuration");
              }
            } catch (tokenError: any) {
              // ✅ FIXED: Handle token errors gracefully without throwing
              if (tokenError?.code === 'messaging/permission-blocked') {
                console.info("FCM permission was revoked - updating state");
                setNotificationPermission("denied");
              } else if (tokenError?.code === 'messaging/permission-denied') {
                console.info("FCM permission denied by user");
                setNotificationPermission("denied");
              } else if (tokenError?.code === 'messaging/notifications-blocked') {
                console.info("Notifications are blocked in browser settings");
                setNotificationPermission("denied");
              } else {
                console.info("FCM token generation failed:", tokenError?.code || 'unknown error');
              }
              // Ensure we don't throw unhandled errors that crash the app
              return;
            }
          } catch (firebaseError: any) {
            // ✅ FIXED: Handle Firebase initialization errors
            console.info("Firebase messaging initialization failed:", firebaseError?.message || 'unknown error');
          }
        }
      } catch (error: any) {
        // ✅ FIXED: Handle any other errors during initialization
        console.info("FCM initialization error:", error?.message || 'unknown error');
      } finally {
        setIsInitialized(true);
      }
    };

    initFCM();
  }, [initializationAttempted]);

  const requestNotificationPermission = React.useCallback(async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      console.info("Notifications not supported in this environment");
      return false;
    }

    try {
      // Check current permission before requesting
      const currentPermission = Notification.permission;
      if (currentPermission === "denied") {
        console.info("Notifications are disabled by user");
        return false;
      }

      if (currentPermission === "granted") {
        console.info("Notifications already granted");
        // Try to get token if we don't have one
        if (!fcmToken) {
          return await generateFCMToken();
        }
        return true;
      }

      // ✅ FIXED: Request permission with proper error handling
      let permission: NotificationPermission;
      try {
        permission = await Notification.requestPermission();
      } catch (permissionError) {
        console.info("Permission request failed or was dismissed");
        return false;
      }

      setNotificationPermission(permission);

      if (permission === "granted") {
        return await generateFCMToken();
      } else {
        console.info("Notification permission was not granted");
        return false;
      }
    } catch (error: any) {
      console.info("Error requesting notification permission:", error?.message || 'unknown error');
      return false;
    }
  }, [fcmToken]);

  const generateFCMToken = async (): Promise<boolean> => {
    try {
      const supported = await isSupported();
      if (!supported) {
        console.info("Firebase messaging not supported - cannot generate token");
        return false;
      }

      const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
      if (!vapidKey) {
        console.info("VAPID key not configured - cannot generate token");
        return false;
      }

      // ✅ FIXED: Better error handling for token generation
      try {
        const messaging = getMessaging(firebaseApp);
        const token = await getToken(messaging, { vapidKey });

        if (token) {
          console.info("FCM token generated successfully");
          setFcmToken(token);
          return true;
        } else {
          console.info("FCM token not received - check VAPID configuration");
          return false;
        }
      } catch (tokenError: any) {
        if (tokenError?.code === 'messaging/permission-blocked') {
          console.info("FCM permission was blocked during token generation");
          setNotificationPermission("denied");
        } else if (tokenError?.code === 'messaging/permission-denied') {
          console.info("FCM permission denied during token generation");
          setNotificationPermission("denied");
        } else if (tokenError?.code === 'messaging/notifications-blocked') {
          console.info("Notifications blocked in browser during token generation");
          setNotificationPermission("denied");
        } else {
          console.info("FCM token generation failed:", tokenError?.code || 'unknown error');
        }
        return false;
      }
    } catch (error: any) {
      console.info("Error generating FCM token:", error?.message || 'unknown error');
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
