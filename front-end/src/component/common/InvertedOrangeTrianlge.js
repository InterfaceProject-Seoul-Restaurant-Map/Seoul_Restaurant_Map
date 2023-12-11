import styled from 'styled-components';

const StyleInvertedOrangeTriangle = styled.span`
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 18px solid #FF7A00; 
  margin-right: 1vw;
  cursor: pointer;
`;

const InvertedOrangeTriangle = () => {
  return (
    <StyleInvertedOrangeTriangle></StyleInvertedOrangeTriangle>
  );
};

export default InvertedOrangeTriangle;
