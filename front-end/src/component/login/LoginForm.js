import styled from "styled-components";
import StyleInput from "../common/Input"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMarkers } from "../util/MyContext";

const StyleLoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 400px;
    @media (max-width: 786px) {
        width: 100%;
        align-items: center;
    }
`;

const StyleErrorMessage = styled.div`
    font-size: 0.5rem;
    color: red;
    margin-bottom: 10px;
`;

const StyleSubmitBtn = styled.button`
    width: 350px;
    height: 50px;
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

const LoginForm = () => {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [idError, setIdError] = useState("");
    const { isLogin, setIsLogin } = useMarkers();

    const config = {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json', // 예시로 Content-Type 헤더를 추가했습니다.
        },
        withCredentials: true,
    };

    const onChangeIdHandler = (e) => {
        const idValue = e.target.value;
        setId(idValue);
        idCheckHandler(idValue);
    };

    const idCheckHandler = async (id) => {
        const idRegex = /^[a-z\d]{5,10}$/;
        if (id === '') {
            setIdError('아이디를 입력해주세요.');
            return false;
        } else if (!idRegex.test(id)) {
            setIdError('아이디는 5~10자의 영소문자, 숫자만 입력 가능합니다.');
            return false;
        } else {
            setIdError('');
            return true;
        }
    }

    //로그인 제출했을시 함수
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const [id, password] = event.target;
        let body = { id: id.value, password: password.value };
        await axios
            .post("/login", body, config)
            .then((response) => {
                if (response.data === 'ID_ERROR') {
                    alert("일치하는 아이디가 없습니다.");
                } else if (response.data === 'PASSWORD_ERROR') {
                    alert("일치하는 패스워드가 없습니다.");
                } else {
                    sessionStorage.clear();
                    sessionStorage.setItem("userId", id.value);
                    setIsLogin(true);
                    alert("로그인 성공! 환영합니다");
                    navigate("/");
                }
            })
            .catch((error) => console.log(error));
    };
    return (
        <StyleLoginForm onSubmit={onSubmitHandler}>
            <div>
                <StyleInput
                    label="아이디"
                    placeholder="홍박사"
                    type="text"
                    value={id}
                    onChange={onChangeIdHandler}
                />
                <StyleErrorMessage>{idError}</StyleErrorMessage>
                <StyleInput label="비밀번호" placeholder="********" type="password" />
            </div>
            <StyleSubmitBtn>로그인</StyleSubmitBtn>
        </StyleLoginForm>
    );
};

export default LoginForm;