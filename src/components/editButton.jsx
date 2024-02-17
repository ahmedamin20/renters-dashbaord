import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const EditButton = ({ disabled, fullWidth, backGround, onClick, text }) => {
  const { t } = useTranslation();
  return (
    <Button
      disabled={disabled}
      fullWidth={fullWidth || false}
      variant="contained"
      sx={{ background: `${backGround || 'green'}`, margin: 2 }}
      onClick={onClick}
    >
      {t(text)}
    </Button>
  );
};

export default EditButton;
