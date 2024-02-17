import { useState } from "react";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { CustomFormikTextFeild } from "../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import { StatuseCode } from "../../../statuseCodes.js";
import { useParams } from "react-router-dom";
import CustomLable from "../../../components/CustomLable.jsx";
import { SubmitButton } from "../../../components/SubmitButton.jsx";
import { adsSchema } from "../../../utils/ValidationSchema.js";
import { OneAds, editAds, getAds } from "../redux/ads.js";
import { useEffect } from "react";
import CustomLoader from "../../../components/CustomLoader/CustomLoader.jsx";
import { useRef } from "react";
import useMainHooks from "../../../hooks/useMainHooks.jsx";

const EditAds = () => {
  const { ad_id } = useParams();
  const oneAdData = useSelector((state) => state.ads.OneAdData.data) || [];

  const [adImg, setAdImg] = useState(oneAdData?.image);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { sidebarRTL, navigate, t, dispatch, isLoading, setIsLoading } =
    useMainHooks();
  const loading = useSelector((state) => state.ads.loading);
  const formik = useFormik({
    initialValues: {
      title: oneAdData?.title,
      discount: oneAdData?.discount,
      description: oneAdData?.description,
    },
    enableReinitialize: true,
    validationSchema: adsSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });
  useEffect(() => {
    if (oneAdData?.image) {
      setImg(oneAdData?.image);
    }
  }, [oneAdData?.image]);
  useEffect(() => {
    dispatch(OneAds(ad_id)).then((res) => {
      setImg(res.payload.data.image);
    });
  }, [dispatch, ad_id]);
  const handleFormSubmit = async (values) => {
    const pageSize = 10;
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("discount", values.discount);
    formData.append("description", values.description);
    formData.append("image", adImg);
    const data = {
      formData,
      id: ad_id,
    };
    await dispatch(editAds(data))
      .then((res) => {
        if (res.payload.code === StatuseCode.OK) {
          dispatch(getAds({ pageSize: pageSize }));
          formik.resetForm();
          navigate(-1, { replace: true });
          setIsLoading(false);
        }
      })
      .catch(() => setIsLoading(false));
  };
  const [img, setImg] = useState(oneAdData?.image);
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
  useEffect(() => {
    setShowAdImg(oneAdData.image);
  }, [oneAdData]);
  const fileClickRef = useRef();
  const handleInputClick = () => {
    fileClickRef.current.click();
  };
  return !loading ? (
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
        <SubmitButton fullWidth={true} loading={isLoading} text="Edit" />
      </form>
    </Box>
  ) : (
    <CustomLoader />
  );
};

export default EditAds;
