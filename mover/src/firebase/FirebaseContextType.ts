// ✅ FIXED: Separate client context from admin types

export default interface FirebaseContextType {
  fcmToken: string | undefined;
  notificationPermission: NotificationPermission;
  requestNotificationPermission: () => Promise<boolean>;
  isInitialized: boolean;
}
