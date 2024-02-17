import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { useSidebarContext } from "../../pages/global/sidebar/sidebarContext";
import { Map } from "@mui/icons-material";
const CustomAccordion = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  return (
    <div dir={sidebarRTL ? "rtl" : "ltr"}>
      <Accordion sx={{ background: "transparent", boxShadow: "none" }}>
        <AccordionSummary
          startIcon={<Map />}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
            {props.title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails dir={sidebarRTL ? "rtl" : "ltr"}>
          {props.options.length > 0 &&
            props.options.map((item, index) => (
              <Typography
                key={index}
                sx={{
                  margin: ".5rem auto",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                {item}
              </Typography>
            ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default CustomAccordion;
