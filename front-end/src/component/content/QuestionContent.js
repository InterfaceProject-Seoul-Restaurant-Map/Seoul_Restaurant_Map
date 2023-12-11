import { styled } from "styled-components";
import QuestionTitle from "../questionComponent/QuestionTitle";
import QuestionBoard from "../questionComponent/QuestionBoard";

const StyleQuestionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding:5vh 15vw;
`;


const QuestionContent = () => {
    return (
        <StyleQuestionWrapper>
            <QuestionTitle />
            <QuestionBoard />
        </StyleQuestionWrapper>
    )
};

export default QuestionContent;