import React, { useState } from 'react';
import './Assign.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// React 함수 컴포넌트인 'Assign' 정의
const Assign = () => {
    // 입력 상태값 및 해당 상태값 업데이트 함수 정의
    const [useraccount, setUseraccount] = useState(''); 
    const [password, setPassword] = useState('');
    const [pwdCheck, setPwdCheck] = useState('');
    const [email, setEmail] = useState('');
    const [agree, setAgree] = useState(false); // 서비스 이용약관 동의
    const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 표시
    const navigate = useNavigate(); // navigate 함수 가져오기

    // ID 중복 확인 함수
    const idCheck = async () => { 
      try {
          const response = await axios.post('/myapp/useraccount', { id: useraccount });
          console.log('ID 중복 확인 결과:', response.data);
          // 서버로부터 응답을 받아 처리하는 코드 추가
      } catch (error) {
          console.error('ID 중복 확인 오류:', error);
          // 오류 처리 코드 추가
      }
  };

    // 회원가입 제출 함수
    const assignSubmit = async (e) => {
        e.preventDefault(); // 폼 제출 후 리로드 방지

        // 서비스 이용약관 동의 여부 확인
        if (!agree) { 
            setErrorMessage('클린 리뷰어 약속에 동의해주세요.'); // 동의하지 않은 경우 오류 메시지 설정 후 함수 종료
            return;
        }
    
        // 비밀번호와 비밀번호 확인이 일치 여부 확인
        if (password !== pwdCheck) {
            setErrorMessage('비밀번호가 일치하지 않습니다.');
            return;
        }
        
        try {
            const response = await axios.post('/myapp/assign', {
                useraccount,
                password,
                email
            });
            console.log('회원가입 완료:', response.data);
            navigate('/login'); // 회원가입 완료 후 로그인 페이지로 이동
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setErrorMessage('이미 가입된 ID 혹은 닉네임입니다.');
            } else { 
                console.error('회원가입 실패:', error);
            }
        }
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
                        value={useraccount}
                        onChange={(e) => setUseraccount(e.target.value)}
                        pattern="[a-zA-Z0-9]+"
                        title="영어와 숫자만 입력 가능합니다."
                    />
                    {/* 중복 확인 버튼 ID */}
                    <button className="id-button" type="button" onClick={idCheck}>중복 확인</button>
                </div>
                
                {/* PWD */}
                <div className="input-list">
                    <div className="label">PW</div>
                    <input
                        type="password"
                        laceholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        pattern="[a-zA-Z0-9]+"
                        title="영어와 숫자만 입력 가능합니다."
                    />
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
                    {password !== pwdCheck && <div className="error-message">비밀번호가 일치하지 않습니다.</div>}
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
                <label>
                    <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                    />
                매너를 지키는 클린 리뷰어임을 약속합니다!
                </label>
               
                {/* 회원가입 버튼 */}
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}

export default Assign;