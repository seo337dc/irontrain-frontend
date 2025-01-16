import React from "react";
import styled from "styled-components";

interface ButtonProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  width?: string;
  height?: string;
}

const Button: React.FC<ButtonProps> = ({
  label = "",
  onClick,
  disabled = false,
  width = "auto",
  height = "auto",
}) => {
  return (
    <ButtonContent
      onClick={onClick}
      disabled={disabled}
      $width={width}
      $height={height}
    >
      {label}
    </ButtonContent>
  );
};

export default Button;

const ButtonContent = styled.button<{
  $width: string;
  $height: string;
}>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  padding: 8px 12px;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;

  border: 1px solid #ddd;

  &:disabled {
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
  }
`;
