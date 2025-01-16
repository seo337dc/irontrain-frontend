import React from "react";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import useSearchStore from "@/store/useSearchStore";

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
