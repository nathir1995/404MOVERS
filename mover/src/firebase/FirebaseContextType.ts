type FirebaseContextType = {
  fcmToken?: string;
  notificationPermission?: NotificationPermission;
  requestNotificationPermission?: () => Promise<boolean>;
  isInitialized?: boolean;
};

export default FirebaseContextType;
