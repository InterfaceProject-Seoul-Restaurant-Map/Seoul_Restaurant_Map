import styled from 'styled-components';

const selectedTag = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    padding: 5px 10px;
    border-radius: 15px;
    color: black;
    margin-right: 10px;
    margin-bottom: 7px;       
`;

const SelectedTag = ({ text }) => {
    return (
        <selectedTag>{text}</selectedTag>
    )
}

export default SelectedTag;