import React, { Fragment, useMemo, useState } from "react";
import styled from "styled-components";
import { CaretIcon, CheckBox, Link, SortIcon, ToolTip } from "@/component/ui";

import type { TPerson } from "@/model/person";

type SortConfig = {
  key: keyof TPerson;
  direction: "asc" | "desc";
};

type TProps = {
  data: TPerson[];
};

const Table: React.FC<TProps> = ({ data }) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const handleRowSelection = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
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
              <div className="flex items-center gap-2">
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
              <div className="flex items-center gap-2">
                <span>이름</span>
                <SortIcon
                  type={
                    sortConfig?.key === "name" ? sortConfig.direction : "none"
                  }
                />
              </div>
            </ThElement>
            <ThElement>
              <div className="flex items-center gap-2">
                <span>이메일</span>
                <SortIcon
                  type={
                    sortConfig?.key === "email" ? sortConfig.direction : "none"
                  }
                />
              </div>
            </ThElement>
            <ThElement>성별</ThElement>
            <ThElement>
              <div className="flex items-center gap-2">
                <span>휴대폰</span>
                <SortIcon
                  type={
                    sortConfig?.key === "phone" ? sortConfig.direction : "none"
                  }
                />
              </div>
            </ThElement>
            <ThElement>웹사이트</ThElement>
          </TrElement>
        </TheadElement>
        <TbodyElement>
          {sortedData.map((person) => (
            <Fragment key={person.id}>
              <TrElement>
                <TdElement>
                  <CheckBox
                    checked={selectedRows.includes(person.id)}
                    onChange={() => handleRowSelection(person.id)}
                  />
                </TdElement>
                <TdElement>
                  <CaretIcon
                    type={selectedRows.includes(person.id) ? "down" : "right"}
                  />
                </TdElement>
                <TdElement>{person.birthday}</TdElement>
                <TdElement>
                  <ToolTip maxWidth="120px" content={person.name} />
                </TdElement>
                <TdElement>
                  <ToolTip content={person.email} />
                </TdElement>
                <TdElement>
                  {person.gender === "female" && "여성"}
                  {person.gender === "male" && "남성"}
                  {person.gender === "other" && "기타"}
                </TdElement>
                <TdElement>{person.phone}</TdElement>
                <TdElement>
                  <Link src={person.website} />
                </TdElement>
              </TrElement>
              {selectedRows.includes(person.id) && (
                <SubRow>
                  <td colSpan={8}>
                    <AddressInfo>
                      <p>
                        <strong>Address:</strong> {person.address.street},{" "}
                        {person.address.city}, {person.address.country} (
                        {person.address.zipcode})
                      </p>
                      <p>
                        <strong>Latitude:</strong> {person.address.latitude}
                      </p>
                      <p>
                        <strong>Longitude:</strong> {person.address.longitude}
                      </p>
                    </AddressInfo>
                  </td>
                </SubRow>
              )}
            </Fragment>
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
  position: relative;
  padding: 10px;
  border: 1px solid #ddd;
  max-width: 250px; /* 셀의 최대 너비를 설정 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; /* 한 줄로 표시 */
`;

const SubRow = styled.tr`
  background-color: #fafafa;
`;

const AddressInfo = styled.div`
  padding: 10px;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  background: #fefefe;
  border: 1px solid #ddd;
  border-radius: 4px;
`;
