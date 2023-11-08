import styled from "styled-components";
import StyleInput from "../common/Input"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
        }
    }

    //로그인 제출했을시 함수
    const onSubmit = async (event) => {
        event.preventDefault();
        const [email, password] = event.target;
        let body = { email: email.value, password: password.value };
        await axios
            .post("https://api.colorfulworld.site/api/login", body)
            .then((response) => {
                if (response.status === 200) {
                    axios.defaults.headers.common[
                        "access_token"
                    ] = `${response.headers.access_token}`;
                    console.log(response);
                    localStorage.setItem("atk", response.headers.access_token);
                    localStorage.setItem("rtk", response.headers.refresh_token);
                    localStorage.setItem("index", response.headers.intensity);
                    localStorage.setItem("loginState", true);
                    alert("로그인 성공! 환영합니다.");
                    navigate("/");
                } else if (response.response.data.code === "LOGIN-001") {
                    alert("일치하는 회원이 없습니다. 먼저 회원가입을 진행해주세요!");
                } else if (response.response.data.code === "LOGIN-002") {
                    alert("비밀번호가 일치하지 않습니다.");
                }
            })
            .catch((error) => console.log(error));
    };
    return (
        <StyleLoginForm>
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