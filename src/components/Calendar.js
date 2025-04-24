import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

function Calendar({ onDateRangeChange }) {
  const [startDate, setStartDate] = useState(new Date("2017-09-01"));
  const [endDate, setEndDate] = useState(new Date("2019-08-31"));

  const minSelectableDate = new Date("2017-09-01");
  const maxSelectableDate = new Date("2019-08-31");

  useEffect(() => {
    if (startDate && endDate && onDateRangeChange) {
      onDateRangeChange({ startDate, endDate });
    }
  }, [startDate, endDate, onDateRangeChange]);

  return (
    <div>
      <h5>Data Filtering</h5>
      <div>
        <DatePicker
          showIcon
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          startDate={startDate}
          endDate={endDate}
          minDate={minSelectableDate}
          maxDate={maxSelectableDate}
          dateFormat="dd/MM/yyyy"
        />
        <span>to</span>
        <DatePicker
          showIcon
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={maxSelectableDate}
          dateFormat="dd/MM/yyyy"
        />
      </div>
    </div>
  );
}

export default Calendar;