import styled from 'styled-components';

const StyleOrangeTriangle = styled.span`
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 18px solid #FF7A00; 
  margin-right: 1vw;
  cursor: pointer;
`;

// 사용 예시
const OrangeTriangle = () => {
  return (
    <StyleOrangeTriangle></StyleOrangeTriangle>
  );
};

export default OrangeTriangle;
