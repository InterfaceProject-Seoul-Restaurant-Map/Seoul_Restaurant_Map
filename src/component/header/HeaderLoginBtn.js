import { Link } from "react-router-dom";
import styled from "styled-components";

const StyleLoginBtn = styled.span`
    margin: 0;
    font-size: 13px;
    font-weight: bold;
    color: black;
    text-decoration: none;
    margin-right: 15px;
`;

const HeaderLoginBtn = () => {
    return (
        <Link to="/login">
            <StyleLoginBtn>LOGIN</StyleLoginBtn>
        </Link>
    );
};

export default HeaderLoginBtn;