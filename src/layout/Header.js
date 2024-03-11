// Header.js
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.Module.css";

const Header = () => {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <header className="header">
      <div className="contents">
        <Link className="logo" to="/">
          리뷰러리
        </Link>
        <nav className="navigation">
          <ul>
            {!isLoggedIn && <li><Link className="Login" to='/Login'>로그인</Link></li>}
            {!isLoggedIn && <li><Link className="Login" to='/Assign'>회원가입</Link></li>}
          </ul>
        </nav>

        <hr />
      </div>
    </header>
  );
};

export default Header;