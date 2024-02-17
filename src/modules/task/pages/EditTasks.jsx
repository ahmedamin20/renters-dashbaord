import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
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
import { OneTask, editTask, getTasks } from "../redux/tasks.js";
import { useParams } from "react-router-dom";
import useMainHooks from "../../../hooks/useMainHooks.jsx";

const EditTasks = () => {
  const { task_id } = useParams();
  const { t, dispatch, isLoading, setIsLoading, colors, navigate } =
    useMainHooks();
  const employeesMenu =
    useSelector((state) => state.selectMenu.myEmployeesMenu.data) || [];
  const VisitorsCarsMenu =
    useSelector((state) => state.selectMenu.VisitorsCarsMenu.data) || [];
  const oneTaskData =
    useSelector((state) => state.tasks.OneTaskData.data) || [];
  const { sidebarRTL } = useSidebarContext();
  // const loading = useSelector((state) => state.tasks.loading)
  useEffect(() => {
    dispatch(OneTask(task_id));
  }, [dispatch, task_id]);
  const formik = useFormik({
    initialValues: {
      description: oneTaskData.description,
      title: oneTaskData.title,
      employee_id: oneTaskData?.employee_id,
      type: oneTaskData?.type,
      starts_at: oneTaskData?.starts_at,
      due_to: oneTaskData?.due_to,
    },
    enableReinitialize: true,
    validationSchema: TasksSchema,
    onSubmit: (values) => handleFormSubmit(values),
  });

  useEffect(() => {
    dispatch(getMyEmployeeMenu());
    dispatch(getVisitorsCarsMenu());
  }, [dispatch]);

  const pageSize = 10;

  const handleFormSubmit = async (values) => {
    const data = {
      data: { ...values },
      id: task_id,
    };
    setIsLoading(true);
    dispatch(editTask(data))
      .then((res) =>
        res.payload.code === StatuseCode.OK
          ? dispatch(getTasks({ pageSize: pageSize })).then(() => {
              navigate(-1);
              setIsLoading(false);
            })
          : null
      )
      .catch(() => setIsLoading(false));
  };
  const setVisiotrsCars = (value) => {
    formik.setFieldValue("visitor_car_id", value?.id);
  };

  const handleDateTimeChangeStart = (e) => {
    const momentObject = e;
    const formattedDateTime = momentObject.format("YYYY-MM-DD HH:mm");
    formik.setFieldValue("starts_at", formattedDateTime);
  };

  const handleDateTimeChangeEnd = (e) => {
    const momentObject = e;
    const formattedDateTime = momentObject.format("YYYY-MM-DD HH:mm");
    formik.setFieldValue("due_to", formattedDateTime);
  };

  const handleCarsType = (value) => {
    formik.setFieldValue("type", value?.name);
  };
  const handleEmployee = (value) => {
    formik.setFieldValue("employee_id", value?.id);
  };
  const textFields = [
    {
      name: "description",
      value: formik.values.description,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("description"),
      isMulti: true,
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
          <CustomDateTime
            defaultData={oneTaskData?.starts_at}
            onChange={handleDateTimeChangeStart}
          />
        </Box>
        <Box dir={sidebarRTL ? "rtl" : "ltr"}>
          <CustomLable title="end_date" />
          <CustomDateTime
            defaultData={oneTaskData?.due_to}
            onChange={handleDateTimeChangeEnd}
          />
        </Box>
        <CustomSelect
          lable="select_employee"
          defaultData={oneTaskData?.employee_id}
          options={employeesMenu}
          onChange={handleEmployee}
        />
        <CustomSelect
          lable="select_type"
          defaultData={oneTaskData?.type}
          options={carsArray}
          onChange={handleCarsType}
        />
        <CustomSelect
          lable="select_visitor_car"
          isDisabled={oneTaskData?.type === "other"}
          defaultData={oneTaskData?.visitor_car_id}
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
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? t("Loading") : t("Edit")}
        </Button>
      </form>
    </Box>
  );
};
export default EditTasks;
