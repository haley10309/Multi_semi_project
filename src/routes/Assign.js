import React, { useState } from 'react';
import './Assign.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Assign = () => {
    const [useraccount, setUseraccount] = useState('');
    const [password, setPassword] = useState('');
    const [pwdCheck, setPwdCheck] = useState('');
    const [email, setEmail] = useState('');
    const [agree, setAgree] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // 추가: 비밀번호 보이기/숨기기 상태
    const [showPwdCheck, setShowPwdCheck] = useState(false); // 추가: 비밀번호 확인 보이기/숨기기 상태
    const navigate = useNavigate();

    // ID 중복 확인 함수
    const idCheck = async () => {
        // 입력값이 영어와 숫자로만 구성되었는지 검증
        const alphanumericRegex = /^[a-zA-Z0-9]+$/;
        if (!alphanumericRegex.test(useraccount)) {
            alert('영어와 숫자로만 구성된 ID와 PW를 입력해주세요.');
            return;
        }
        
        const lowercaseUserAccount = useraccount.toLowerCase();

        try {
            const response = await axios.post('/myapp/useraccount', { useraccount: useraccount });
            console.log('ID 중복 확인 결과:', response.data);
            if (response.status === 200) {
            if (response.data.exists || lowercaseUserAccount === 'guest') {
                // 이미 사용된 ID + guest 제약 추가
                alert('이미 사용된 ID이거나 허용되지 않는 ID입니다.');
            } else {
                // 사용 가능한 ID인 경우
                alert('사용 가능한 ID입니다.');
            }
        } else {
            alert('잠시 후 다시 시도해주세요.');
        }
        } catch (error) {
            console.error('ID 중복 확인 오류:', error);
            if (error.response && error.response.status === 404) {
                alert('이미 사용된 ID입니다.');
            } else {
                alert('사용할 수 없는 ID 혹은 서버 오류입니다.');
            }
        }
    };

    // ID, 비밀번호에 특수문자나 한글이 포함되었는지 확인하는 함수
    const checkCharacters = (value) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>ㄱ-ㅎㅏ-ㅣ]/;
    return specialCharRegex.test(value);
    };

    // 비밀번호 보이기/숨기기 토글 함수
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // 비밀번호 확인 보이기/숨기기 토글 함수
    const togglePwdCheckVisibility = () => {
        setShowPwdCheck(!showPwdCheck);
    };

    // 이메일 형식을 확인하는 함수
    const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
    };

    // 회원가입 제출 함수
    const assignSubmit = async (e) => {
        e.preventDefault(); // 폼 제출 후 리로드 방지

        if (!useraccount || !password || !pwdCheck || !email) {
            alert('모든 정보를 입력해주세요.');
            return;
        }

        if (useraccount === 'guest') {
            alert('이미 가입된 ID 혹은 정보입력 오류입니다.');
            return;
        }

        // 입력된 값에 특수문자나 한글이 포함되었는지 확인
        if (checkCharacters(useraccount) || checkCharacters(password) || checkCharacters(pwdCheck)) {
        alert('ID/PW는 영어와 숫자만 입력 가능합니다.');
        return;
        }

        // 이메일 형식을 확인
        if (!validateEmail(email)) {
        alert('EMAIL 형식을 지켜주세요.(예시: email@email.com)');
        return;
        }

        // 서비스 이용약관 동의 여부 확인
        if (!agree) {
            alert('클린 리뷰어 약속에 동의해주세요.'); // 동의하지 않은 경우 오류 메시지 설정 후 함수 종료
            return;
        }

        try {
            const response = await axios.post('/myapp/assign', {
                useraccount,
                password,
                email
            });
            console.log('회원가입 완료:', response.data);
            alert('회원가입이 완료되었습니다.');
            navigate('/login'); // 회원가입 완료 후 로그인 페이지로 이동
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.status === 404) {
                alert('이미 가입된 ID 혹은 정보입력 오류입니다.');
            } else {
                console.error('회원가입 실패:', error);
                alert('이미 가입된 ID 혹은 정보입력 오류입니다.');
            }
        }
    };

    return (
        <div className="assign-form">
            {/* 회원가입 폼 */}
            <form onSubmit={assignSubmit}>
                <div className="title">회원가입을 위해 정보를 입력해주세요.</div>

                {/* ID 입력 필드 */}
                <div className="input-list">
                    <div className="label">ID</div>
                    <input
                        type="text"
                        placeholder="아이디"
                        value={useraccount}
                        onChange={(e) => setUseraccount(e.target.value)}
                        className="id-input"
                        pattern="[a-zA-Z0-9]+"
                        title="영어와 숫자만 입력 가능합니다."
                    />
                    {/* 중복 확인 버튼 */}
                    <button className="id-button" type="button" onClick={idCheck}>중복 확인</button>
                </div>

                {/* 비밀번호 입력 필드 */}
                <div className="input-list">
                    <div className="label">PW</div>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pw-input"
                        pattern="[a-zA-Z0-9]+"
                        title="영어와 숫자만 입력 가능합니다."
                    />
                    {/* 비밀번호 보이기/숨기기 토글 버튼 */}
                    <button type="button" className="show-hide-button" onClick={togglePasswordVisibility}>
                    {showPassword ? "숨기기" : "보이기"}
                    </button>
                    </div>
                
                {/* 비밀번호 확인 입력 필드 */}
                <div className="input-list">
                    <div className="label">PW(CHECK)</div>
                    <input
                        type={showPwdCheck ? "text" : "password"}
                        placeholder="비밀번호 확인"
                        value={pwdCheck}
                        onChange={(e) => setPwdCheck(e.target.value)}
                        className="confirm-pw-input"
                        pattern="[a-zA-Z0-9]+"
                        title="영어와 숫자만 입력 가능합니다."
                    />
                     {/* 비밀번호 확인 보이기/숨기기 토글 버튼 */}
                    <button type="button" className="show-hide-button" onClick={togglePwdCheckVisibility}>
                    {showPwdCheck ? "숨기기" : "보이기"}
                    </button>
                    </div>

                {/* 비밀번호 & 비밀번호(확인) 불일치 오류 메시지 */}
                {password !== pwdCheck && (
                    <div className="input-list">
                        <div className="error-message-confirm">비밀번호가 서로 일치하지 않습니다.</div>
                    </div>
                )}

                {/* 이메일 입력 필드 */}
                <div className="input-list">
                    <div className="label">EMAIL</div>
                    <input
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="email-input"
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                        title="이메일 형식으로만 입력 가능합니다. 예)email@email.com"
                    />
                </div>

                {/* 동의 체크박스 */}
                <label>
                    <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                    />
                    매너를 지키는 클린 리뷰어임을 약속합니다!
                </label>

                {/* 회원가입 버튼 */}
                <button
                type="submit"
                className="assign-button"
                onClick={(e) => {
                e.preventDefault(); // 폼 제출 방지
                assignSubmit(e); // 이벤트 객체 전달
                }}
                >
                회원가입
                </button>
            </form>
        </div>
    );
};

export default Assign;