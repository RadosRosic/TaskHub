import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const DatePicker = ({
  name,
  disablePast,
  disableFuture,
  label,
  value,
  setDate,
}) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DesktopDatePicker
          label={label}
          disablePast={disablePast}
          disableFuture={disableFuture}
          value={value}
          onChange={(newDate) => setDate(newDate)}
        />
      </LocalizationProvider>
      <input
        type="text"
        value={value?._d}
        name={name}
        style={{ display: "none" }}
      />
    </>
  );
};

export default DatePicker;
