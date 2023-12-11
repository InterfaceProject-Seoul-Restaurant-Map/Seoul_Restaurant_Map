import styled from 'styled-components';

const StyledTag = styled.div`
    padding:1px 3px;
    border-radius: 3px;
    color: red;
    font-size: 0.8rem;
    border: red 1px solid;
    margin-left: 10px;
    width: fit-content;
    display: inline-block;
    align-items: center;
    cursor: pointer;
`;

const DeleteListElementBtn = ({ onClick }) => {
    return (
        <StyledTag onClick={onClick}>삭제</StyledTag>
    )
}

export default DeleteListElementBtn;