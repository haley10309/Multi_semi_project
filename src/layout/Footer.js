/* Footer.js */
import React from 'react';
import styles from "./Footer.Module.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div id='wrapper'>
          <div>
            <h4> MULTICAMPUS 19TH SEMI PROJECT @TEAM_6 (REVIEWRARY) </h4>
            <br></br>
          </div>
          <div>
            <h3 className='each_role'>FRONT</h3>
            <p>곽민경 <br></br> <a href="mailto:mkkwak95@gmail.com">mkkwak95@gmail.com</a></p>
            <p>유하영 <br></br> <a href="mailto:yoohayung10309@gmail.com">yoohayung10309@gmail.com</a></p>
          </div>
          <br></br>
          <div>
            <h3 className='each_role'>BACK</h3>
            <p>유욱현 <br></br> <a href="mailto:why970126@gmail.com">why970126@gmail.com</a></p> 
            <p>전민훈 <br></br> <a href="mailto:a01066215336@gmail.com">a01066215336@gmail.com</a></p>
          </div>
        </div>
        <div className="copyright">
          <p>ⓒ 2024 TEAM_6 (REVIEWRARY) All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;