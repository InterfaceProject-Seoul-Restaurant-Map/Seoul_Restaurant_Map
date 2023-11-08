import styled from 'styled-components';
import JoinCard from '../component/join/JoinCard';

const StyleJoin = styled.div`
    height: 800px;
    display:flex;
    justify-content: center;
    padding-top: 5vh;;
`;

const JoinPage = () => {
    return (
        <StyleJoin>
            <JoinCard />
        </StyleJoin>
    )
};

export default JoinPage;