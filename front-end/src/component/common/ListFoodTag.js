import styled from 'styled-components';

const StyledTag = styled.div`
    padding: 3px 5px;
    border-radius: 14px;
    background-color: #f8f9fa;
    border: #FF7A00 1px solid;
    margin-right: 10px;
    width: fit-content;
    display: inline-block;
    margin-bottom: 7px;       
`;
const ListFoodTag = ({ text }) => {
    return (
        <StyledTag>{text}</StyledTag>
    )
}

export default ListFoodTag;