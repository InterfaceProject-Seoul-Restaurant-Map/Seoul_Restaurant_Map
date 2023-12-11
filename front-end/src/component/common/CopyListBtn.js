import styled from 'styled-components';

const StyledTag = styled.div`
    padding:1px 3px;
    border-radius: 3px;
    color: orange;
    font-size: 0.8rem;
    border: orange 1px solid;
    margin-left: 10px;
    width: fit-content;
    display: inline-block;
    align-items: center;
    cursor: pointer;
`;

const CopyListBtn = ({ onClick }) => {
    return (
        <StyledTag onClick={onClick}>리스트 복제</StyledTag>
    )
}

export default CopyListBtn;