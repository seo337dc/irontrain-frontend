import React from "react";
import { styled } from "styled-components";

type TProps = {
  src: string;
};
const Link: React.FC<TProps> = ({ src }) => {
  return (
    <StyledLink href={src} target="_blank" rel="noopener noreferrer">
      {src}
    </StyledLink>
  );
};

export default Link;

const StyledLink = styled.a`
  color: #007bff; /* 파란색 */
  text-decoration: underline; /* 밑줄 */

  &:hover {
    color: #0056b3; /* 더 진한 파란색 */
  }
`;
