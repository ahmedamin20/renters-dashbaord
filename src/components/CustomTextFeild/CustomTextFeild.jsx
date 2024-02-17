import { TextField } from "@mui/material";
import React from "react";
import { useSidebarContext } from "../../pages/global/sidebar/sidebarContext";

const CustomTextFeild = ({
  value,
  isDisabled,
  defaultValue,
  placeholder,
  onChange,
  autoFocus,
  fullWidth,
}) => {
  const { sidebarRTL } = useSidebarContext();
  return (
    <TextField
      autoFocus={autoFocus || false}
      disabled={isDisabled || false}
      margin="dense"
      placeholder={placeholder}
      type="text"
      fullWidth={fullWidth || false}
      defaultValue={defaultValue}
      variant="outlined"
      value={value}
      dir={sidebarRTL ? "rtl" : "ltr"}
      onChange={onChange}
      inputProps={{
        style: { fontSize: "18px", fontWeight: "bold" }, // Adjust the font size here
      }}
    />
  );
};
export default CustomTextFeild;
