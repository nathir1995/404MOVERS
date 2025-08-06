importScripts(
  "https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js"
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

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message: ", payload);

  // Customize how you want to handle the background message
  // For example, you can display a notification using the payload data
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // icon: payload.notification.icon,
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
