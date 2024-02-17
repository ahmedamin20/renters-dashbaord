import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { CustomFormikTextFeild } from "../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import { StatuseCode } from "../../../statuseCodes.js";
import CustomLable from "../../../components/CustomLable.jsx";
import {
  getTermsAndCondtions,
  updateTermsAndCondtions,
} from "../redux/termsAndCondtions.js";
import hasPermission from "../../../utils/haspermission.js";
import useMainHooks from "../../../hooks/useMainHooks.jsx";

const TermsAndCondtions = () => {
  const { sidebarRTL, t, dispatch, colors, isLoading, setIsLoading } =
    useMainHooks();

  const termsAndCondtions =
    useSelector(
      (state) => state.termsAndCondtions.termsAndCondtionsData.data
    ) || [];

  const formik = useFormik({
    initialValues: {
      employee_terms: termsAndCondtions.employee_terms,
      client_terms: termsAndCondtions.client_terms,
    },
    enableReinitialize: true,
    // validationSchema: TasksSchema,
    onSubmit: (values) => handleFormSubmit(values),
  });

  useEffect(() => {
    dispatch(getTermsAndCondtions());
  }, [dispatch]);

  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    dispatch(updateTermsAndCondtions(values))
      .then((res) => {
        if (res.payload.code === StatuseCode.OK) {
          dispatch(getTermsAndCondtions());
          setIsLoading(false);
        }
      })
      .catch(() => setIsLoading(false));
  };

  const textFields = [
    {
      name: "employee_terms",
      value: formik.values.employee_terms,
      isMulti: true,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("employee_terms"),
      error: !!formik.touched.employee_terms && !!formik.errors.employee_terms,
      helperText: formik.touched.employee_terms && formik.errors.employee_terms,
    },
    {
      name: "client_terms",
      isMulti: true,
      value: formik.values.client_terms,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("client_terms"),
      error: !!formik.touched.client_terms && !!formik.errors.client_terms,
      helperText: formik.touched.client_terms && formik.errors.client_terms,
    },
  ];
  return (
    <Box m="20px">
      <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
        {textFields.map((item, index) => (
          <Box dir={sidebarRTL ? "rtl" : "ltr"} key={index}>
            <CustomLable title={item.placeholder} />
            <CustomFormikTextFeild
              // placeholder={item.placeholder}
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
        {hasPermission("update-terms_and_conditions") && (
          <Button
            onClick={formik.handleSubmit}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              marginTop: "2rem",
              padding: "10px 20px",
            }}
            fullWidth
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? t("wait") : t("save")}
          </Button>
        )}
      </form>
    </Box>
  );
};

export default TermsAndCondtions;
