import React from "react";
import ReactDatePicker from "react-datepicker";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  dateFormat?: string;
  minDate?: Date;
  maxDate?: Date;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onChange,
  placeholder = "날짜를 선택하세요",
  dateFormat = "yyyy-MM-dd",
  minDate,
  maxDate,
}) => {
  return (
    <Wrap>
      <ReactDatePicker
        selected={selectedDate}
        onChange={onChange}
        placeholderText={placeholder}
        dateFormat={dateFormat}
        minDate={minDate}
        maxDate={maxDate}
      />
    </Wrap>
  );
};

export default DatePicker;

const Wrap = styled.div`
  .react-datepicker__input-container input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s ease;

    &:focus {
      border-color: #007bff;
    }
  }

  .react-datepicker {
    font-size: 14px;
  }
`;
