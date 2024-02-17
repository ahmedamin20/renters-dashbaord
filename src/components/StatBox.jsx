import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useSidebarContext } from "../pages/global/sidebar/sidebarContext";

const StatBox = ({ title, subtitle, progress, increase, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { sidebarRTL } = useSidebarContext();

  return (
    <Box width="100%" m="0 30px" p="12px 0">
      <Box display="flex" flexDirection={sidebarRTL ? "row-reverse" : "row"} justifyContent="space-between" alignItems="center">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
        <Box flex={1} textAlign={sidebarRTL ? "start" : "end"}>
          <Typography variant="h5" sx={{ color: colors.greenAccent[300] }}>
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StatBox;
