type FirebaseContextType = {
  fcmToken?: string;
  notificationPermission?: NotificationPermission;
  requestNotificationPermission?: () => Promise<boolean>;
};

export default FirebaseContextType;
