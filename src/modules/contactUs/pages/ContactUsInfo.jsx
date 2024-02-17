import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useMainHooks from './../../../hooks/useMainHooks';

const ContactUsInfo = () => {
  const { t, sidebarRTL } = useMainHooks();
  const contact = useSelector((state) => state.contactUs.contactUs.data) || [];
  const { id } = useParams();
  const data = contact.find((item) => item.id == id);
  console.log(data);
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="10px"
      sx={{
        background: "#9d9393",
        padding: "30px",
        borderRadius: "10px",
      }}
      dir={sidebarRTL ? "rtl" : "ltr"}
      m={"40px"}
    >
      <Typography variant="h3">
        {t("ID")}: {data?.id}
      </Typography>

      <Typography variant="h3">
        {t("Name")}: {data?.name}
      </Typography>
      <Typography variant="h3">
        {t("email")}: {data?.email}
      </Typography>
      <Typography variant="h3">
        {t("phone")}: {data?.phone}
      </Typography>
      <Typography variant="h3">
        {t("message")}: {data?.message}
      </Typography>
    </Box>
  );
};

export default ContactUsInfo;
