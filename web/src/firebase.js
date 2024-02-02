import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  deleteToken,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCiDtu6nSmSE8u9McgIYzxL09Ma7iRbGpA",
  authDomain: "push-notification-2cb1f.firebaseapp.com",
  projectId: "push-notification-2cb1f",
  storageBucket: "push-notification-2cb1f.appspot.com",
  messagingSenderId: "178958591315",
  appId: "1:178958591315:web:b2ddd4b28b5a6cbdac2da6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const fetchToken = async () => {
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    await getOrRegisterServiceWorker();

    return navigator.serviceWorker.ready
      .then(async (serviceWorkerRegistration) => {
        return getToken(messaging, {
          vapidKey:
            "BEmIzrj7pf27ceQ_kukqG60rjJSOIdnEZUnr7XvboZuPSlJUUxg5ACGg2RR8GoR3dgKxpQV0eX2OqSvL4qnkO8w",
          serviceWorkerRegistration,
        })
          .then((currentToken) => {
            if (currentToken) {
              console.log("Client token: " + currentToken);
              return currentToken;
            } else {
              console.log(
                "No registration token available. Request permission to generate one."
              );
            }
          })
          .catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("User Permission Denied.");
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });

const getOrRegisterServiceWorker = async () => {
  if (!"serviceWorker" in navigator) {
    console.log("The browser doesn`t support service worker.");

    return false;
  }

  const hasServiceWorker = await getServiceWorker();

  if (!hasServiceWorker) {
    return await createServiceWorker();
  }
};

const getServiceWorker = async () => {
  try {
    const serviceWorker = await window.navigator.serviceWorker.getRegistration(
      "/firebase-cloud-messaging-push-scope"
    );
    return serviceWorker;
  } catch (error) {
    console.error("Error getting Service Worker:", error);
    return false;
  }
};

const createServiceWorker = async () => {
  try {
    await window.navigator.serviceWorker.register("/firebase-messaging-sw.js");
  } catch (error) {
    console.error("Error registering Service Worker:", error);
    return false;
  }
};

export const onDeleteToken = async () => {
  return await deleteToken(messaging);
};
