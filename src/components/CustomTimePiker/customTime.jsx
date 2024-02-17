import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import CustomLable from "../CustomLable";
import { Box } from "@mui/material";

const CustomTime = ({ onChange, name, defaultData, title, disabled }) => {
  console.log("time", defaultData);
  return (
    <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
      <DemoContainer fullWidth components={["MobileTimePicker"]}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <CustomLable title={title} />
          <MobileTimePicker
            disabled={disabled}
            fullWidth
            sx={{ width: "100%" }}
            onChange={onChange}
            name={name}
            format="HH:mm"
            defaultValue={`2022-04-17T${dayjs(defaultData)}`}
            // defaultValue={defaultData && dayjs(`${defaultData}`)}
          />
        </Box>
        {/* </DemoItem> */}
      </DemoContainer>
    </LocalizationProvider>
  );
};
export default CustomTime;
