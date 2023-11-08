import styled from "styled-components";

const StyleInputContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyleInput = styled.input`
    width: 320px;
    height:44px;
    background-color: #fcfcfc;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 0 12px;
    font-size: 16px;
    margin-bottom: 20px;
    &:focus{
        outline:none;
        border-color: #FF7A00;
        opacity: 0.8;
    }
`;

const StyleLabel = styled.label`
    font-size: 12px;
    margin-bottom: 12px;
`;

const Input = (props) => {
    let { label, placeholder, type, value, onChange, onBlur } = props;
    return (
        <StyleInputContainer>
            <StyleLabel>{label}</StyleLabel>
            <StyleInput
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />
        </StyleInputContainer>
    )
}

export default Input;