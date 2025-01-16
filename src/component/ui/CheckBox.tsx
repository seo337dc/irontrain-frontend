import React from "react";
import styled from "styled-components";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";

const icons = {
  check: <AiOutlineCheck size={16} color="white" />,
  all: <AiOutlineMinus size={16} color="white" />,
};

type TProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  type?: "check" | "all";
};

const CheckBox: React.FC<TProps> = ({
  type = "check",
  checked = false,
  onChange,
}) => {
  const handleToggle = () => {
    onChange && onChange(!checked);
  };

  return (
    <CheckBoxWrapper onClick={handleToggle} $isChecked={checked}>
      {checked && icons[type]}
    </CheckBoxWrapper>
  );
};

export default CheckBox;

const CheckBoxWrapper = styled.div<{ $isChecked: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid ${({ $isChecked }) => ($isChecked ? "#007BFF" : "#ccc")};
  border-radius: 4px;
  background-color: ${({ $isChecked }) =>
    $isChecked ? "#007BFF" : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #007bff;
  }
`;
