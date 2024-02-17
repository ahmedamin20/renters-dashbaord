import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useTranslation } from "react-i18next";

export const SubmitButton = (props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box display="flex" justifyContent="end" mt="20px">
      <Button
        type="submit"
        fullWidth={props.fullWidth || false}
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
        }}
        disabled={props.loading}
        variant="outlined"
      >
        {props.loading ? t("wait") : t(props.text)}
      </Button>
    </Box>
  );
};
