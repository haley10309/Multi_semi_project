import React, { useState, useEffect } from "react";

// css
import "./Toast.scss";

function ToastNotification() {
    

    return (
        <div className="toast-alert">
            <img alt="" src="img/alert.png" />
            <p>입력하지 않은 칸이 있습니다!</p>
        </div>
    );
}

export { ToastNotification }