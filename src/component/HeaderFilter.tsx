import React from "react";
import FilterGender from "./filter/FilterGender";
import FilterSearch from "./filter/FilterSearch";

const HeaderFilter = () => {
  return (
    <header className="w-full flex justify-around gap-4">
      <FilterSearch />
      <FilterGender />
    </header>
  );
};

export default HeaderFilter;