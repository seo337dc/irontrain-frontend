import React from "react";

import useSearchStore from "@/store/useSearchStore";
import { Button, Input } from "@/ui";

const HeaderSection = () => {
  const { searchText, setSearchText, clear } = useSearchStore();

  return (
    <section className="w-full flex items-center gap-4">
      <Input
        width="350px"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="검색어를 입력해주세요."
      />

      <Button label="초기화" onClick={clear} />
    </section>
  );
};

export default HeaderSection;
