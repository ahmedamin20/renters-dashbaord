import { Box } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { addDepartment, getDepartmentData } from "../../redux/Department.js";
import CustomSelectMenu from "../../../../components/CustomSelect/CustomSelect.jsx";
import { CustomFormikTextFeild } from "./../../../../components/CustomFormikTextFeild/customFormikTextFeild";
import DefaultButton from "../../../../components/defaultBtn.jsx";
import useMainHooks from "../../../../hooks/useMainHooks.jsx";
import Header from "../../../../components/Header.jsx";
import CustomLable from "../../../../components/CustomLable.jsx";

const AddDepartment = () => {
  const { t, sidebarRTL, navigate, dispatch, isLoading, setIsLoading } =
    useMainHooks();
  const managers =
    useSelector((state) => state.selectMenu.MyManagermenu.data) || [];

  const checkoutSchema = yup.object().shape({
    name: yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      manager_id: "",
    },
    validationSchema: checkoutSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    await dispatch(addDepartment(values))
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.code == 201) {
          dispatch(getDepartmentData({ pageSize: 10 }));
          navigate(-1, { replace: true });
          setIsLoading(false);
        }
      })
      .catch(() => setIsLoading(false));
  };

  const handlemanagerChange = (value) => {
    formik.setFieldValue("manager_id", value?.id);
  };

  return (
    <Box m="20px">
      <Box display={"flex"} flexDirection={sidebarRTL ? "row-reverse" : "row"}>
        <Header title={t("Add")} />
      </Box>
      <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
        <Box dir={sidebarRTL ? "rtl" : "ltr"}>
          <CustomLable title="name" />
          <CustomFormikTextFeild
            title="name"
            fullWidth={true}
            required={true}
            placeholder={t("name")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            name="name"
            error={!!formik.touched.name && !!formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Box>
        <CustomSelectMenu
          lable={"select_manager"}
          options={managers}
          onChange={handlemanagerChange}
        />
        <br />
        <br />
        <DefaultButton
          fullWidth={true}
          disabled={isLoading}
          text={t("Add")}
          handleClick={() => handleFormSubmit(formik.values)}
        />
      </form>
    </Box>
  );
};

export default AddDepartment;
