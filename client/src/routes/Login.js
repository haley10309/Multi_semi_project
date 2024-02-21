import React, { useEffect, useState } from "react";
import axios from "axios";
import './Login.scss';

function Login(props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  // useEffect=(()=>{

  // },[mgs])
  const LoginFunc = () => {
    let body = {
      id,
      password,
    };
    // axios.post("Endpoint", body).then((res) => {
    //   console.log(res.data);
    //   if (res.data.code === 200) {
    //     console.log("로그인");
        
    //     setMsg("");
    //   }
    //   if (res.data.code === 400) {
    //     setMsg("ID, Password가 비어있습니다.");
    //   }
    //   if (res.data.code === 401) {
    //     setMsg("존재하지 않는 ID입니다.");
    //   }
    //   if (res.data.code === 402) {
    //     setMsg("Password가 틀립니다.");
    //   }
    // });
  };

  return (
    <div className="Login_md">
      <h1>로그인</h1>
      <form onSubmit={LoginFunc}>
        <label htmlFor="id">ID: </label>
        <input type="text" id="id" />
        <br />
        <label htmlFor="password">PASSWORD : </label>
        <input type="password" />
        <br />
        <button type="submit">로그인</button>
        <br />
        {msg}
      </form>
    </div>
  );
}

export default Login;
