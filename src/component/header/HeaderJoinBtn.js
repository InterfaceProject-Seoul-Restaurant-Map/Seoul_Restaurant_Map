import { Link } from "react-router-dom";
import styled from "styled-components";

const StyleJoinBtn = styled.span`
    font-size: 13px;
    font-weight: bold;
    color: black;
    text-decoration-line: none;
`;

const HeaderJoinBtn = () => {
    return (
        <Link to="/join">
            <StyleJoinBtn>JOIN</StyleJoinBtn>
        </Link>
    );
};

export default HeaderJoinBtn;