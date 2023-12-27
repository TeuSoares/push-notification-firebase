// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCiDtu6nSmSE8u9McgIYzxL09Ma7iRbGpA",
  authDomain: "push-notification-2cb1f.firebaseapp.com",
  projectId: "push-notification-2cb1f",
  storageBucket: "push-notification-2cb1f.appspot.com",
  messagingSenderId: "178958591315",
  appId: "1:178958591315:web:b2ddd4b28b5a6cbdac2da6",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
 // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});