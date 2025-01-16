import React from "react";

import useSearchStore from "@/store/useSearchStore";
import { Button, Input } from "@/component/ui";

const FilterSearch = () => {
  const { searchText, setSearchText, clear } = useSearchStore();

  return (
    <section className="flex items-center gap-2">
      <Input
        width="350px"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="성별, 날짜를 제외한 검색어를 입력해주세요."
      />
      <Button label="초기화" onClick={clear} />
    </section>
  );
};

export default FilterSearch;
