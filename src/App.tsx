import React, { Fragment, useEffect } from "react";
import styled from "styled-components";
import { fetchData } from "./util/api";

const App: React.FC = () => {
  useEffect(() => {
    fetchData({ quantity: 10, gender: "female", startDate: "2005-01-01" });
  }, []);

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
