import { styled } from "styled-components";

const StyleSubOverlay = styled.div`
    position: absolute;
    bottom: 20px;
    height: 30px;
    padding: 3px 10px;
    margin-left: -75px;
    border-radius: 1px;
    width: 130px;
    background-color: white;
    border: 2px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
`

const SubOverlay = ({ marker }) => (
    <StyleSubOverlay>
        {marker.restaurant_name}
    </StyleSubOverlay>
);

export default SubOverlay;