import React from "react";

import HeaderSearch from "./HeaderSearch";
import HeaderGender from "./HeaderGender";

const HeaderSection = () => {
  return (
    <header className="w-full flex justify-around gap-4">
      <HeaderSearch />
      <HeaderGender />
    </header>
  );
};

export default HeaderSection;
