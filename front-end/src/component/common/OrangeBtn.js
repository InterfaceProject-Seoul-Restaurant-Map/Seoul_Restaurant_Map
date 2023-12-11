import styled from 'styled-components';
import React from 'react';

const OrangeButton = styled.button`
    background-color: #FF7A00; /* 주황색 */
    color: white;
    font-weight: 700;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    white-space: nowrap; /* 텍스트 줄 바꿈 방지 */
    transition: background-color 0.3s ease; /* hover 시 색 변화 부드럽게 설정 */
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3); /* 그림자 효과 */
    &:hover {
        background-color: #FF8C00; /* hover 시 어둡게 변화 */
    }
`;

const OrangeBtn = ({ onClick, text, style }) => {
    return (
        <span>
            <OrangeButton onClick={onClick} style={style}>{text}</OrangeButton>
        </span>
    );
};

export default OrangeBtn;