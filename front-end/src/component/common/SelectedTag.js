import styled from 'styled-components';

const StyledTag = styled.div`
    padding: 5px 10px;
    border-radius: 14px;
    color: ${({ $isSelected }) => (!$isSelected ? "#FF7A00" : "white")};
    background-color: ${({ $isSelected }) => (!$isSelected ? "white" : "#FF7A00")};
    border: ${({ $isSelected }) => (!$isSelected ? "#FF7A00 1px solid" : "none")};
    margin-right: 10px;
    width: fit-content;
    &:hover { cursor: pointer; }
    display: inline-block;
    margin-bottom: 7px;       
`;

const SelectedTag = ({ text, isSelected, onClick }) => {
    return (
        <StyledTag $isSelected={isSelected} onClick={onClick}>{text}</StyledTag>
    )
}

export default SelectedTag;