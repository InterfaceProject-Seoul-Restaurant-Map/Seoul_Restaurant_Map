import styled from "styled-components";
import StyleInput from "../common/Input";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import JoinIntensity from "./JoinIntensity";

const StyleLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 400px;
  padding: 20px;
  @media (max-width: 786px) {
    height: 100%;
    padding-right: 30px;
  }
`;

const StyleUserNameConfirmBtn = styled.input.attrs({ type: "button" })`
  width: 100px;
  height: 30px;
  border: solid 1px #FF7A00;
  font-family: "Noto Sans KR", sans-serif;
  background-color: white;
  color: #FF7A00;
  border-radius: 10px;
  /* margin-bottom: 10px; */
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 786px) {
    width: 50%;
    height: 70%;
  }
`;

const StyleErrorMessage = styled.div`
    font-size: 0.5rem;
    color: red;
    margin-bottom: 10px;
`;

const StyleSubmitBtn = styled.button`
    width: 350px;
    height: 200px;
    background-color: tomato;
    border: none;
    border-radius: 2px;
    color: white;
    font-size: 1rem;
    padding:10px 10px;
    &:hover {
        cursor: pointer;
    }
`;

// const SERVER_URL = 'http://'




const JoinForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [idError, setIdError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const [isIdCheck, setIsIdCheck] = useState(false); //아이디 중복검사 했는지
    const [isIdAvailable, setIsIdAvailable] = useState(false); // 아이디 사용 가능한지 아닌지


    const onChangeEmailHandler = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        checkEmail(emailValue);
    };

    const onChangeIdHandler = (e) => {
        const idValue = e.target.value;
        setId(idValue);
        idCheckHandler(idValue);
    };

    const onChangePasswordHandler = (e) => {
        const value = e.target.value;
        setPassword(value);
        passwordCheckHandler(value);
    }

    const onChangeConfirmPasswordHandler = (e) => {
        const confirmPasswordValue = e.target.value;
        setConfirmPassword(confirmPasswordValue);
        isConfirmPasswordSame(password, confirmPasswordValue);
    };

    const checkEmail = (email) => {
        if (!email.includes("@") || !email.includes(".")) {
            setEmailError('올바르지 않은 이메일 형식입니다.');
            return false;
        }
        setEmailError("");
        return true;
    };

    const idCheckHandler = async (id) => {
        const idRegex = /^[a-z]+[a-z0-9]{4,9}$/g;
        console.log(!(idRegex.test(id)));
        if (id === '') {
            setIdError('아이디를 입력해주세요.');
            setIsIdAvailable(false);
            return false;
        } else if (!(idRegex.test(id))) {
            setIdError(() => '아이디는 5~10자의 영소문자, 숫자만 입력 가능합니다.');
            setIsIdAvailable(false);
            return false;
        } else {
            setIdError(() => "");
            setIsIdAvailable(true);
        }

        // try {
        //     const response = await axios.get("server주소");

        //     console.log(response);
        //     if (response.status === 200 && response.data) {
        //         setIdError('사용 가능한 아이디입니다.');
        //         setIsIdCheck(true);
        //         setIsIdAvailable(true);
        //         return true;
        //     } else {
        //         setIdError('이미 사용중인 아이디입니다.');
        //         setIsIdAvailable(false);
        //         return false;
        //     }
        // } catch (error) {
        //     alert('서버 오류입니다. 관리자에게 문의하세요.');
        //     console.error(error);
        //     return false;
        // }
    }

    const passwordCheckHandler = (password) => {
        const passwordRegex = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,}$/;
        if (password === '') {
            setPasswordError('비밀번호를 입력해주세요.');
            return false;
        } else if (!passwordRegex.test(password)) {
            setPasswordError('비밀번호는 8자 이상의 영소문자, 숫자, !@*&-_만 입력 가능합니다.');
            return false;
        } else {
            setPasswordError('');
            return true;
        }
    }

    const isConfirmPasswordSame = (password, confirmPassword) => {
        if (confirmPassword !== password) {
            setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
            return false;
        } else {
            setConfirmPasswordError('');
            return true;
        }
    };

    const finalValidation = () => {
        if (checkEmail(email) && isConfirmPasswordSame(password, confirmPassword)
            && passwordCheckHandler(password) && idCheckHandler(id))
            return true;
        return false;
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const joinData = {
            email: email,
            password: password,
            id: id,
        }
        if (finalValidation() === true) {
            await axios
                .post("server url", joinData)
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        alert("회원가입에 성공하셨습니다.");
                        navigate("/login");
                    }
                    else {
                        alert("이미 회원가입 완료한 이메일입니다.");
                    }
                })
        }
    };

    return (
        <StyleLoginForm>
            <StyleInput
                label="이메일"
                placeholder="matzip@naver.com"
                type="text"
                value={email}
                onChange={onChangeEmailHandler}
            />
            {<StyleErrorMessage>{emailError}</StyleErrorMessage>}

            <StyleInput
                name="id"
                label='아이디'
                placeholder="홍박사"
                type="text"
                value={id}
                onChange={onChangeIdHandler}
            />
            <StyleErrorMessage>{idError}</StyleErrorMessage>

            <StyleInput
                name="password"
                label="비밀번호"
                placeholder="Password"
                type="password"
                value={password}
                onChange={onChangePasswordHandler}
            />
            {<StyleErrorMessage>{passwordError}</StyleErrorMessage>}
            <StyleInput
                name="confirmPassword"
                label="비밀번호 확인"
                placeholder="Confrim Password"
                type="password"
                value={confirmPassword}
                onChange={onChangeConfirmPasswordHandler}
            />
            {<StyleErrorMessage>{confirmPasswordError}</StyleErrorMessage>}

            <StyleSubmitBtn>회원가입</StyleSubmitBtn>
            {/* <StyleSubmitBtn onClick={onSubmitHandler}>회원가입</StyleSubmitBtn> */}
        </StyleLoginForm>
    );
};

export default JoinForm;