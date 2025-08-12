import React from 'react';
import useFirebaseContext from '@/firebase/FirebaseContext';

const NotificationPermissionHandler = () => {
  const {
    notificationPermission,
    requestNotificationPermission,
    fcmToken,
    isInitialized,
  } = useFirebaseContext();

  const [isRequesting, setIsRequesting] = React.useState(false);

  const handleEnableNotifications = async () => {
    if (isRequesting) return;
    
    setIsRequesting(true);
    try {
      console.log('User clicked enable notifications');
      const granted = await requestNotificationPermission();
      if (granted) {
        console.log('Notifications enabled successfully!');
      } else {
        console.log('Notifications permission denied or failed.');
      }
    } catch (error) {
      console.error('Failed to enable notifications:', error);
    } finally {
      setIsRequesting(false);
    }
  };

  // ✅ FIXED: Don't render anything during SSR or initialization
  if (typeof window === 'undefined') {
    return null;
  }

  if (!("Notification" in window)) {
    return null;
  }

  if (!isInitialized) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="animate-spin h-5 w-5 text-gray-400" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-800">
              Initializing notifications...
            </p>
          </div>
        </div>
      </div>
    );
  }

  switch (notificationPermission) {
    case 'granted':
      return (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Notifications enabled! You&apos;ll receive important updates.
              </p>
              {fcmToken && (
                <p className="text-xs text-green-600 mt-1">
                  Status: Connected (Token: {fcmToken.substring(0, 20)}...)
                </p>
              )}
              {!fcmToken && (
                <p className="text-xs text-green-600 mt-1">
                  Status: Permission granted, token pending...
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
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">Notifications blocked</p>
              <p className="text-sm text-red-700 mt-1">
                To receive updates, please enable notifications in your browser settings:
              </p>
              <ul className="text-xs text-red-600 mt-2 list-disc list-inside space-y-1">
                <li>Click the lock icon (🔒) in the address bar</li>
                <li>Select &quot;Site settings&quot; or &quot;Permissions&quot;</li>
                <li>Change notifications to &quot;Allow&quot;</li>
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
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-blue-800">Stay updated with notifications</p>
              <p className="text-sm text-blue-700 mt-1">
                Get notified about important updates and messages for your moves.
              </p>
              <button
                onClick={handleEnableNotifications}
                disabled={isRequesting}
                className={`mt-3 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors ${
                  isRequesting 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isRequesting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Requesting...
                  </span>
                ) : (
                  'Enable Notifications'
                )}
              </button>
            </div>
          </div>
        </div>
      );
  }
};

export default NotificationPermissionHandler;
