import React from "react";
import { styled } from "styled-components";
import { CaretIcon, CheckBox, SortIcon } from "@/ui";

import type { TPerson } from "@/model/person";

type TProps = {
  data: TPerson[];
};
const Table = ({ data }: TProps) => {
  return (
    <Wrapper>
      <TableElement>
        <TheadElement>
          <TrElement>
            <ThElement>
              <CheckBox checked={true} type="all" />
            </ThElement>
            <ThElement>조회</ThElement>
            <ThElement className="flex items-center gap-2">
              <span>구분</span>
              <SortIcon />
            </ThElement>
            <ThElement>이름</ThElement>
            <ThElement>아이디</ThElement>
          </TrElement>
        </TheadElement>

        <TbodyElement>
          {data.map((person) => (
            <TrElement>
              <TdElement>
                <CheckBox checked={true} />
              </TdElement>
              <TdElement>
                <CaretIcon className="cursor-pointer" />
              </TdElement>
              <TdElement>{person.gender}</TdElement>
              <TdElement>
                {person.firstname}
                {person.lastname}
              </TdElement>
              <TdElement>{person.email}</TdElement>
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
