import { Box } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { addJob, getJobData } from "../../redux/Job.js";
import CustomSelectMenu from "../../../../components/CustomSelect/CustomSelect.jsx";
import { useEffect } from "react";
import { getDepartmentsMenu } from "../../../../redux/select_menus.js";
import { HttpStatusCode } from "axios";
import CustomLable from "../../../../components/CustomLable.jsx";
import { CustomFormikTextFeild } from "../../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import DefaultButton from "../../../../components/defaultBtn.jsx";
import useMainHooks from "../../../../hooks/useMainHooks.jsx";

const AddJob = () => {
  const { t, dispatch, navigate, sidebarRTL,isLoading,setIsLoading } = useMainHooks();
  const department = useSelector((state) => state.selectMenu.MyDepartmentmenu);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const checkoutSchema = yup.object().shape({
    name: yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      department_id: "",
    },
    validationSchema: checkoutSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  useEffect(() => {
    dispatch(getDepartmentsMenu());
  }, [dispatch]);
  const handleFormSubmit = async (values) => {
    const formData = {
      ...values,
    };
    setIsLoading(true);
    await dispatch(addJob(formData)).then((response) => {
      if (response.payload.code === HttpStatusCode.Created) {
        dispatch(getJobData({ pageSize: 10 }));
        navigate(-1, { replace: true });
        setIsLoading(false);
      }
    }).catch(()=> setIsLoading(false));
    setIsLoading(false);
  };

  const handleBrandChange = (value) => {
    formik.setFieldValue("department_id", value?.id);
  };

  return (
    <Box m="20px">
      <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
        <CustomSelectMenu
          lable={"department"}
          options={department}
          onChange={handleBrandChange}
        />
        <Box
          dir={sidebarRTL ? "rtl" : "ltr"}
          display="grid"
          gap="30px"
          mb={"30px"}
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <CustomLable title="name" />
          <CustomFormikTextFeild
            fullWidth={true}
            type="text"
            placeholder={t("name")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            name="name"
            error={!!formik.touched.name && !!formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Box>
        <DefaultButton
          text="Add"
          disabled={isLoading}
          handleClick={() => handleFormSubmit(formik.values)}
          fullWidth={true}
          type="submit"
        />
      </form>
    </Box>
  );
};

export default AddJob;
