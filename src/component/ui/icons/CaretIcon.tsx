import React from "react";
import { AiOutlineCaretRight } from "react-icons/ai";
import { AiOutlineCaretDown } from "react-icons/ai";

type TProps = {
  type?: "right" | "down";
  className?: string;
};

const CaretIcon: React.FC<TProps> = ({ type = "right", className = "" }) => {
  if (type === "down")
    return <AiOutlineCaretDown className={className} size={16} />;
  return <AiOutlineCaretRight className={className} size={16} />;
};

export default CaretIcon;
