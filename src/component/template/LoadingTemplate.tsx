import React from "react";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";

const LoadingTemplate: React.FC = () => {
  return (
    <div className="fixed w-screen h-screen left-0 top-0 flex flex-col justify-center items-center gap-4 bg-white opacity-50 z-10">
      <span
        className="material-icons text-4xl"
        style={{ fontSize: "50px" }} // 크기 조정
      >
        <ClipLoader color="#007BFF" size={50} />
      </span>
      <p className="text-4xl">데이터 불러오는 중...</p>
    </div>
  );
};
export default LoadingTemplate;

export const LoadingOverlay = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
  z-index: 10;
`;
