import styled from "styled-components";
import LoginForm from "./LoginForm";

const StyleLoginCard = styled.main`
    width: 480px;
    min-height: 900px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 786px) {
        width: 80%;
    }
`;
const StyleLoginTitle = styled.p`
    font-size: 28px;
    color: #FF7A00;
    @media (max-width: 786px) {
        font-size: 8vw;
    }
`;

const LoginCard = () => {
    return (
        <StyleLoginCard>
            <StyleLoginTitle>Mat Zip 로그인</StyleLoginTitle>
            <LoginForm />
        </StyleLoginCard>
    );
};

export default LoginCard;