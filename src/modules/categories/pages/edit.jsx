import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CustomFormikTextFeild } from "../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import CustomLable from "../../../components/CustomLable.jsx";
import CustomLoader from "../../../components/CustomLoader/CustomLoader.jsx";
import DefaultButton from "../../../components/defaultBtn.jsx";
import useMainHooks from "../../../hooks/useMainHooks.jsx";
import { StatuseCode } from "../../../statuseCodes.js";
import { BlogsSchema } from "../../../utils/ValidationSchema.js";
import { editCategory, getOneCategory, getcategories } from "../redux/categories.js";

const EditCategory = () => {
  const { id } = useParams();
  const oneBlogData = useSelector((state) => state.categories.oneBlogData?.data);
  const { dispatch, navigate, sidebarRTL } = useMainHooks();
  const [img, setImg] = useState(oneBlogData?.blogImage);
  useEffect(() => {}, []);
  const fileRef = useRef();
  const loading = useSelector((state) => state.Blogs.loading);

  const formik = useFormik({
    initialValues: {
      name: oneBlogData?.name,
      image: null,
    },
    enableReinitialize: true,
    // validationSchema: BlogsSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = (values) => {
    console.log(values);
    const formData = new FormData();
    formData.append("name", values.name);
    values.image != null &&
      formData.append("image", values.image);
    dispatch(editCategory({ id: id, values: formData })).then(
      (res) =>
        res.payload.code === StatuseCode.OK &&
        dispatch(getcategories({ pageSize: 10 })).then(() =>
          navigate(-1, { replace: true })
        )
    );
  };

  useEffect(() => {
    dispatch(getOneCategory(id)).then((res) => {
      setImg(res?.payload.data.image);
    });
  }, [dispatch]);

  const handleChangePhoto = async (e) => {
    await formik.setFieldValue("image", e.target.files[0]);
    await setImg(URL.createObjectURL(e.target.files[0]));
  };

  const handleFileRef = () => {
    fileRef.current.click();
  };
  const textField = [
    {
      name: "name",
      value: formik.values.name,
      isMulti: false,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: "name",
      error: !!formik.touched.name && !!formik.errors.name,
      helperText: formik.touched.name && formik.errors.name,
    },
    
  ];
  return (
    <Box m={"20px"} dir={sidebarRTL ? "rtl" : "ltr"}>
      {/* <EditButton text={t("edit")} onClick={handleClickOpen} /> */}

      <form onSubmit={formik.handleSubmit}>
        {textField.map((item, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <CustomLable name={item.name} />
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
        <DefaultButton
          fullWidth={true}
          text="edit"
          handleClick={() => handleSubmit(formik.values)}
        />
        
      )}
    </Box>
  );
};

export default EditCategory;
