import React from "react";
import styled from "styled-components";
import type { RadioGroupOption } from "@/model/ui";

interface RadioButtonProps {
  options: RadioGroupOption[];
  selectedValue: string;
  onChange: (value: any) => void;
  name: string;
  direction?: "row" | "column";
}

const RadioButton: React.FC<RadioButtonProps> = ({
  options,
  selectedValue,
  onChange,
  name,
  direction = "row",
}) => {
  return (
    <RadioGroup direction={direction}>
      {options.map((option) => (
        <label className="flex items-center gap-2 text-sm" key={option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={(e) => onChange(e.target.value)}
          />
          {option.label}
        </label>
      ))}
    </RadioGroup>
  );
};

export default RadioButton;

const RadioGroup = styled.div<{ direction: "row" | "column" }>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  gap: 10px;
`;
