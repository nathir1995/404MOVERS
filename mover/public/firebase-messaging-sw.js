// firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDrt3pufqoeYZlipaTBmYPvpBMSRwwdg9s",
  authDomain: "mover-404.firebaseapp.com",
  projectId: "mover-404",
  storageBucket: "mover-404.appspot.com",
  messagingSenderId: "1098510248875",
  appId: "1:1098510248875:web:61093dd3471a0da50880ee",
  measurementId: "G-XSBF71H3WX",
};

// Initialize Firebase with error handling
let messaging;
try {
  firebase.initializeApp(firebaseConfig);
  messaging = firebase.messaging();
  console.log('Firebase messaging initialized successfully');
} catch (error) {
  console.error('Firebase initialization failed:', error);
}

// Handle background messages
if (messaging) {
  messaging.onBackgroundMessage(function (payload) {
    console.log("Received background message: ", payload);

    try {
      // Enhanced notification options
      const notificationTitle = payload.notification?.title || '404MOVERS Update';
      const notificationOptions = {
        body: payload.notification?.body || 'You have a new message from 404MOVERS',
        icon: payload.notification?.icon || '/icons/notification-icon-192.png',
        badge: '/icons/badge-icon-72.png',
        tag: 'mover-notification',
        requireInteraction: false,
        silent: false,
        actions: [
          {
            action: 'open',
            title: 'Open App',
            icon: '/icons/open-icon-32.png'
          },
          {
            action: 'dismiss',
            title: 'Dismiss',
            icon: '/icons/dismiss-icon-32.png'
          }
        ],
        data: {
          url: payload.data?.url || 'https://404movers.com',
          timestamp: Date.now()
        }
      };

      return self.registration.showNotification(notificationTitle, notificationOptions);
    } catch (error) {
      console.error('Error showing notification:', error);
      
      // Fallback notification
      return self.registration.showNotification(
        '404MOVERS',
        {
          body: 'New update available',
          icon: '/icons/default-icon.png'
        }
      );
    }
  });
}

// Handle notification clicks
self.addEventListener('notificationclick', function(event) {
  console.log('Notification clicked:', event);
  
  event.notification.close();
  
  const action = event.action;
  const notificationData = event.notification.data || {};
  
  if (action === 'dismiss') {
    // Just close the notification
    return;
  }
  
  // Open or focus the app
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clientList => {
        // Check if app is already open
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url.includes('404movers') && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Open new window if app is not open
        const urlToOpen = action === 'open' 
          ? (notificationData.url || 'https://404movers.com')
          : 'https://404movers.com';
          
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
      .catch(error => {
        console.error('Error handling notification click:', error);
      })
  );
});

// Handle notification close
self.addEventListener('notificationclose', function(event) {
  console.log('Notification closed:', event);
  
  // Track notification dismissal for analytics if needed
  // analytics.track('notification_dismissed', { tag: event.notification.tag });
});

// Handle push events (for additional custom logic)
self.addEventListener('push', function(event) {
  console.log('Push event received:', event);
  
  // This is handled by onBackgroundMessage, but you can add custom logic here
  if (event.data) {
    try {
      const data = event.data.json();
      console.log('Push data:', data);
    } catch (error) {
      console.log('Push data (text):', event.data.text());
    }
  }
});

// Error handling for service worker
self.addEventListener('error', function(event) {
  console.error('Service Worker error:', event.error);
});

// Handle service worker activation
self.addEventListener('activate', function(event) {
  console.log('Service Worker activated');
  
  event.waitUntil(
    // Clear old caches if needed
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName.startsWith('404movers-old-')) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Handle service worker installation
self.addEventListener('install', function(event) {
  console.log('Service Worker installing');
  
  // Skip waiting to activate immediately
  self.skipWaiting();
});
