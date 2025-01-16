import React, { useEffect, useMemo, useState } from "react";
import { Table } from "@/ui";

import HeaderFilter from "./HeaderFilter";

import { getPersonsApi } from "@/util/api";
import useSearchStore from "@/store/useSearchStore";
import useGenderStore from "@/store/useGenderStore";
import useDateStore from "@/store/useDateStore";

import type { TPerson } from "@/model/person";
import { EXCEPTION_SEARCH_FILTER } from "@/util/constant";

// TODO : 그 방법을 사용해서 입력 이벤트가 끝난 후 api 동작되도록 세팅 필요

const DashBoardView = () => {
  const [persons, setPersons] = useState<TPerson[]>([]);

  const { searchText } = useSearchStore();
  const { gender } = useGenderStore();
  const { selectedDate } = useDateStore();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPersonsApi({
        quantity: 100,
        gender,
        startDate: selectedDate
          ? selectedDate.toISOString().split("T")[0]
          : "2005-01-01",
      });

      const resultPersons: TPerson[] = response.map((person) => ({
        ...person,
        isSelect: false,
        name: `${person.firstname} ${person.lastname}`,
      }));
      setPersons(resultPersons);
    };

    fetchData();
  }, [gender, selectedDate]);

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
      <HeaderFilter />
      <Table data={filteredPersons} />
    </div>
  );
};

export default DashBoardView;
