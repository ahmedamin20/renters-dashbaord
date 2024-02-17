import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CustomLable from "./../CustomLable";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { useSidebarContext } from "../../pages/global/sidebar/sidebarContext";

const CustomDate = ({ title, onChange, value }) => {
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  const [defaultValue, setValue] = React.useState("");
  React.useEffect(() => {
    if(value){
      
      setValue(value?.replaceAll("-",'/'))
    }
  },[])
  return (
    <Box
      display="flex"
      dir={sidebarRTL ? "rtl" : "ltr"}
      fullWidth
      justifyContent="center"
      alignItems="center"
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* <DemoContainer components={['DatePicker']}> */}
        <Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
          <CustomLable title={t(title)} />
          
            <DatePicker
              format="YYYY/MM/DD"
              onChange={onChange}
              value={value ? dayjs(defaultValue) : null}
            />
          
          
        </Box>
        {/* </DemoContainer> */}
      </LocalizationProvider>
    </Box>
  );
};
export default CustomDate;
