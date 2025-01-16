import React from "react";
import { DatePicker } from "@/ui";
import useDateStore from "@/store/useDateStore";

const FilterDate = () => {
  const { selectedDate, setSelectedDate } = useDateStore();

  return (
    <div className="flex items-center gap-2">
      <h3 className="text-sm font-semibold">날짜</h3>
      <DatePicker
        selectedDate={selectedDate}
        onChange={setSelectedDate}
        placeholder="날짜를 선택하세요"
        dateFormat="yyyy-MM-dd"
      />
    </div>
  );
};

export default FilterDate;
