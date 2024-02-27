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
            <Link className="Login" to='/Login'>로그인</Link>
            <li><Link className="Assign" to='/Assign'>회원가입</Link></li>
          </ul>
        </nav>

        <hr />
      </div>
    </header>
  );
};

export default Header;
