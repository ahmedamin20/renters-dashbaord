import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { editDepartment, getDepartmentData } from "../../redux/Department.js";
import { useFormik } from "formik";
import { CustomFormikTextFeild } from "../../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import CustomSelectMenu from "../../../../components/CustomSelect/CustomSelect.jsx";
import hasPermission from "../../../../utils/haspermission.js";
import { useParams } from "react-router-dom";
import useMainHooks from "../../../../hooks/useMainHooks.jsx";
import DefaultButton from "../../../../components/defaultBtn.jsx";
import Header from "../../../../components/Header.jsx";
import CustomLable from "../../../../components/CustomLable.jsx";

const EditDepartment = () => {
  const { id } = useParams();
  const { t, sidebarRTL, dispatch, navigate,isLoading,setIsLoading } = useMainHooks();
  const managers = useSelector((state) => state.selectMenu.MyManagermenu.data);
  let data = useSelector((state) => state.Department.DepartmentData.data || []);
  data = data.find((item) => item.id == id);
  console.log(data);
  const formik = useFormik({
    initialValues: {
      name: data?.name,
      manager_id: data?.manager?.id,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });
  const handleFormSubmit = (values) => {
    setIsLoading(true);
    dispatch(editDepartment({ values, id }))
      .unwrap()
      .then((res) => {
        if (res.code == 200) {
          navigate(-1, { replace: true });
          dispatch(getDepartmentData(10));
          setIsLoading(false);
        }
      }).catch(()=> setIsLoading(false));
  };

  const handlemanagerChange = (value) => {
    formik.setFieldValue("manager_id", value?.id);
  };

  return (
    <Box m="20px">
      <Box display={"flex"} flexDirection={sidebarRTL ? "row-reverse" : "row"}>
        <Header title={t("edit")} />
      </Box>
      <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
        <Box dir={sidebarRTL ? "rtl" : "ltr"}>
          <CustomLable title="name" />
          <CustomFormikTextFeild
            title="name"
            lable="name"
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
          defaultData={data?.manager?.id}
        />

        <br />
        <br />
        {hasPermission("update-departments") && (
          <DefaultButton
          disabled={isLoading}
            fullWidth={true}
            text={t("edit")}
            handleClick={formik.handleSubmit}
          />
        )}
      </form>
    </Box>
  );
};
export default EditDepartment;
