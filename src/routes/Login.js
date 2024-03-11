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
    try {
      axios.post("/myapp/login", body).then((res) => {
        console.log(res.data);
        
        if (res.data.code === 200) {
          console.log("로그인");
  
          // Store login status in localStorage
          localStorage.setItem("isLoggedIn", true);
  
          navigate('/',{
            state:useraccount
          });
  
        }
        
        
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        
    } 
      console.log("로그인 axios post 실패");
    }
    
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
