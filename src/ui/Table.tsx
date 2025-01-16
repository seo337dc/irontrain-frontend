import React, { useState } from "react";

import { styled } from "styled-components";
import { CaretIcon, CheckBox, Link, SortIcon } from "@/ui";

import type { TPerson } from "@/model/person";

type TProps = {
  data: TPerson[];
};

const Table: React.FC<TProps> = ({ data }) => {
  console.log("data", data);
  const [selectedRows, setSelectedRows] = useState<number[]>([]); // 선택된 행 ID를 관리

  const handleRowSelection = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]); // 모두 선택 해제
    } else {
      setSelectedRows(data.map((person) => person.id)); // 모두 선택
    }
  };

  return (
    <Wrapper>
      <TableElement>
        <TheadElement>
          <TrElement>
            <ThElement>
              <CheckBox
                checked={
                  selectedRows.length > 0 && selectedRows.length === data.length
                }
                onChange={handleSelectAll}
                type="all"
              />
            </ThElement>
            <ThElement>조회</ThElement>
            <ThElement className="flex items-center gap-2">
              <span>날짜</span>
              <SortIcon />
            </ThElement>
            <ThElement>이름</ThElement>
            <ThElement>이메일</ThElement>
            <ThElement>성별</ThElement>
            <ThElement>휴대폰</ThElement>
            <ThElement>웹사이트</ThElement>
          </TrElement>
        </TheadElement>

        <TbodyElement>
          {data.map((person) => (
            <TrElement key={person.email}>
              <TdElement>
                <CheckBox
                  checked={selectedRows.includes(person.id)} // 행 선택 상태
                  onChange={() => handleRowSelection(person.id)} // 체크박스 토글
                />
              </TdElement>
              <TdElement>
                <CaretIcon className="cursor-pointer" />
              </TdElement>
              <TdElement>{person.birthday}</TdElement>
              <TdElement>
                {person.firstname} {person.lastname}
              </TdElement>
              <TdElement>{person.email}</TdElement>
              <TdElement>{person.gender}</TdElement>
              <TdElement>{person.phone}</TdElement>
              <TdElement>
                <Link src={person.website} />
              </TdElement>
            </TrElement>
          ))}
        </TbodyElement>
      </TableElement>
    </Wrapper>
  );
};

export default Table;

const Wrapper = styled.div`
  margin: 20px auto;
  width: 100%;
`;

const TableElement = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const TheadElement = styled.thead`
  background-color: #f4f4f4;
`;

const ThElement = styled.th`
  padding: 10px;
  border: 1px solid #ddd;
`;

const TbodyElement = styled.tbody``;

const TrElement = styled.tr`
  &:nth-child(odd) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

const TdElement = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;
