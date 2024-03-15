import React, { useState } from "react";
import axios from "axios";
import "./Login.scss";
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook
import { ToastNotification } from "../ToastNotification";

function Login(props) {
  const [useraccount, setUseraccount] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [toastState, setToastState] = useState(false);
  const navigate = useNavigate(); // Using useNavigate hook instead of useHistory

  const onIDhandler = (event) => {
    setUseraccount(event.target.value);
  };
  const onPwhandler = (event) => {
    setPassword(event.target.value);
  };

  const LoginFunc = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const body = {
      useraccount,
      password,
    };

    axios.post("/myapp/login", body)
      .then((res) => {
        console.log(res.data);
        console.log("로그인");
        // Store login status in localStorage
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("LoginID",useraccount);
        navigate("/", { state: useraccount }); // Using navigate instead of history.push
        console.log("로그인 post 성공");
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setToastState(true);
        }
        console.log("로그인 axios post 실패", error);
        setMsg("로그인 요청에 실패했습니다.");
      });
  };

  return (
    <div className="Login_md">
      <h1>로그인</h1>
      <form onSubmit={LoginFunc}>
        <div className="ID_form_align">
          <label htmlFor="id"> ID: </label>
          <input type="text" id="id" value={useraccount} onChange={onIDhandler} />
        </div>
        <br />
        <div className="PW_form_align">
          <label htmlFor="password">PASSWORD : </label>
          <input type="password" value={password} onChange={onPwhandler} />
        </div>
        <br />
        <button className="Login_button" type="submit">
          로그인
        </button>
        <br />
      </form>
    </div>
  );
}

export default Login;
