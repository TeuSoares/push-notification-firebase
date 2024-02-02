import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { fetchToken, onMessageListener, onDeleteToken } from "../firebase";

const Notification = () => {
  const [notification, setNotification] = useState({ title: "", body: "" });
  // const [oldToken, setOldToken] = useState<string | void | undefined>();
  // const [newToken, setNewToken] = useState<string | void | undefined>();
  const [token, setToken] = useState<any>('');

  const notify = () => toast(<ToastDisplay />);

  function ToastDisplay() {
    return (
      <div>
        <p>
          <b>{notification?.title}</b>
        </p>
        <p>{notification?.body}</p>
      </div>
    );
  }

  useEffect(() => {
    if (notification?.title) {
      notify();
    }
  }, [notification]);

  useEffect(() => {
    // const token_user = 'fKOACZXuoLbnkSLaGBjGg4:APA91bFl1BAfm_MtcOXQ6ennP6-n0fX1NZh50uoxXu37magKecTKU6H3K32dt--THFANuxu6ReFnKSsiOsux7FJax99yx8PiYEQn3VjcuqcciCILHIquhOOVs0r4K3xAbuBpL_j0LHDO';

    const generateToken = async () => {
      // const token = await fetchToken()
      // setOldToken(token);

      // if (token == token_user) {
      //   await onDeleteToken();
      //   const newToken = await fetchToken()
      //   setNewToken(newToken)
      // }

      const token = await fetchToken()
      setToken(token)
    }

    generateToken();

    onMessageListener()
      .then((payload) => {
        setNotification({
          title: payload?.notification?.title,
          body: payload?.notification?.body,
        });
      })
      .catch((err) => console.log("failed: ", err));
  }, []);

  return (
    <>
      <Toaster />
      <p>Token: {token}</p>
    </>
  );
};

export default Notification;
