import React, { useMemo, useState } from "react";

import { styled } from "styled-components";
import { CaretIcon, CheckBox, Link, SortIcon } from "@/ui";

import type { TPerson } from "@/model/person";

// TODO : 테이블 모듈화 시 확장성 고려
type SortConfig = {
  key: keyof TPerson;
  direction: "asc" | "desc";
};

type TProps = {
  data: TPerson[];
};

const Table: React.FC<TProps> = ({ data }) => {
  console.log("data", data);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const handleRowSelection = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      // 모두 선택 해제
      setSelectedRows([]);
    } else {
      // 모두 선택
      setSelectedRows(data.map((person) => person.id));
    }
  };

  const handleSort = (keyParam: keyof TPerson) => {
    setSortConfig((prev) => {
      if (prev?.key === keyParam) {
        return {
          key: keyParam,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key: keyParam, direction: "asc" };
    });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  return (
    <Wrapper>
      <TableElement>
        <TheadElement>
          <TrElement>
            <ThElement>
              <CheckBox
                onChange={handleSelectAll}
                type="all"
                checked={
                  selectedRows.length > 0 && selectedRows.length === data.length
                }
              />
            </ThElement>
            <ThElement>조회</ThElement>
            <ThElement onClick={() => handleSort("birthday")}>
              <div className="flex items-center gap-1">
                <span>날짜</span>
                <SortIcon
                  type={
                    sortConfig?.key === "birthday"
                      ? sortConfig.direction
                      : "none"
                  }
                />
              </div>
            </ThElement>
            <ThElement onClick={() => handleSort("name")}>
              <div className="flex items-center gap-1">
                <span>이름</span>
                <SortIcon
                  type={
                    sortConfig?.key === "name" ? sortConfig.direction : "none"
                  }
                />
              </div>
            </ThElement>

            <ThElement onClick={() => handleSort("email")}>
              <div className="flex items-center gap-1">
                <span>이메일</span>
                <SortIcon
                  type={
                    sortConfig?.key === "email" ? sortConfig.direction : "none"
                  }
                />
              </div>
            </ThElement>
            <ThElement>성별</ThElement>
            <ThElement>휴대폰</ThElement>
            <ThElement>웹사이트</ThElement>
          </TrElement>
        </TheadElement>

        <TbodyElement>
          {sortedData.map((person) => (
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
