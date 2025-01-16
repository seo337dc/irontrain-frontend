import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

type TooltipProps = {
  content: string;
  maxWidth?: string;
};

const Tooltip: React.FC<TooltipProps> = ({ content, maxWidth = "180px" }) => {
  const [isTruncated, setIsTruncated] = useState(false); // 텍스트 잘림 여부
  const [visible, setVisible] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      const element = contentRef.current;

      // 텍스트가 잘리는지 여부를 판단
      setIsTruncated(element.scrollWidth > element.clientWidth);
    }
  }, [content]);

  return (
    <div
      className="inline-block"
      onMouseEnter={() => isTruncated && setVisible(true)}
      onMouseLeave={() => isTruncated && setVisible(false)}
    >
      <EllipsisText ref={contentRef} maxWidth={maxWidth}>
        {content}
      </EllipsisText>

      {/* 텍스트가 잘렸을 때 + 마우스 올렸을 때 툴팁 표시 */}
      {isTruncated && visible && <TooltipBox>{content}</TooltipBox>}
    </div>
  );
};

export default Tooltip;

const EllipsisText = styled.div<{ maxWidth: string }>`
  max-width: ${({ maxWidth }) => maxWidth};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TooltipBox = styled.div`
  position: absolute;
  top: 25%;
  left: 0%;

  max-width: 300px;
  padding: 8px;

  background-color: #333;
  color: #fff;
  border-radius: 4px;
  white-space: nowrap;
  font-size: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  text-align: center;

  z-index: 10;
`;
