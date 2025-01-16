import React from "react";
import { styled } from "styled-components";

type TProps = {
  id?: string;
  name?: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
};
const Input: React.FC<TProps> = ({
  id,
  name,
  placeholder = "",
  value,
  onChange,
  width = "100%",
}) => {
  return (
    <Wrapper width={width}>
      <InputContent
        id={id}
        name={name}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </Wrapper>
  );
};

export default Input;

const Wrapper = styled.div<{ width: string }>`
  width: ${({ width }) => width};
`;

const InputContent = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  &:focus {
    border-color: #007bff;
  }
`;
