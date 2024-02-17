import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

const CustomDateTime = ({ onChange,name, defaultData }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker"]}>
        <DemoItem>
          {defaultData ? (
            <DateTimePicker
            name={name}
              defaultValue={dayjs(defaultData)}
              value={dayjs(defaultData)}
              format="YYY/MM/DD HH:mm" // Use uppercase 'HH' for 24-hour time format
              inputFormat="YYY/MM/DD HH:mm" // Use uppercase 'HH' for 24-hour time format
              views={["year", "month", "day", "hours", "minutes"]} // Include hours and minutes
              onChange={onChange}
              ampm={false}
            />
          ) : (
            <DateTimePicker
            name={name}

              format="DD/MM/YYYY HH:mm" // Use uppercase 'HH' for 24-hour time format
              inputFormat="DD/MM/YYYY HH:mm" // Use uppercase 'HH' for 24-hour time format
              views={["day", "month", "year", "hours", "minutes"]} // Include hours and minutes
              onChange={onChange}
              ampm={false}
            />
          )}
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default CustomDateTime;
