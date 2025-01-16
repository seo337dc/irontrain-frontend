import React from "react";
import FilterDate from "./filter/FilterDate";
import FilterGender from "./filter/FilterGender";
import FilterSearch from "./filter/FilterSearch";

const HeaderFilter = () => {
  return (
    <header className="w-full flex gap-10">
      <FilterSearch />
      <FilterDate />
      <FilterGender />
    </header>
  );
};

export default HeaderFilter;
