import * as yup from "yup";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import { CustomFormikTextFeild } from "../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import { visitorsSchema } from "../../../utils/ValidationSchema.js";
import { StatuseCode } from "../../../statuseCodes.js";
import CustomSelect from "../../../components/CustomSelect/CustomSelect.jsx";
import { useNavigate, useParams } from "react-router-dom";
import CustomLable from "../../../components/CustomLable.jsx";
import { SubmitButton } from "../../../components/SubmitButton.jsx";
import CustomPassword from "../../../components/PasswordAndConfirmPassword/PassAndConfPass.jsx";
import { OneVisitor, editVisitor, getVisitors } from "../redux/Visitors.js";
import { VisitorsTypes } from "./visitorsTypesArray.js";

const EditVisitors = () => {
  const { id } = useParams();
  // console.log(id)
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { sidebarRTL } = useSidebarContext();
  const [loading, setLoading] = useState(false);
  const OneVisitorData =
    useSelector((state) => state.visitors.OneVisitorData.data) || [];

  useEffect(() => {
    dispatch(OneVisitor(id));
  }, [dispatch, id]);

  const formik = useFormik({
    initialValues: {
      name: OneVisitorData?.name,
      email: OneVisitorData?.email,
      phone: OneVisitorData?.phone,
      address: OneVisitorData?.address,
      front_national: OneVisitorData?.front_national,
      back_national: OneVisitorData?.back_national,
      front_national_id: OneVisitorData?.front_national_id,
      back_national_id: OneVisitorData?.back_national_id,

    },
    enableReinitialize: true,
    
    
  });
  console.log(OneVisitorData,"OneVisitorData");
  

  const textFields = [
    {
      name: "name",
      value: formik.values.name,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("name"),
      error: !!formik.touched.name && !!formik.errors.name,
      helperText: formik.touched.name && formik.errors.name,
    },
    {
      name: "email",
      value: formik.values.email,
      handleChange: formik.handleChange,
      placeholder: t("email"),
      onBlur: formik.handleBlur,
      error: !!formik.touched.email && !!formik.errors.email,
      helperText: formik.touched.email && formik.errors.email,
    },
    {
      name: "phone",
      value: formik.values.phone,
      placeholder: t("phone"),
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error: !!formik.touched.phone && !!formik.errors.phone,
      helperText: formik.touched.phone && formik.errors.phone,
    },
    {
      name: "address",
      value: formik.values.address,
      placeholder: t("Input Address"),
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error: !!formik.touched.address && !!formik.errors.address,
      helperText: formik.touched.address && formik.errors.address,
    },
    
  ];
 
  return (
    <Box height={"100%"} overflow={"hidden"} m="20px">
      <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
        {textFields.map((item, index) => (
          <Box
            key={index}
            dir={sidebarRTL ? "rtl" : "ltr"}
            display="grid"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <CustomLable title={item.placeholder} />
            <CustomFormikTextFeild
              placeholder={t(item.placeholder)}
              onBlur={item.onBlur}
              onChange={item.handleChange}
              value={item.value}
              name={item.name}
              error={item.error}
              helperText={item.helperText}
            />
          </Box>
        ))}
        <div style={{display:"flex", flexDirection:"column" ,width:"100%"}}>
        <span style={{fontSize:"20px", fontWeight:"bold", margin:"1rem"}}>Front National ID </span>
        <img style={{width:"50%",margin:"1rem auto",borderRadius:"8px", objectFit:"cover", height:"300px"}} src={formik.values.front_national} alt="front"/>
        </div>
        <div style={{display:"flex", flexDirection:"column" ,width:"100%", height:"150px"}}>
        <span style={{fontSize:"20px", fontWeight:"bold", margin:"1rem"}}>Back National ID </span>
        <img style={{width:"50%",margin:"1rem auto",borderRadius:"8px", objectFit:"cover", height:"300px"}} src={formik.values.back_national} alt="back"/>
        </div>
        
      </form>
      <div style={{display:"flex", flexDirection:"column", gap:"20px", fontWeight:"bold"}}>
          <span>ID: {OneVisitorData?.front_national_id?.ID_F}</span>
<span>Address: {OneVisitorData?.front_national_id?.Address}</span>
<span>Gender: {OneVisitorData?.back_national_id?.Gender}</span>
<span>BD: {OneVisitorData?.back_national_id?.ID_B}</span>
<span>Status: {OneVisitorData?.back_national_id?.Status}</span>
        </div>
    </Box>
  );
};

export default EditVisitors;
