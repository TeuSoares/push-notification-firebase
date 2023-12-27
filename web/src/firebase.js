import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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

export const requestPermission = () => {
  Notification.requestPermission().then((permission) => {
    if (permission == "granted") {
      return getToken(messaging, {
        vapidKey:
          "BEmIzrj7pf27ceQ_kukqG60rjJSOIdnEZUnr7XvboZuPSlJUUxg5ACGg2RR8GoR3dgKxpQV0eX2OqSvL4qnkO8w",
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log("Client Token: ", currentToken);
          } else {
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
        });
    } else {
      console.log("User Permission Denied.");
    }
  });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });
