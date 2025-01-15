import React, { Fragment } from "react";
import styled from "styled-components";

const App: React.FC = () => {
  return (
    <div className="w-screen h-screen px-12">
      <Text>AAAA</Text>
    </div>
  );
};

export default App;

const Text = styled.h1`
  font-size: 18px;
  font-weight: 700;
`;
