import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Table } from "./ui";

import { getPersonsApi } from "./util/api";

import type { TPerson } from "./model/person";

const App: React.FC = () => {
  const [perons, setPersons] = useState<TPerson[]>([]);

  useEffect(() => {
    getPersonsApi({
      quantity: 100,
      gender: "female",
      startDate: "2005-01-01",
    }).then((personsData) => {
      const resultPersons: TPerson[] = personsData.map((person) => {
        return {
          ...person,
          isSelect: false,
          name: `${person.firstname} ${person.lastname}`,
        };
      });
      setPersons(resultPersons);
    });
  }, []);

  return (
    <div className="w-screen h-screen px-12">
      <header className="w-full"></header>
      <Table data={perons} />
    </div>
  );
};

export default App;
