import { Button, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { tokens } from "../theme";
const DefaultButton = ({
  fullWidth,
  type,
  handleClick,
  icon,
  text,
  disabled,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Button
      variant="outlined"
      fullWidth={fullWidth || false}
      onClick={handleClick}
      endIcon={icon}
      type={type || "button"}
      disabled={disabled}
      sx={{
        backgroundColor: colors.blueAccent[700],
        color: colors.grey[100],
        fontSize: "14px",
        fontWeight: "bold",
        marginTop: "25px",
        padding: "10px 20px",
      }}
    >
      {disabled ? t("loading") : t(text)}
    </Button>
  );
};

export default DefaultButton;
