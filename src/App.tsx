import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { TPerson } from "./model/person";
import { getPersonsApi } from "./util/api";

const App: React.FC = () => {
  const [perons, setPersons] = useState<TPerson[]>([]);

  useEffect(() => {
    getPersonsApi({
      quantity: 10,
      gender: "female",
      startDate: "2005-01-01",
    }).then((data) => setPersons(data));
  }, []);

  console.log("perons", perons);

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
