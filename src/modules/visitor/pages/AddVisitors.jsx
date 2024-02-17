import * as yup from "yup";
import { useState } from "react";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useMediaQuery } from "@mui/material";
import { CustomFormikTextFeild } from "../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import { visitorsSchema } from "../../../utils/ValidationSchema.js";
import { StatuseCode } from "../../../statuseCodes.js";
import CustomSelect from "../../../components/CustomSelect/CustomSelect.jsx";
import CustomLable from "../../../components/CustomLable.jsx";
import { SubmitButton } from "../../../components/SubmitButton.jsx";
import CustomPassword from "../../../components/PasswordAndConfirmPassword/PassAndConfPass.jsx";
import { addVisitors, getVisitors } from "../redux/Visitors.js";
import useMainHooks from "../../../hooks/useMainHooks.jsx";
import { VisitorsTypes } from "./visitorsTypesArray.js";

const AddVisitors = () => {
  const { dispatch, t, navigate, sidebarRTL } = useMainHooks();
  const [type, setType] = useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      type: null,
      password: "",
      password_confirmation: "",
    },
    enableReinitialize: true,
    validationSchema: yup.lazy(values =>
      visitorsSchema.shape(
        values.type === "client"
          ? {
            password: yup
            .string()
            // .required("Password is required")
            .min(8, "Password must be at least 8 characters")
            .matches(
              /^(?=.*[A-Z][a-z])/,
              "Password must contain at least one uppercase letter and least one lowercase letter"
            ),
            password_confirmation: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords must match"),
        
            }
          : {}
      )
    ),
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  const handleFormSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    const pageSize = 10;
    const data = {
      ...values,
      phone: parseInt(values.phone),
    };
    try{

      await dispatch(addVisitors(data)).then((res) => {
        if (res.payload.code === StatuseCode.CREATED) {
          dispatch(getVisitors({ pageSize: pageSize }));
          formik.resetForm();
          navigate(-1);
    setLoading(false);

        }
      });
    }
    catch(err){
      console.log(err)
      setLoading(false);
    }
  };

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
  ];
  const handleVisitorTypeChange = async (item) => {
    await formik.setFieldValue("type", item?.id);
    await setType(item?.id);
 
  };
  return (
    <Box m="20px">
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
        <CustomSelect
        
          lable="type"
          onChange={handleVisitorTypeChange}
          options={VisitorsTypes()}
        />
        {type == "client" && (
          <>
            <CustomPassword
              disabled={type === "random"}
              req={type === "client" ? true : false}
              name="password"
              error={!!formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <CustomPassword
              disabled={type === "random"}
              req={type === "client" ? true : false}
              name="password_confirmation"
              error={
                !!formik.touched.password_confirmation &&
                !!formik.errors.password_confirmation
              }
              helperText={
                formik.touched.password_confirmation &&
                formik.errors.password_confirmation
              }
              value={formik.values.password_confirmation}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </>
        )}

        <SubmitButton fullWidth={true} loading={loading} text="add" />
      </form>
    </Box>
  );
};

export default AddVisitors;
