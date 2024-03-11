// Login.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Login.scss";
import { useNavigate } from 'react-router-dom';

function Login(props) {
  const [useraccount, setUseraccount] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const onIDhandler = (event) => {
    setUseraccount(event.target.value);
  };
  const onPwhandler = (event) => {
    setPassword(event.target.value);
  };

  const LoginFunc = () => {
    let body = {
      useraccount,
      password,
    };
    axios.post("/login", body).then((res) => {
      console.log(res.data);
      
      if (res.data.code === 200) {
        console.log("로그인");

        // Store login status in localStorage
        localStorage.setItem("isLoggedIn", true);

        navigate('/',{
          state:useraccount
        });

      }
      if (res.data.code === 400) {
        setMsg("ID, Password가 비어있습니다.");
      }
      if (res.data.code === 401) {
        setMsg("존재하지 않는 ID입니다.");
      }
      if (res.data.code === 402) {
        setMsg("Password가 틀립니다.");
      }
    });
  };

  return (
    <div className="Login_md">
      <h1>로그인</h1>
      <form onSubmit={LoginFunc}>
        <div className="ID_form_align">
          <label htmlFor="id">   ID: </label>
          <input type="text" id="id" onChange={onIDhandler} />
        </div>
        <br />
        <div className="PW_form_align">
          <label htmlFor="password">PASSWORD : </label>
          <input type="password" onChange={onPwhandler} />
        </div>
        <br />
        <button className="Login_button" type="submit">로그인</button>
        <br />
        {msg}
      </form>
    </div>
  );
}

export default Login;
