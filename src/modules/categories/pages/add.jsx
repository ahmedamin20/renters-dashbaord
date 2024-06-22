import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CustomFormikTextFeild } from "../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import CustomLable from "../../../components/CustomLable.jsx";
import CustomLoader from "../../../components/CustomLoader/CustomLoader.jsx";
import DefaultButton from "../../../components/defaultBtn.jsx";
import useMainHooks from "../../../hooks/useMainHooks.jsx";
import { StatuseCode } from "../../../statuseCodes.js";
import { addCategory, getcategories } from "../redux/categories.js";

const AddCatgory = () => {
  const {dispatch,sidebarRTL,navigate} = useMainHooks();
  const [img, setImg] = useState("/assets/mainImg.png");
  const fileRef = useRef();
  const loading = useSelector((state) => state.categories.loading);
  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
    },
    enableReinitialize: true,
    // validationSchema: BlogsSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("image", values.image);
    dispatch(addCategory(formData)).then((res) =>
    {
      res.payload.code === StatuseCode.CREATED
      && dispatch(getcategories({ pageSize: 10 })).then(() => navigate(-1, { replace: true }))
    }
    );
  };

  

  const handleChangePhoto = async (e) => {
    console.log(e.target.files[0]);
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
      placeholder: "Name",
      error: !!formik.touched.name && !!formik.errors.name,
      helperText: formik.touched.name && formik.errors.name,
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

export default AddCatgory;
