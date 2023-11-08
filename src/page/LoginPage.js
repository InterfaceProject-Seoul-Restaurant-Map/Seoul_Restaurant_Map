import styled from 'styled-components';
import LoginCard from '../component/login/LoginCard';

const StyleLogin = styled.div`
    height: 800px;
    display:flex;
    justify-content: center;
    padding-top: 5vh;;
`;

const Login = () => {
    return (
        <StyleLogin>
            <LoginCard />
        </StyleLogin>

    )
};

export default Login;