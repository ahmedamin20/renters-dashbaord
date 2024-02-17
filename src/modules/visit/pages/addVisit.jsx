import { useState, useEffect } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import { getEmployeeMenu } from "../../garage/redux/garages.js";
import CustomSelectMenu from "../../../components/CustomSelect/CustomSelect.jsx";
import { StatuseCode } from "../../../statuseCodes.js";
import { addVisits, getVisits } from "../redux/visits.js";
import { useFormik } from "formik";
import { visitSchema } from "../../../utils/ValidationSchema.js";
import CustomLable from "../../../components/CustomLable.jsx";
import { CustomFormikTextFeild } from "../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import { getVisitorsMenu } from "../../../redux/select_menus.js";
import { Box } from "@mui/material";
import DefaultButton from "../../../components/defaultBtn.jsx";
import useMainHooks from "../../../hooks/useMainHooks.jsx";
import { useParams } from "react-router-dom";
const AddVisit = () => {
  const { rerenderId } = useParams();
  const { t, dispatch, navigateBack } = useMainHooks();

  const { sidebarRTL } = useSidebarContext();
  const [SelectedGarage, setSelectedGarage] = useState(null);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(getEmployeeMenu());
    dispatch(getVisitorsMenu());
  }, [dispatch]);

  const VisitorsData =
    useSelector((state) => state.selectMenu.visitorsMenu.data) || [];
  const garageData =
    useSelector((state) => state.selectMenu.garagesMenu.data) || [];

  const formik = useFormik({
    initialValues: {
      reason: "",
    },
    enableReinitialize: true,
    validationSchema: visitSchema,
    onSubmit: (values) => handleSubmit(values),
  });
  const handleSubmit = async (values) => {
    setLoading(true);
    const data = {
      visitor_id: selectedVisitor,
      garage_id: SelectedGarage,
      reason: values.reason,
    };
    try {
      await dispatch(addVisits(data)).then((res) => {
        res.payload.code === StatuseCode.CREATED
          && dispatch(getVisits({ id: rerenderId, pageSize: 10 })) &&
          navigateBack()
        
      });
    } catch (err) {
      setLoading(false);
    }
    setLoading(false);
  };
  const handleSelectVisitor = (selectedOptions) => {
    setSelectedVisitor(selectedOptions?.id);
  };
  const handleSelectGarage = (selectedOptions) => {
    setSelectedGarage(selectedOptions?.id);
  };
 
  const textFieldTest = [
    {
      name: "reason",
      value: formik.values.reason,
      isMulti: true,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: "reason",
      error: !!formik.touched.reason && !!formik.errors.reason,
      helperText: formik.touched.reason && formik.errors.reason,
    },
  ];
  return (
    <Box m={"20px"} dir={sidebarRTL ? "rtl" : "ltr"}>
      <DialogTitle
        sx={{ fontWeight: "bold", fontSize: "22px" }}
        align={sidebarRTL ? "right" : "left"}
      >
        {t("Add")}
      </DialogTitle>

      <form onSubmit={formik.handleSubmit}>
        {textFieldTest.map((item, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <CustomLable title={item.name} />
            <CustomFormikTextFeild
              placeholder={item.name}
              isMulti={item.isMulti}
              onBlur={item.onBlur}
              fullWidth={true}
              value={item.value}
              onChange={formik.handleChange}
              helperText={item.helperText}
              error={item.error}
              name={item.name}
            />
          </div>
        ))}
        <CustomSelectMenu
          lable="select_visitor"
          options={VisitorsData}
          placeholder={t("select_visitor")}
          onChange={handleSelectVisitor}
        />
        <CustomSelectMenu
          lable="select_garage"
          options={garageData}
          placeholder={t("select_garage")}
          onChange={handleSelectGarage}
        />
      </form>
      <DefaultButton
        fullWidth={true}
        disabled={loading}
        text={loading ? "loading" : "add"}
        handleClick={() => {
 
          handleSubmit(formik.values);
        }}
      />
    </Box>
  );
};

export default AddVisit;
