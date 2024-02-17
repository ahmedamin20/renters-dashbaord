import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CustomFormikTextFeild } from "../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import { TasksSchema } from "../../../utils/ValidationSchema.js";
import CustomSelect from "../../../components/CustomSelect/CustomSelect.jsx";
import {
  getMyEmployeeMenu,
  getVisitorsCarsMenu,
} from "../../../redux/select_menus.js";
import { StatuseCode } from "../../../statuseCodes.js";
import CustomDateTime from "../../../components/CustomDateTime/CustomDateTime.jsx";
import { carsArray } from "./carsArray.js";
import CustomLable from "../../../components/CustomLable.jsx";
import { addTask, getTasks } from "../redux/tasks.js";
import useMainHooks from "../../../hooks/useMainHooks.jsx";
import Header from "../../../components/Header.jsx";
import DefaultButton from "../../../components/defaultBtn.jsx";

const AddTasks = () => {
  const employeesMenu =
    useSelector((state) => state.selectMenu.myEmployeesMenu.data) || [];
  const VisitorsCarsMenu =
    useSelector((state) => state.selectMenu.VisitorsCarsMenu.data) || [];
  const { colors, t, dispatch, navigate, sidebarRTL } = useMainHooks();
  const formik = useFormik({
    initialValues: {
      description: "",
      title: "",
    },
    validationSchema: TasksSchema,
    onSubmit: (values) => handleFormSubmit(values),
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getMyEmployeeMenu());
    dispatch(getVisitorsCarsMenu());
  }, [dispatch]);
  const pageSize = 10;
  const handleFormSubmit = async (values) => {
    setLoading(true);
    dispatch(addTask(values))
      .then((res) =>
        res.payload.code === StatuseCode.CREATED
          ? dispatch(getTasks({ pageSize: pageSize })) &&
            navigate(-1) &&
            setLoading(false)
          : null
      )
      .catch(() => setLoading(false));
  };
  const setVisiotrsCars = (value) => {
    formik.setFieldValue("visitor_car_id", value?.id);
  };

  const handleDateTimeChangeStart = (e) => {
    console.log(e,"outComponent")
    const momentObject = e;
    const formattedDateTime = momentObject.replace("T"," ");
    formik.setFieldValue("starts_at", formattedDateTime);
  };

  const handleDateTimeChangeEnd = (e) => {
    const momentObject = e;

    const formattedDateTime = momentObject.replace("T"," ");

    formik.setFieldValue("due_to", formattedDateTime);
  };
  const [carType, setCarType] = useState("");
  const handleCarsType = (value) => {
    formik.setFieldValue("type", value?.name);
    setCarType(value.name);
  };
  const handleEmployee = (value) => {
    formik.setFieldValue("employee_id", value?.id);
  };
  const textFields = [
    {
      name: "description",
      value: formik.values.description,
      isMulti: true,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("description"),
      error: !!formik.touched.description && !!formik.errors.description,
      helperText: formik.touched.description && formik.errors.description,
    },
    {
      name: "title",
      value: formik.values.title,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("title"),
      error: !!formik.touched.title && !!formik.errors.title,
      helperText: formik.touched.title && formik.errors.title,
    },
  ];
  return (
    <Box m="20px">
      <Header title={t("add")} />
      <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
        {textFields.map((item, index) => (
          <Box dir={sidebarRTL ? "rtl" : "ltr"} key={index}>
            <CustomLable title={item.placeholder} />
            <CustomFormikTextFeild
              placeholder={item.placeholder}
              onBlur={item.onBlur}
              onChange={item.handleChange}
              value={item.value}
              name={item.name}
              isMulti={item.isMulti}
              error={item.error}
              helperText={item.helperText}
            />
          </Box>
        ))}
        <Box dir={sidebarRTL ? "rtl" : "ltr"}>
          <CustomLable title="start_date" />
          <CustomDateTime onChange={handleDateTimeChangeStart} />
        </Box>
        <Box dir={sidebarRTL ? "rtl" : "ltr"}>
          <CustomLable title="end_date" />
          <CustomDateTime onChange={handleDateTimeChangeEnd} />
        </Box>
        <CustomSelect
          lable="select_employee"
          options={employeesMenu}
          onChange={handleEmployee}
        />
        <CustomSelect
          lable="select_type"
          options={carsArray}
          onChange={handleCarsType}
        />
        <CustomSelect
          isDisabled={carType === "other"}
          lable="select_visitor_car"
          options={VisitorsCarsMenu}
          onChange={setVisiotrsCars}
        />

        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          fullWidth
          disabled={loading}
          type="submit"
        >
          {loading ? t("loading") : t("Add")}
        </Button>
      </form>
    </Box>
  );
};

export default AddTasks;
