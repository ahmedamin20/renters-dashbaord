import { Box } from "@mui/material";
import React from "react";
import StatBox from "../StatBox";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const MessageChart = ({ title, icon, count }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      width="100%"
      backgroundColor={colors.primary[400]}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <StatBox title={title} subtitle={count} icon={icon} />
    </Box>
  );
};

export default MessageChart;
