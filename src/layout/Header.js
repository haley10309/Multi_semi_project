// Header.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.Module.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Update isLoggedIn state based on localStorage
  useEffect(() => {
    const storedLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(storedLoggedIn);
    
  }, [isLoggedIn]);

  const handleLogout = () => {
    // Clear localStorage and update state
    localStorage.setItem("isLoggedIn",false);
    setIsLoggedIn(false);
    
  };

  return (
    <header className="header">
      <div className="contents">
        <Link className="logo" to="/">
          리뷰러리
        </Link>
        <nav className="navigation">
          <ul>
            {!isLoggedIn && (
              <>
                <li>
                  <Link className="Login" to="/Login">
                    로그인
                  </Link>
                </li>
                <li>
                  <Link className="Login" to="/Assign">
                    회원가입
                  </Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <li>
                <button className="Login_out" onClick={handleLogout}>
                  로그아웃
                </button>
              </li>
            )}
          </ul>
        </nav>
        <hr />
      </div>
    </header>
  );
};

export default Header;
