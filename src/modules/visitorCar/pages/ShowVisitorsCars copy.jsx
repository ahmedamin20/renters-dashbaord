import {
Box,Button,useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { useMediaQuery } from "@mui/material";
import { tokens } from "../../../theme.js";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import { OneVisitorCar } from "../redux/visitorsCars.js";
import CustomYearPicker from "../../../components/customYearPicker/CustomYearPicker.jsx";
import { CustomFormikTextFeild } from "../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import { VisitorsCarsSchema } from "../../../utils/ValidationSchema.js";
import { useEffect } from "react";
import { getBrandsMenu, getColorsMenu, getVisitorsMenu } from "../../../redux/select_menus.js";
import CustomSelect from "../../../components/CustomSelect/CustomSelect.jsx";
import { useNavigate, useParams } from "react-router-dom";
import CustomLoader from "../../../components/CustomLoader/CustomLoader.jsx";
import CustomLable from "../../../components/CustomLable.jsx";

const ShowVisitorsCars = () => {
  const {last_visit_id} = useParams()
  const visitorsMenu = useSelector((state) => state.selectMenu.visitorsMenu.data) || [];
  const brandsMenu = useSelector((state) => state.selectMenu.brandsMenu.data) || [];
  const colorsMenu = useSelector((state) => state.selectMenu.colorsMenu.data) || [];
  const loading = useSelector((state) => state.visitorsCars.loading);
  const oneVisitorCar = useSelector(state => state.visitorsCars.OneVisitorCarData.data)||[]
  console.log(oneVisitorCar)
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate()
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { sidebarRTL } = useSidebarContext();
  // console.log(oneVisitorCar.car_license)
  useEffect(() => {
    dispatch(OneVisitorCar(last_visit_id))
  },[dispatch,last_visit_id])
  useEffect(() => {
    const shouldFetchData = !(visitorsMenu.length || brandsMenu.length || colorsMenu.length);
    if (shouldFetchData) {
      dispatch(getVisitorsMenu());
      dispatch(getBrandsMenu());
      dispatch(getColorsMenu());
    }
  }, [dispatch]);
  
  const formik = useFormik({
    initialValues: {
      car_license: oneVisitorCar.car_license,
      vin_number: oneVisitorCar.vin_number,
      car_model: oneVisitorCar.car_model,
      model_year: oneVisitorCar.model_year,
      color_id: oneVisitorCar.color_id,
      visitor_id: oneVisitorCar.visitor_id
    },
    enableReinitialize:true,
    validationSchema: VisitorsCarsSchema,
    // onSubmit: (values) => {
      // handleFormSubmit(values);
    // },
  });

  const textFields = [
    {
      name: "car_license",
      value: formik.values.car_license,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("car_license"),
      error: !!formik.touched.car_license && !!formik.errors.car_license,
      helperText: formik.touched.car_license && formik.errors.car_license,
    },
    {
      name: "vin_number",
      value: formik.values.vin_number,
      handleChange: formik.handleChange,
      placeholder: t("vin_number"),
      onBlur: formik.handleBlur,
      error: !!formik.touched.vin_number && !!formik.errors.vin_number,
      helperText: formik.touched.vin_number && formik.errors.vin_number,
    },
    {
      name: "car_model",
      value: formik.values.car_model,
      placeholder: t("car_model"),
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error: !!formik.touched.car_model && !!formik.errors.car_model,
      helperText: formik.touched.car_model && formik.errors.car_model,
    },
  ];
 

  return (
    !loading&&OneVisitorCar?(
    <Box Box m="20px">
    <form initialValues={formik.initialValues}
      onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
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
          <CustomLable title={t(item.placeholder)}/>
          <CustomFormikTextFeild
            placeholder={t(item.placeholder)} onBlur={item.onBlur}
            onChange={item.handleChange} value={item.value} name={item.name}
            error={item.error} helperText={item.helperText} disabled={true} />
        </Box>
      ))}
      <Box>
            <CustomSelect
              lable="brands"
              isDisabled={true}
              placeholder="Select an option"
              // onChange={handleBrandChange}
              options={brandsMenu}
              defaultData={oneVisitorCar&&oneVisitorCar.brand_id}
        />
      </Box>
      <Box>
            <CustomSelect
              lable="colors"
              isDisabled={true}
              placeholder="Select an option"
              // onChange={handleColorChange}
              options={colorsMenu}
              defaultData={oneVisitorCar&&oneVisitorCar.color_id}
        />
      </Box>
      <Box>
              <CustomSelect
              lable="visitors"
              isDisabled={true}
              placeholder="Select an option"
              // onChange={handleVisitorChange}
              options={visitorsMenu}
              defaultData={oneVisitorCar&&oneVisitorCar.visitor_id}
              />
      </Box>
      <CustomYearPicker  title={t("model_year")} />
      <Box display="flex" justifyContent="end" mt="20px">
          <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
              variant="outlined"
              onClick={()=>navigate(-1,{replace:true})}
        >
          {t("back")}
        </Button>
      </Box>
    </form>
    </Box>) : (
        <CustomLoader/>
  )
  );
};

export default ShowVisitorsCars;
