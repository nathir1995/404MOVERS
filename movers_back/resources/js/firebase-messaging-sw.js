// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config.
firebase.initializeApp({
    apiKey: "AIzaSyDrt3pufqoeYZlipaTBmYPvpBMSRwwdg9s",
    authDomain: "mover-404.firebaseapp.com",
    projectId: "mover-404",
    storageBucket: "mover-404.appspot.com",
    messagingSenderId: "1098510248875",
    appId: "1:1098510248875:web:61093dd3471a0da50880ee",
    measurementId: "G-XSBF71H3WX"
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();
