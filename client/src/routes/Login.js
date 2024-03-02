import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Login.scss";

function Login(props) {
  const [user_id, setUser_id] = useState("");
  const [user_pw, setUser_pw] = useState("");
  const [msg, setMsg] = useState("");

  const onIDhandler = (event) => {
    setUser_id(event.target.value);
  };
  const onPwhandler = (event) => {
    setUser_pw(event.target.value);
  };

  // useEffect=(()=>{

  // },[mgs])
  const LoginFunc = () => {
    let body = {
      user_id,
      user_pw,
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
        <button type="submit">로그인</button>
        <br />
        {msg}
      </form>
    </div>
  );
}

export default Login;
