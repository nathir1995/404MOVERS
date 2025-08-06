import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyDrt3pufqoeYZlipaTBmYPvpBMSRwwdg9s",
    authDomain: "mover-404.firebaseapp.com",
    projectId: "mover-404",
    storageBucket: "mover-404.appspot.com",
    messagingSenderId: "1098510248875",
    appId: "1:1098510248875:web:61093dd3471a0da50880ee",
    measurementId: "G-XSBF71H3WX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

getToken(messaging, { vapidKey: 'BM_yT3bYLnMGomlBdtOq6-MsamKF1LMTKe5ViuMpB7-SR0IEOmpL0CTLQT78URaJ2F0LGofwYM3GgrBh4N3pBuY' }).then((currentToken) => {
    if (currentToken) {
        console.log('Token: ', currentToken);
        // Send the token to your server and update the UI if necessary
        // ...
    } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
    }
}).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
});
