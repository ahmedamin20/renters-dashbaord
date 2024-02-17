import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useMainHooks from "./../../../hooks/useMainHooks";

const TestimonialsInfoPage = () => {
  const { t, sidebarRTL } = useMainHooks();

  let data =
    useSelector((state) => state.testimonials.getTestimonialsData.data) || [];
  const { id } = useParams();
  data = data.find((item) => item.id == id);
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
        {t("content")}: {data?.content}
      </Typography>

      <Typography variant="h3">
        {t("user_id")}: {data?.user_id?.name}
      </Typography>
      <Typography variant="h3">
        {t("image")}: 
      </Typography>
      <div style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        gap:'10px',
      }}>

      <img src={data?.image} alt="image" width="500px" height="400px" />
      </div>
    </Box>
  );
};

export default TestimonialsInfoPage;
