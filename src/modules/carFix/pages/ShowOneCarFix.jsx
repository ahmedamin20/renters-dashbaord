import { Box, Button, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneCarFix } from "../redux/carFix.js";
import CustomLoader from "../../../components/CustomLoader/CustomLoader.jsx";
import CustomLable from "../../../components/CustomLable.jsx";
import SmallBox from "./smallBox.jsx";
import "./showOneStyle.css";
import ScrollDialog from "../../../components/info_component/info.jsx";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox.jsx";
import CustomToolTip from "../../../components/CustomToolTip/customToolTip.jsx";
import { tokens } from "../../../theme.js";
import Header from "../../../components/Header.jsx";
const ShowCarFix = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { sidebarRTL } = useSidebarContext();
  const loading = useSelector((state) => state.CarFix.loading);
  const data = useSelector((state) => state.CarFix.oneFixData.data) || [];
  console.log(data)
  useEffect(() => {
    if (id) {
      dispatch(getOneCarFix({ id }));
    }
  }, [dispatch, id]);
  

  

  
  return !loading ? (
    <Box dir={sidebarRTL ? "rtl" : "ltr"} m="20px">
      {/*<Header title={`${t("fix")}` + " : " + id + " " + `${t("show")}`} />*/}
      <br />
      <Box
        dir={sidebarRTL ? "rtl" : "ltr"}
        m="20px"
        display="flex"
        justifyContent="space-evenly"
        flexWrap="wrap"
      >
        <Box className="dataCard">
          <h3>{t("owner_data")}</h3>
          <SmallBox title={"name"} data={data?.to_user?.name} />
          <SmallBox
            title={"Email"}
            data={data?.to_user?.email}
          />
          <SmallBox title={"Address"} data={data?.to_user?.address} />
          <div style={{display:"flex", flexDirection:"column", gap:"20px", fontWeight:"bold"}}>
          <span>ID: {data?.to_user?.front_national_id?.ID_F}</span>
<span>Address: {data?.to_user?.front_national_id?.Address}</span>
<span>Gender: {data?.to_user?.back_national_id?.Gender}</span>
<span>BD: {data?.to_user?.back_national_id?.ID_B}</span>
<span>Status: {data?.to_user?.back_national_id?.Status}</span>
        </div>
        </Box>
        <Box className="dataCard">
          <h3>{t("Renter Data")}</h3>
          <SmallBox title={"name"} data={data?.from_user?.name} />
          <SmallBox
            title={"Email"}
            data={data?.from_user?.email}
          />
          <SmallBox title={"Address"} data={data?.from_user?.address} />
          <div style={{display:"flex", flexDirection:"column", gap:"20px", fontWeight:"bold"}}>
          <span>ID: {data?.from_user?.front_national_id?.ID_F}</span>
<span>Address: {data?.from_user?.front_national_id?.Address}</span>
<span>Gender: {data?.from_user?.back_national_id?.Gender}</span>
<span>BD: {data?.from_user?.back_national_id?.ID_B}</span>
<span>Status: {data?.from_user?.back_national_id?.Status}</span>
        </div>
        </Box>
      </Box>
      <Box className="dataCard" sx={{ width: "100%" }}>
        <h3>{t("Details")}</h3>
        
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          
              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  justifyContent: "center",
                  margin: "1rem auto",
                }}
              >
                <img
                  loading="lazy"
                  style={{
                    margin: ".5rem auto",
                    width: "400px",
                    height: "400px",
                    borderRadius: "8px",
                  }}
                  src={data?.product.main_image}
                  alt="img"
                />
              </Box>
            
        </Box>
        <ScrollDialog message={data?.product?.description}/>
        
        <CustomLable
          margin="1rem"
          title="Name"
          body={`${data?.product?.name}`}
        />
        <CustomLable
          margin="1rem"
          title="price"
          body={`${data?.price} EGP`}
        />
        <CustomLable
          margin="1rem"
          title="Health"
          body={`${data?.product?.health} %`}
        />
        <CustomLable
          margin="1rem"
          title="category"
          body={`${data?.product?.category?.name}`}
        />
      </Box>
      {data?.latest_visit_id ? (
        <Button
          fullWidth
          onClick={handleLastVisit}
          sx={{
            background: colors.greenAccent[500],
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          {t("go to last visit")}
        </Button>
      ) : null}
    </Box>
  ) : (
    <CustomLoader />
  );
};
export default ShowCarFix;
