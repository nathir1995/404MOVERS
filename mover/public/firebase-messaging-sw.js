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

// Get base URL for environment-specific handling
const baseUrl = self.location.origin || 'https://404movers.com';

// Retry logic for robust notification handling
const showNotificationWithRetry = async (title, options, retries = 2) => {
  try {
    return await self.registration.showNotification(title, options);
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying notification... ${retries} attempts left`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      return showNotificationWithRetry(title, options, retries - 1);
    }
    throw error;
  }
};

// Initialize Firebase with error handling
let messaging;
try {
  firebase.initializeApp(firebaseConfig);
  messaging = firebase.messaging();
  console.log('Firebase messaging initialized successfully');
  
  // Check notification permission
  if (typeof Notification !== 'undefined' && Notification.permission !== 'granted') {
    console.warn('Notification permission not granted. Users may not receive notifications.');
  }
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
          url: payload.data?.url || baseUrl,
          timestamp: Date.now()
        }
      };

      // Use retry logic for robust notification display
      return showNotificationWithRetry(notificationTitle, notificationOptions);
    } catch (error) {
      console.error('Error showing notification:', error);
      
      // Fallback notification with retry
      return showNotificationWithRetry(
        '404MOVERS',
        {
          body: 'New update available',
          icon: '/icons/default-icon.png',
          data: { url: baseUrl, timestamp: Date.now() }
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
    console.log('Notification dismissed by user');
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
            console.log('Focusing existing app window');
            return client.focus();
          }
        }
        
        // Open new window if app is not open
        const urlToOpen = action === 'open' 
          ? (notificationData.url || baseUrl)
          : baseUrl;
          
        console.log('Opening new app window:', urlToOpen);
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
      .catch(error => {
        console.error('Error handling notification click:', error);
        // Fallback: try to open the base URL
        if (clients.openWindow) {
          return clients.openWindow(baseUrl);
        }
      })
  );
});

// Handle notification close
self.addEventListener('notificationclose', function(event) {
  console.log('Notification closed:', event);
  
  // Track notification dismissal for analytics if needed
  try {
    // You can add analytics tracking here
    // Example: analytics.track('notification_dismissed', { tag: event.notification.tag });
    console.log('Notification dismissed:', {
      tag: event.notification.tag,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error tracking notification close:', error);
  }
});

// Handle push events (for additional custom logic)
self.addEventListener('push', function(event) {
  console.log('Push event received:', event);
  
  // This is handled by onBackgroundMessage, but you can add custom logic here
  if (event.data) {
    try {
      const data = event.data.json();
      console.log('Push data (JSON):', data);
      
      // Custom push handling logic can go here
      // For example, different handling based on data.type
      if (data.type === 'urgent') {
        console.log('Urgent push notification received');
      }
    } catch (error) {
      console.log('Push data (text):', event.data.text());
    }
  }
});

// Error handling for service worker
self.addEventListener('error', function(event) {
  console.error('Service Worker error:', event.error);
  
  // Report critical errors (you can add error reporting service here)
  try {
    // Example: Send error to monitoring service
    console.error('Critical Service Worker Error:', {
      message: event.error.message,
      stack: event.error.stack,
      timestamp: Date.now()
    });
  } catch (reportError) {
    console.error('Failed to report error:', reportError);
  }
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
    }).then(() => {
      console.log('Service Worker activation complete');
      // Take control of all clients immediately
      return self.clients.claim();
    }).catch(error => {
      console.error('Error during service worker activation:', error);
    })
  );
});

// Handle service worker installation
self.addEventListener('install', function(event) {
  console.log('Service Worker installing');
  
  // Pre-cache critical resources during install
  event.waitUntil(
    caches.open('404movers-v1').then(cache => {
      console.log('Pre-caching critical resources');
      return cache.addAll([
        '/',
        '/icons/notification-icon-192.png',
        '/icons/badge-icon-72.png'
      ]).catch(error => {
        console.warn('Some resources failed to pre-cache:', error);
        // Don't fail the installation if pre-caching fails
        return Promise.resolve();
      });
    }).then(() => {
      console.log('Service Worker installation complete');
      // Skip waiting to activate immediately
      return self.skipWaiting();
    }).catch(error => {
      console.error('Service Worker installation failed:', error);
    })
  );
});
