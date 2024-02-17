import { useState } from "react";
import { Box } from "@mui/material";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import { useSelector } from "react-redux";
import DefaultButton from "../../../components/defaultBtn.jsx";
import { useRef } from "react";
import { useFormik } from "formik";
import { CustomFormikTextFeild } from "../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import CustomLable from "../../../components/CustomLable.jsx";
import { addBlog, getBlogs } from "../redux/blogs.js";
import { StatuseCode } from "../../../statuseCodes.js";
import CustomLoader from "../../../components/CustomLoader/CustomLoader.jsx";
import { BlogsSchema } from "../../../utils/ValidationSchema.js";
import useMainHooks from "../../../hooks/useMainHooks.jsx";

const AddBlog = () => {
  const {dispatch,sidebarRTL,navigate} = useMainHooks();
  const [img, setImg] = useState("/assets/mainImg.png");
  const fileRef = useRef();
  const loading = useSelector((state) => state.Blogs.loading);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      blog_image: "",
    },
    enableReinitialize: true,
    validationSchema: BlogsSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("blog_image", values.blog_image);
    dispatch(addBlog(formData)).then((res) =>
    {
      console.log(res)
      res.payload.code === StatuseCode.CREATED
      && dispatch(getBlogs({ pageSize: 10 })).then(() => navigate(-1, { replace: true }))
    }
    );
  };

  

  const handleChangePhoto = async (e) => {
    console.log(e.target.files[0]);
    await formik.setFieldValue("blog_image", e.target.files[0]);
    await setImg(URL.createObjectURL(e.target.files[0]));
  };
  const handleFileRef = () => {
    fileRef.current.click();
  };
  const textField = [
    {
      name: "title",
      value: formik.values.title,
      isMulti: false,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: "title",
      error: !!formik.touched.title && !!formik.errors.title,
      helperText: formik.touched.title && formik.errors.title,
    },
    {
      name: "description",
      value: formik.values.description,
      isMulti: true,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: "description",
      error: !!formik.touched.description && !!formik.errors.description,
      helperText: formik.touched.description && formik.errors.description,
    },
  ];
  return (
    <Box m={'20px'} dir={sidebarRTL ? "rtl" : "ltr"}>
       
          <form onSubmit={formik.handleSubmit}>
            {textField.map((item, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <CustomLable title={item.name} />
                <CustomFormikTextFeild
                  placeholder={item.name}
                  isMulti={item.isMulti}
                  onBlur={item.onBlur}
                  fullWidth={true}
                  value={item.value}
                  onChange={formik.handleChange}
                  helperText={item.helperText}
                  error={item.error}
                  name={item.name}
                />
              </div>
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
          </form>
         
          {loading ? (
            <CustomLoader />
          ) : (
            <DefaultButton fullWidth={true} text="Add" handleClick={()=> handleSubmit(formik.values)} />
            // <Button
            //   type="submit"
            //   onClick={formik.handleSubmit}
            //   sx={{
            //     backgroundColor: colors.blueAccent[700],
            //     color: colors.grey[100],
            //     fontSize: "14px",
            //     fontWeight: "bold",
            //     padding: "10px 15px",
            //   }}
            //   disabled={loading}
            // >
            //   {t("Add")}
            // </Button>
          )}
    </Box>
  );
};

export default AddBlog;
