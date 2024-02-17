import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import CustomLable from "../CustomLable";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../pages/global/sidebar/sidebarContext";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CustomPassword = ({
  helperText,
  req,
  error,
  onChange,
  onBlur,
  value,
  name,
  disabled,
}) => {
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  return (
    <Box>
      <FormControl
        dir={sidebarRTL ? "rtl" : "ltr"}
        required={req}
        fullWidth
        variant="outlined"
      >
        <CustomLable title={t(name)} />
        <OutlinedInput
        disabled={disabled}
          helperText={helperText}
          sx={{ fontSize: "18px", fontWeight: "bold" }}
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          value={value}
        />
      </FormControl>
    </Box>
  );
};
export default CustomPassword;
