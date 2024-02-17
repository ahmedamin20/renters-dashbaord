import { Button, DialogActions, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useTranslation } from "react-i18next";

const CustomDialogActions = ({
  icon,
  disabled,
  onClickAction,
  onClick,
  text,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  return (
    <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
      <Button
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
        }}
        onClick={onClick}
      >
        {t("Cancel")}
      </Button>
      <Button
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 15px",
        }}
        type="submit"
        disabled={disabled}
        endIcon={icon}
        onClick={onClickAction}
      >
        {disabled? t('loading') :t(text)}
      </Button>
    </DialogActions>
  );
};
export default CustomDialogActions;
