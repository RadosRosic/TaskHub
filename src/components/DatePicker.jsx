import { useState } from "react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const DatePicker = ({ name, disablePast, disableFuture, label }) => {
  const [value, setValue] = useState(null);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DesktopDatePicker
          label={label}
          disablePast={disablePast}
          disableFuture={disableFuture}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </LocalizationProvider>
      <input
        type="text"
        defaultValue={value?._d}
        name={name}
        style={{ display: "none" }}
      />
    </>
  );
};

export default DatePicker;
