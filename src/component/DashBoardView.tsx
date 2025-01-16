import React, { useEffect, useMemo, useState } from "react";
import { Table } from "@/ui";

import HeaderSection from "./HeaderSection";

import { getPersonsApi } from "@/util/api";
import useSearchStore from "@/store/useSearchStore";

import type { TPerson } from "@/model/person";
import { EXCEPTION_SEARCH_FILTER } from "@/util/constant";

const DashBoardView = () => {
  const [persons, setPersons] = useState<TPerson[]>([]);

  const { searchText } = useSearchStore();

  useEffect(() => {
    getPersonsApi({
      quantity: 100,
      gender: "",
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

  const filteredPersons = useMemo(() => {
    if (!searchText) return persons;

    return persons.filter((person) => {
      return Object.entries(person)
        .filter(([key]) => !EXCEPTION_SEARCH_FILTER.includes(key))
        .some(([, value]) =>
          String(value).toLowerCase().includes(searchText.toLowerCase())
        );
    });
  }, [persons, searchText]);

  return (
    <div className="pt-4">
      <HeaderSection />
      <Table data={filteredPersons} />
    </div>
  );
};

export default DashBoardView;
