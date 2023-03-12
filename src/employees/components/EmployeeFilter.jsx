import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Button,
} from "@mui/material";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

const months = [
  { value: 0, label: "January" },
  { value: 1, label: "February" },
  { value: 2, label: "March" },
  { value: 3, label: "April" },
  { value: 4, label: "May" },
  { value: 5, label: "June" },
  { value: 6, label: "July" },
  { value: 7, label: "August" },
  { value: 8, label: "September" },
  { value: 9, label: "October" },
  { value: 10, label: "November" },
  { value: 11, label: "December" },
];

const years = [];
for (let year = currentYear; year >= currentYear - 10; year--) {
  years.push({ value: year, label: year });
}

const EmployeeFilter = ({
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  setShowTopWorkers,
  showTopWorkers,
}) => {
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleShowDropdown = () => {
    setShowTopWorkers(true);
  };

  const handleHideDropdown = () => {
    setShowTopWorkers(false);
  };

  const selectableMonths =
    selectedYear === currentYear ? months.slice(0, currentMonth + 1) : months;

  return (
    <Stack direction="row" spacing={2}>
      {showTopWorkers && (
        <>
          <FormControl>
            <InputLabel id="month-label">Month</InputLabel>
            <Select
              size="small"
              label="Month"
              labelId="month-label"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              {selectableMonths.map((month) => (
                <MenuItem key={month.value} value={month.value}>
                  {month.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="year-label">Year</InputLabel>
            <Select
              size="small"
              label="Year"
              labelId="year-label"
              value={selectedYear}
              onChange={handleYearChange}
            >
              {years.map((year) => (
                <MenuItem key={year.value} value={year.value}>
                  {year.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
      {showTopWorkers && <Button onClick={handleHideDropdown}>Hide</Button>}
      {!showTopWorkers && (
        <Button onClick={handleShowDropdown}>Show Top Workers</Button>
      )}
    </Stack>
  );
};
export default EmployeeFilter;
