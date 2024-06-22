import { useFormik } from "formik";
import { Box, Button } from "@mui/material";
import Header from "../../../components/Header.jsx";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { editSetting, getSetting } from "../redux/settings.js";
import { CustomFormikTextFeild } from "../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import hasPermission from "../../../utils/haspermission.js";
import CustomTagInput from "./../../../components/CustomTagInput/CustomTagInput";
import useMainHooks from "../../../hooks/useMainHooks.jsx";

const Settings = () => {
  const { sidebarRTL, t, dispatch, colors, isLoading, setIsLoading } =
    useMainHooks();

  const settingData =
    useSelector((state) => state.settings.settingsData.data) || [];
  useEffect(() => {
    dispatch(getSetting());
  }, [dispatch]);
  const formik = useFormik({
    initialValues: {
      title: settingData?.title,
      phone: settingData?.phones,
      address: settingData?.address,
      facebook: settingData?.facebook,
      whatsapp: settingData?.whatsapp,
      youtube: settingData?.youtube,
      checking_amount: settingData?.checking_amount,
      linkedin: settingData?.linkedin,
      instagram: settingData?.instagram,
      gmail: settingData?.gmail,
      taxes: settingData?.taxes,
    },
    enableReinitialize: true,
    // validationSchema: settingsSchema,
    onSubmit: (values) => handleSubmit(values),
  });
  const handleSubmit = (values) => {
    const data = { ...values };
    console.log(data);
    if (!Array.isArray(data.phone)) data.phone = values.phone.split(",");
    setIsLoading(true);
    dispatch(editSetting(data))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  };
  const textFieldsArray = [
    {
      name: "title",
      value: formik.values.title,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("title"),
      error: !!formik.touched.title && !!formik.errors.title,
      helperText: formik.touched.title && formik.errors.title,
    },
    {
      name: "address",
      value: formik.values.address,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("address"),
      error: !!formik.touched.address && !!formik.errors.address,
      helperText: formik.touched.address && formik.errors.address,
    },
    {
      name: "facebook",
      value: formik.values.facebook,
      handleChange: formik.handleChange,
      placeholder: t("facebook"),
      onBlur: formik.handleBlur,
      error: !!formik.touched.facebook && !!formik.errors.facebook,
      helperText: formik.touched.facebook && formik.errors.facebook,
    },
    {
      name: "whatsapp",
      value: formik.values.whatsapp,
      placeholder: t("whatsapp"),
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error: !!formik.touched.whatsapp && !!formik.errors.whatsapp,
      helperText: formik.touched.whatsapp && formik.errors.whatsapp,
    },
    {
      name: "youtube",
      value: formik.values.youtube,
      placeholder: t("youtube"),
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error: !!formik.touched.youtube && !!formik.errors.youtube,
      helperText: formik.touched.youtube && formik.errors.youtube,
    },
    {
      name: "linkedin",
      value: formik.values.linkedin,
      placeholder: t("linkedin"),
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error: !!formik.touched.linkedin && !!formik.errors.linkedin,
      helperText: formik.touched.linkedin && formik.errors.linkedin,
    },
    {
      name: "instagram",
      value: formik.values.instagram,
      placeholder: t("instagram"),
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error: !!formik.touched.instagram && !!formik.errors.instagram,
      helperText: formik.touched.instagram && formik.errors.instagram,
    },

    
  ];
  console.log(sidebarRTL);
  return (
    <Box m={2} dir={sidebarRTL ? "rtl" : "ltr"}>
      <Box
        display={"flex"}
        justifyContent={sidebarRTL == "true" ? "flex-end" : "flex-start"}
      >
        <Header title={t("settings")} />
      </Box>
      <form onSubmit={formik.handleSubmit}>
        {textFieldsArray.map((item, index) => (
          <Box key={index} sx={{ margin: "2rem" }}>
            <label
              style={{ fontWeight: "bold", fontSize: "16px", margin: ".5rem" }}
            >
              {t(item.name)}
            </label>
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
        
        {hasPermission("update-settings") && (
          <Button
            fullWidth
            disabled={isLoading}
            // onClick={formik.handleSubmit}
            sx={{
              background: colors.blueAccent[600],
              color: colors.grey[100],
              fontSize: "16px",
              fontWeight: "bold",
              margin: ".5rem auto",
            }}
            type="submit"
          >
            {!isLoading ? t("Save") : t("loading")}
          </Button>
        )}
      </form>
    </Box>
  );
};

export default Settings;
