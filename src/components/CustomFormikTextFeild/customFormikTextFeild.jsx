import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../pages/global/sidebar/sidebarContext";

export const CustomFormikTextFeild = (props) => {
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  return (
    <TextField
      fullWidth={props.fullWidth || true}
      disabled={props.disabled || false}
      // label={props.label}
      variant="outlined"
      multiline={props.isMulti || false}
      type="text"
      rows={props.rows}
      placeholder={t(props.placeholder)}
      onBlur={props.onBlur}
      onChange={props.onChange}
      value={props.value}
      name={props.name}
      error={props.error}
      helperText={props.helperText}
      dir={sidebarRTL ? "rtl" : "ltr"}
      sx={{ gridColumn: "span 4" }}
      inputProps={{
        style: { fontSize: "18px", fontWeight: "bold" },
      }}
    />
  );
};
