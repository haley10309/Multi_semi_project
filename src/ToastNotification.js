import React, { useEffect } from "react";
import "./Toast.scss";

function ToastNotification({ setToastState }) {
  useEffect(() => {
    let timer = setTimeout(() => {
      setToastState(false); // Update toastState after 2 seconds
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [setToastState]);

  return (
    <div className="toast-alert">
      <img alt="" src="img/alert.png" />
      <p>로그인 실패</p>
    </div>
  );
}

export { ToastNotification };