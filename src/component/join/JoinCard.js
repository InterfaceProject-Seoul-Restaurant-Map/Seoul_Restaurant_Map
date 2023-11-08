import styled from "styled-components";
import JoinForm from "./JoinForm";

const StyleJoinCard = styled.main`
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
const StyleJoinTitle = styled.p`
    font-size: 28px;
    color: #FF7A00;
    @media (max-width: 786px) {
        font-size: 8vw;
    }
`;

const JoinCard = () => {
    return (
        <StyleJoinCard>
            <StyleJoinTitle>Mat Zip 회원가입</StyleJoinTitle>
            <JoinForm />
        </StyleJoinCard>
    );
};

export default JoinCard;