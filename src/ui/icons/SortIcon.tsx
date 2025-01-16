import React from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

type TProps = {
  type?: "none" | "asc" | "desc";
};

const SortIcon: React.FC<TProps> = ({ type = "none" }) => {
  const iconStyle = {
    active: "#000", // 활성화된 상태 색상
    inactive: "#ddd", // 비활성화된 상태 색상
    size: 12, // 아이콘 크기
  };

  return (
    <div className="flex flex-col cursor-pointer">
      <AiOutlineCaretUp
        size={iconStyle.size}
        color={type === "asc" ? iconStyle.active : iconStyle.inactive}
      />
      <AiOutlineCaretDown
        size={iconStyle.size}
        color={type === "desc" ? iconStyle.active : iconStyle.inactive}
      />
    </div>
  );
};

export default SortIcon;
