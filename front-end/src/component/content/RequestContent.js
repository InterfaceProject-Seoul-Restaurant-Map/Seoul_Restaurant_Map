import { styled } from "styled-components";
import RequestTitle from "../requestComponent/RequestTitle";
import RequestMatzipBoard from "../requestComponent/RequestMatzipBoard";

const StyleRequestWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding:5vh 15vw;
`;


const RequestContent = () => {
    return (
        <StyleRequestWrapper>
            <RequestTitle />
            <RequestMatzipBoard />
        </StyleRequestWrapper>
    )
};

export default RequestContent;