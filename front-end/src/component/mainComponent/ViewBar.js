import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

const StyledInput = styled.input`
    width: 100%;
    color: red; /* 원하는 색상으로 설정하세요 */
    -webkit-appearance: none; /* 기본 CSS 스타일을 적용하지 않기 위해서 */
    height: 15px; /* 슬라이더 두께 */
    border: black 1px solid;
    border-radius: 5px; /* 슬라이더 모서리를 약간 둥글게 */
    background: white; /* 슬라이더 색상 */
    &::-webkit-slider-thumb {
            -webkit-appearance: none; /* 기본 CSS 스타일을 적용하지 않기 위해서 */
            width: 30px; /* 슬라이더 핸들 길이 */
            height: 30px; /* 슬라이더 핸들 높이 */
            border-radius: 50%; /* 핸들 모양을 원모양으로 만들기 위함 */
            background: #FF7A00; /* 슬라이더 핸들 색상 */
            cursor: pointer; /* 슬라이더 핸들에 마우스를 갖다대면 포인터로 변경 */
        }
`;

const ViewBar = ({ onViewChange }) => {
    const [value, setValue] = useState(10000);

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    useEffect(() => {
        onViewChange(value);
    }, [value])

    return (
        <div>
            <StyledInput
                type="range"
                min={10000}
                max={1000000}
                step={10000} // 이 부분을 조절해서 step을 변경할 수 있습니다.
                value={value}
                onChange={handleChange}
            />
            <p>현재 조회수: {value >= 1000000 ? `${value / 10000}만+` : `${value / 10000} 만`}</p>
        </div>
    );
};

export default ViewBar;
