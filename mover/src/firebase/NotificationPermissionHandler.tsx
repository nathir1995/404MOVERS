import React from 'react';
import useFirebaseContext from '@/firebase/FirebaseContext';

/**
 * NotificationPermissionHandler is a React component that displays the user's
 * current notification permission status and allows them to enable push
 * notifications.  It is updated to handle cases where permissions are blocked
 * and includes proper return statements for each switch case.  If the
 * browser does not support the Notification API, the component renders
 * nothing.
 */
const NotificationPermissionHandler = () => {
  const {
    notificationPermission,
    requestNotificationPermission,
    fcmToken,
  } = useFirebaseContext();

  /**
   * Request the user to enable notifications.  Wraps the request in a try/catch
   * and only retrieves the FCM token if permission is granted.  See the
   * Firebase docs for more details on requesting permission and retrieving
   * tokens【443399047059719†L691-L731】.
   */
  const handleEnableNotifications = async () => {
    try {
      // Request permission using the Firebase helper.  This helper should
      // call Notification.requestPermission() and return a boolean.
      const granted = await requestNotificationPermission();
      if (granted) {
        console.log('Notifications enabled successfully!');
      } else {
        console.log('Notifications permission denied.');
      }
    } catch (error) {
      console.error('Failed to enable notifications:', error);
    }
  };

  // Do not render anything during SSR or if Notification API is unsupported.
  if (typeof window === 'undefined' || !("Notification" in window)) {
    return null;
  }

  switch (notificationPermission) {
    case 'granted':
      return (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Notifications enabled! You'll receive important updates.
              </p>
              {fcmToken && (
                <p className="text-xs text-green-600 mt-1">
                  Token: {fcmToken.substring(0, 20)}...
                </p>
              )}
            </div>
          </div>
        </div>
      );

    case 'denied':
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">
                Notifications blocked
              </p>
              <p className="text-sm text-red-700 mt-1">
                To receive updates, please enable notifications in your browser
                settings:
              </p>
              <ul className="text-xs text-red-600 mt-2 list-disc list-inside">
                <li>Click the lock icon in the address bar</li>
                <li>Select "Site settings" or "Permissions"</li>
                <li>Change notifications to "Allow"</li>
                <li>Refresh this page</li>
              </ul>
            </div>
          </div>
        </div>
      );

    case 'default':
    default:
      return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-blue-800">
                Stay updated with notifications
              </p>
              <p className="text-sm text-blue-700 mt-1">
                Get notified about important updates and messages.
              </p>
              <button
                onClick={handleEnableNotifications}
                className="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors"
              >
                Enable Notifications
              </button>
            </div>
          </div>
        </div>
      );
  }
};

export default NotificationPermissionHandler;
