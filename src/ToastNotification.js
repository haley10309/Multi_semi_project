import React, { useState, useEffect } from "react";

// css
import "./Toast.scss";

function ToastNotification() {
    useEffect((props) => {
        let timer = setTimeout(() => {
            props.setToastState(false);		// 2초 뒤, toastState가 false가 되면서 알림창이 사라진다
        }, 2000);

        return () => { clearTimeout(timer) }
    }, []);


    return (
        <div className="toast-alert">
            <img alt="" src="img/alert.png" />
            <p>로그인 실패했습니다 
                <br/>
                다시 한 번 시도해 주세요
            </p>
        </div>
    );
}

export { ToastNotification }