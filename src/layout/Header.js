import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.Module.css";

const Header = () => {
  return (
    <header className="header">
      <div className="contents">
        <Link className="logo" to="/">
          리뷰러리
        </Link>
        <nav className="navigation">
          <ul>
            <li>로그인</li>
            <li>회원가입</li>
          </ul>
        </nav>

        <hr />
      </div>
    </header>
  );
};

export default Header;
