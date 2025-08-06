type FirebaseContextType = {
  fcmToken: string | undefined;
  notificationPermission: NotificationPermission;
  requestNotificationPermission: () => Promise<boolean>;
  isInitialized: boolean;
};

export default FirebaseContextType;
