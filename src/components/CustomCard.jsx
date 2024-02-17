
import { Box, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../pages/global/sidebar/sidebarContext";

const CustomCard = ({ name, value }) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { t } = useTranslation();
    const { sidebarRTL } = useSidebarContext();
    return (
      <Box
        dir={sidebarRTL ? "rtl" : "ltr"}
        sx={{
          width: isNonMobile ? "30%" : "75%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          padding: "2rem",
          background: "#ffa5004a",
          margin: ".5rem",
          borderTopRightRadius: "3.5rem",
          borderBottomLeftRadius: "3.5rem",
        }}
      >
        <h4 style={{ fontWeight: "bold", fontSize: "20px" }}>{t(name)}</h4>
        <h3 >{' ==>'} </h3>
        <h6 style={{ fontWeight: "bold", fontSize: "20px" }}>{value}</h6>
      </Box>
    );
  };

  export default CustomCard;