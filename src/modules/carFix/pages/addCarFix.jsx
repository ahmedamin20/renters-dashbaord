import { Box, Button, useTheme } from "@mui/material";
import { useFormik } from "formik";
import { tokens } from "../../../theme.js";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import { useEffect, useRef } from "react";
import {
  getGaragesMenu,
  getMyGarageEmployees,
  getVisitorsCarsMenu,
} from "../../../redux/select_menus.js";
import { StatuseCode } from "../../../statuseCodes.js";
import CustomSelect from "../../../components/CustomSelect/CustomSelect.jsx";
import { useNavigate } from "react-router-dom";
import VideoInput from "../../../components/customVideoInput/customVideoInput.jsx";
import CustomMutliImg from "../../../components/Custom MultiImg/customMultiImg.jsx";
import { useState } from "react";
import CustomDate from "../../../components/CustomDate/CustomDate.jsx";
import { addCarFix, getCarFix } from "../redux/carFix.js";
import CustomLoader from "../../../components/CustomLoader/CustomLoader.jsx";

const AddCarFix = () => {
  const garagesMenu =
    useSelector((state) => state.selectMenu.garagesMenu.data) || [];
  const myGarageEmployeesMenu =
    useSelector((state) => state.selectMenu.myGarageEmployeesMenu.data) || [];
  const visitorsCarsMenu =
    useSelector((state) => state.selectMenu.VisitorsCarsMenu.data) || [];
  const [selectedGarage, setSelectedGarage] = useState(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const { sidebarRTL } = useSidebarContext();
  const loading = useSelector((state) => state.CarFix.loading);
  const employeeRef = useRef(true);
  const garagesRef = useRef(true);
  const visitorCarsRef = useRef(true);

  useEffect(() => {
    if (employeeRef || visitorCarsRef) {
      dispatch(getGaragesMenu());
      dispatch(getVisitorsCarsMenu());
    }
  }, [dispatch]);
  useEffect(() => {
    if (garagesRef) {
      dispatch(getMyGarageEmployees(selectedGarage));
    }
  }, [dispatch, selectedGarage, garagesRef]);

  const formik = useFormik({
    initialValues: {
      vin_number: "",
      created_at: "",
    },
    enableReinitialize: true,
    // validationSchema: VisitorsCarsSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });
  const handleDateChange=(e)=>{
    console.log(e)
    formik.setFieldValue("created_at", e?.format("YYYY-MM-DD"));
  }
  const handleFormSubmit = async (values) => {
    const formData = new FormData();
    formData.append("vin_number", values.vin_number);
    formData.append("checker_employee_id", values.checker_employee_id);
    formData.append("checker_employee_id", values.checker_employee_id);
    formData.append("visit_date", values.visit_date);
    formData.append("garage_id", values.garage_id);
    formData.append("visitor_car_id", values.visitor_car_id);
    formData.append("video", values.video);
    formData.append("created_at", values.created_at);

    //TODO push images
    for (let i = 0; i < images.length; i++) {
      if (images[i].file) {
        formData.append(`images[${i}]`, images[i].file);
      }
    }

    await dispatch(addCarFix(formData)).then((res) => {
      if (res.payload.code === StatuseCode.CREATED) {
        dispatch(getCarFix({ pageSize: 10 }));
        formik.resetForm();
        navigate(-1, { replace: true });
      }
    });
  };

  const handleEmployeeChange = (item) => {
    formik.setFieldValue("checker_employee_id", item?.id);
  };
  const handleGaragesChange = (item) => {
    formik.setFieldValue("garage_id", item?.id);
    setSelectedGarage(item?.id);
  };
  const handleYearChangeChange = (item) => {
    formik.setFieldValue("visit_date", item.format("YYYY-MM-DD"));
  };
  const handleVideoChange = (event) => {
    formik.setFieldValue("video", event.target.files[0]);
  };
  const handleVinNumberChange = (event) => {
    formik.setFieldValue("vin_number", event?.name);
    formik.setFieldValue("visitor_car_id", event?.id);
  };
  const [images, setImages] = useState([]);
  const imagesChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };
  return !loading ? (
    <Box m="20px">
      <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
        <CustomSelect
          lable="select_vinNumber"
          onChange={handleVinNumberChange}
          options={visitorsCarsMenu}
        />

        <CustomDate title={t("visit_date")} onChange={handleYearChangeChange} />
        <CustomSelect
          lable="select_garage"
          placeholder="Select an option"
          onChange={handleGaragesChange}
          options={garagesMenu}
        />
        <CustomDate title={"date"} onChange={handleDateChange}/>

        <CustomSelect
          isDisabled={selectedGarage === null}
          lable="select_emloyee"
          placeholder="Select an option"
          onChange={handleEmployeeChange}
          options={myGarageEmployeesMenu}
        />
        <VideoInput onChange={handleVideoChange} />
        <CustomMutliImg imagesChange={imagesChange} />
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            type="submit"
            fullWidth
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            disabled={loading}
            variant="outlined"
          >
            {loading ? t("wait") : t("Add")}
          </Button>
        </Box>
      </form>
    </Box>
  ) : (
    <CustomLoader />
  );
};

export default AddCarFix;
