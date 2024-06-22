import { useState } from "react";
import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  LinearProgress,
  TextField,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import Header from "../../../components/Header.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import { tokens } from "../../../theme.js";
import { editAboutUs, getAbout_us } from "../redux/aboutUs.js";
import validationSchema from "../../../validationSchemasSyntax.js";
import { StatuseCode } from "../../../statuseCodes.js";
import { useRef } from "react";

const AboutUs = () => {
  const { sidebarRTL } = useSidebarContext();
  const aboutUS =
    useSelector((state) => state.about_us?.aboutUsData?.data) || [];
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { t } = useTranslation();
  const [logo, setLogo] = useState(); // State to store the logo image
  const [logoShow, setLogoShow] = useState(); // State to store the logo image
  const dispatch = useDispatch();
  const UploadClickRef = useRef();
  useEffect(() => {
    dispatch(getAbout_us());
  }, [dispatch, aboutUS == []]);

  const loading = useSelector((state) => state.about_us.loading);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const checkoutSchema = yup.object().shape({
    Name: validationSchema.name,
    Description: validationSchema.description,
  });

  const handleFormSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("youtube_video_url", values.youtube_video_url);
    formData.append("image", logo); // Add the logo to the form data

    await dispatch(editAboutUs(formData)).then((res) =>
      res.payload.code === StatuseCode.OK ? dispatch(getAbout_us()) : null
    );
  };

  useEffect(() => {
    if (aboutUS.image) {
      setLogo(aboutUS.image);
    }
  }, [aboutUS.image]);
  const handleImgChange = (e) => {
    setLogo(e.target.files[0]);
    setLogoShow(URL.createObjectURL(e.target.files[0]));
  };

  const handleButtonClick = () => {
    UploadClickRef.current.click();
  };

  return (
    <Box m="20px">
      <Header title={t("about_us")} />
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="300px"
        >
          <LinearProgress />
        </Box>
      ) : (
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={aboutUS}
          validationSchema={checkoutSchema}
          dir={sidebarRTL ? "rtl" : "ltr"}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{ gridColumn: "span 4" }}
                >
                  <label style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {t("Name")}
                  </label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    defaultValue={aboutUS?.name}
                    name="name"
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{ gridColumn: "span 4" }}
                    inputProps={{
                      style: { fontSize: "18px", fontWeight: "bold" }, // Adjust the font size here
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{ gridColumn: "span 4" }}
                >
                  <label style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {t("Description")}
                  </label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    name="description"
                    defaultValue={aboutUS?.description}
                    multiline
                    error={!!touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                    sx={{ gridColumn: "span 4" }}
                    inputProps={{
                      style: { fontSize: "18px", fontWeight: "bold" }, // Adjust the font size here
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{ gridColumn: "span 4" }}
                >
                  <label style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {t("youtube_video_url")}
                  </label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.youtube_video_url}
                    name="youtube_video_url"
                    defaultValue={aboutUS?.youtube_video_url}
                    multiline
                    error={
                      !!touched.youtube_video_url && !!errors.youtube_video_url
                    }
                    helperText={
                      touched.youtube_video_url && errors.youtube_video_url
                    }
                    sx={{ gridColumn: "span 4" }}
                    inputProps={{
                      style: { fontSize: "18px", fontWeight: "bold" }, // Adjust the font size here
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="start"
                  fullWidth
                  mt={10}
                  gridColumn={"span 4"}
                >
                  <ImageList
                    sx={{ width: 400, height: 450 }}
                    variant="woven"
                    cols={2}
                    rowHeight={200}
                  >
                    <ImageListItem cols="2" row="2">
                      <input
                        type="file"
                        name="logo"
                        accept="image/*"
                        ref={UploadClickRef}
                        onChange={handleImgChange}
                        style={{ display: "none" }}
                      />
                      <img
                        onClick={handleButtonClick}
                        src={logoShow || aboutUS.image}
                        alt="/assets/mainImg.png"
                        loading="lazy"
                      />
                    </ImageListItem>
                  </ImageList>
                </Box>
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button
                  fullWidth
                  onClick={handleFormSubmit}
                  sx={{
                    backgroundColor: colors.blueAccent[700],
                    margin: ".5rem auto",
                    color: colors.grey[100],
                    paddin: "2rem",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                  type="submit"
                  variant="outlined"
                >
                  {t("Save")}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </Box>
  );
};

export default AboutUs;
