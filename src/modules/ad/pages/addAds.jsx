import { useRef, useState } from "react";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { CustomFormikTextFeild } from "../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import { StatuseCode } from "../../../statuseCodes.js";
import CustomLable from "../../../components/CustomLable.jsx";
import { SubmitButton } from "../../../components/SubmitButton.jsx";
import { adsSchema } from "../../../utils/ValidationSchema.js";
import { addAds, getAds } from "../redux/ads.js";
import useMainHooks from "../../../hooks/useMainHooks.jsx";

const AddAds = () => {
  const [adImg, setAdImg] = useState(null);

  const { sidebarRTL, navigate, t, dispatch, isLoading, setIsLoading } =
    useMainHooks();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const loading = useSelector((state) => state.ads.loading);

  const formik = useFormik({
    initialValues: {
      title: "",
      discount: "",
      description: "",
    },
    enableReinitialize: true,
    validationSchema: adsSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    const pageSize = 10;
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("discount", values.discount);
    formData.append("description", values.description);
    formData.append("image", adImg);

    await dispatch(addAds(formData))
      .then((res) => {
        if (res.payload.code === StatuseCode.CREATED) {
          dispatch(getAds({ pageSize: pageSize }));
          formik.resetForm();
          navigate(-1);
          setIsLoading(false);
        }
      })
      .catch(() => setIsLoading(false));
  };

  const textFields = [
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
      name: "discount",
      value: formik.values.discount,
      handleChange: formik.handleChange,
      placeholder: t("discount"),
      onBlur: formik.handleBlur,
      error: !!formik.touched.discount && !!formik.errors.discount,
      helperText: formik.touched.discount && formik.errors.discount,
    },
    {
      name: "description",
      value: formik.values.description,
      placeholder: t("description"),
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error: !!formik.touched.description && !!formik.errors.description,
      helperText: formik.touched.description && formik.errors.description,
    },
  ];
  const [ShowAdImg, setShowAdImg] = useState("");
  const handleFileChange = (e) => {
    console.log(e);
    setAdImg(e.target.files[0]);

    setShowAdImg(URL.createObjectURL(e.target.files[0]));
  };
  const fileClickRef = useRef();
  const handleInputClick = () => {
    fileClickRef.current.click();
  };

  const [img, setImg] = useState("/assets/mainImg.png");
  const fileRef = useRef();
  const handleFileRef = () => {
    fileRef.current.click();
  };
  const handleChangePhoto = async (e) => {
    setAdImg(e.target.files[0]);

    setShowAdImg(URL.createObjectURL(e.target.files[0]));
    await formik.setFieldValue("team_member", e.target.files[0]);
    await setImg(URL.createObjectURL(e.target.files[0]));
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
              margin: "1rem auto",
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
              isMulti={item.name === "description" ? true : false}
              error={item.error}
              helperText={item.helperText}
            />
          </Box>
        ))}
        <Box>
          <Box
            sx={{
              width: "400px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "1rem",
              margin: ".5rem auto",
            }}
          >
            <input
              type="file"
              id="fileInput"
              onChange={handleChangePhoto}
              style={{ display: "none" }}
              ref={fileRef}
            />
            <img
              src={img}
              alt="img"
              style={{ margin: "1rem auto", width: "100%" }}
              onClick={handleFileRef}
            />
          </Box>
        </Box>
        <SubmitButton fullWidth={true} loading={isLoading} text="save" />
      </form>
    </Box>
  );
};

export default AddAds;
