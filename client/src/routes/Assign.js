/* Assign.js */

import React, { useState } from 'react';
import './Assign.scss';
import axios from 'axios';

// React 함수 컴포넌트인 'assign' 정의
const Assign = () => {
    // [입력 상태값, 해당 상태값 업데이트 함수] = 리액트훅('');
    const [id, setId] = useState(''); 
    const [pwd, setPwd] = useState('');
    const [pwdCheck, setPwdCheck] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [agree, setAgree] = useState(false); // 서비스 이용약관 동의
    const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 표시

    // ID 중복 확인 함수
    const idCheck = () => { 
        console.log('사용 불가한 ID입니다.');
      };

    // 닉네임 중복 확인 함수
    const nicknameCheck = () => { 
        console.log('사용 불가한 닉네임입니다.');
      };

    // 회원가입 제출 함수
    const assignSubmit = async (e) => {
        e.preventDefault(); // 폼 제출 후 리로드 방지

    // 서비스 이용약관 동의 여부 확인
        if (!agree) { 
            setErrorMessage('서비스 이용약관에 동의해야 합니다.'); // 동의하지 않은 경우 오류 메시지 설정 후 함수 종료
            return;
          }
    
    // 비밀번호와 비밀번호 확인이 일치 여부 확인
        if (pwd !== pwdCheck) {
            setErrorMessage('비밀번호가 일치하지 않습니다.');
            return;
          }
        
    
    // // 서버로 회원가입 데이터를 전송 요청
    //       try {
    //         const response = await axios.post('/api/assign', {
    //           id,
    //           pwd,
    //           pwdCheck,
    //           nickname,
    //           email
    //         });
    //         console.log('회원가입 완료:', response.data); // 성공적으로 응답을 받은 경우 > 콘솔 로그 출력
    //       } catch (error) {
    //          // 서버에서 이미 가입된 ID나 닉네임이라는 응답 시 오류 메시지 처리
    //         if (error.response && error.response.status === 404) {
    //         setErrorMessage('이미 가입된 ID 혹은 닉네임입니다.');
    //       } else { 
    //         console.error('회원가입 실패:', error); // 오류가 발생한 경우 > 콘솔 에러 출력
    //       }
    //     };
    }

    return (
    <div>
    {/* 오류 메시지가 있을 때만 표시 */}
    {errorMessage && <div className="error-message">{errorMessage}</div>}

    {/* 회원가입 폼 */}
    <form onSubmit={assignSubmit}>
        <div className="title">회원가입을 위해 정보를 입력해주세요.</div>
          {/* ID */}
          <div className="input-list">
          <div className="label">ID</div>
          <input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)} />
          {/* 중복 확인 버튼 ID */}
          <button type="id-button" onClick={idCheck}>중복 확인</button>
        </div>
          {/* PWD */}
          <div className="input-list">
          <div className="label">PW</div>
          <input
            type="password"
            placeholder="비밀번호"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)} />
        </div>
          {/* PWD(확인) */}        
          <div className="input-list">
          <div className="label">PW(확인)</div>
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={pwdCheck}
            onChange={(e) => setPwdCheck(e.target.value)} />
        </div>
          {/* 비밀번호 & 비밀번호(확인) 불일치 오류 메시지 */}
          <div className="input-list">
          {pwd !== pwdCheck && <div className="error-message">비밀번호가 일치하지 않습니다.</div>}
        </div>
         
          {/* EMAIL */}
          <div className="input-list">
          <div className="label">이메일</div>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        
    {/* 서비스 이용약관 동의 체크박스 */}
        {/* <label>
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          회원가입 각
        </label> */}
       
    {/* 회원가입 버튼 */}
        <button type="submit">회원가입</button>
    </form>
    </div>
  );
}

export default Assign;