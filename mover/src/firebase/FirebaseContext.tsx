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
  const [notificationPermission, setNotificationPermission] = React.useState<NotificationPermission>('default');
  const [isInitialized, setIsInitialized] = React.useState(false);

  React.useEffect(() => {
    const requestNotificationPermissionAndGetToken = async () => {
      // Only run in browser environment
      if (typeof window === "undefined" || !("Notification" in window)) {
        console.log("Notifications not supported in this environment");
        setIsInitialized(true);
        return;
      }

      try {
        // Check current permission status
        const currentPermission = Notification.permission;
        setNotificationPermission(currentPermission);
        
        console.log("Current notification permission:", currentPermission);

        // If permission is denied, don't attempt to get token
        if (currentPermission === 'denied') {
          console.log("Notification permission denied. Cannot get FCM token.");
          return;
        }

        // If permission not yet granted, request it
        if (currentPermission === 'default') {
          console.log("Requesting notification permission...");
          const permission = await Notification.requestPermission();
          setNotificationPermission(permission);
          
          if (permission !== 'granted') {
            console.log("Notification permission not granted:", permission);
            return;
          }
        }

        // Only try to get token if permission is granted
        if (currentPermission === 'granted' || Notification.permission === 'granted') {
          console.log("Getting FCM token...");
          const messaging = getMessaging(firebaseApp);
          
          // Add VAPID key if you have one (optional but recommended for web push)
          const currentToken = await getToken(messaging, {
            // vapidKey: "YOUR_VAPID_KEY_HERE" // Uncomment and add your VAPID key if you have one
          });
          
          if (currentToken) {
            console.log("FCM token obtained successfully");
            setFcmToken(currentToken);
          } else {
            console.log("No registration token available. Request permission to generate one.");
          }
        }
      } catch (error) {
        console.error("Error with FCM token:", error);
        
        // Handle specific Firebase errors
        if (error instanceof Error) {
          if (error.message.includes('permission-blocked')) {
            console.error("Notifications are blocked. Please enable them in browser settings.");
          } else if (error.message.includes('unsupported-browser')) {
            console.error("This browser doesn't support the notification service.");
          } else if (error.message.includes('vapid-key-required')) {
            console.error("VAPID key required for this browser.");
          }
        }
        
        // Set token to null to indicate failure
        setFcmToken(undefined);
      } finally {
        setIsInitialized(true);
      }
    };

    requestNotificationPermissionAndGetToken();
  }, []);

  // Function to manually request permission (can be called from UI)
  const requestNotificationPermission = React.useCallback(async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      
      if (permission === 'granted') {
        // Try to get token after permission granted
        const messaging = getMessaging(firebaseApp);
        const currentToken = await getToken(messaging);
        setFcmToken(currentToken);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error requesting notification permission:", error);
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
