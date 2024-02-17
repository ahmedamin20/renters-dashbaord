import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import DefaultButton from "../../../components/defaultBtn.jsx";
import { useFormik } from "formik";
import { CustomFormikTextFeild } from "../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import CustomLable from "../../../components/CustomLable.jsx";
import { StatuseCode } from "../../../statuseCodes.js";
import CustomLoader from "../../../components/CustomLoader/CustomLoader.jsx";
import { sectionsSchema } from "../../../utils/ValidationSchema.js";
import { addSection, getSections } from "../redux/sections.js";
import useMainHooks from "../../../hooks/useMainHooks.jsx";

const AddBlog = () => {
  const { sidebarRTL, t, dispatch, colors, isLoading, setIsLoading } =
    useMainHooks();
  const [open, setOpen] = useState(false);
  const loading = useSelector((state) => state.Blogs.loading);
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    enableReinitialize: true,
    validationSchema: sectionsSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = (values) => {
    setIsLoading(true)
    dispatch(addSection(values)).then((res) => {
      if (res.payload.code === StatuseCode.CREATED) {
        dispatch(getSections({ pageSize: 10 }));
        setOpen(false);
        setIsLoading(false)
      } else {
        setOpen(true);
      }
      setIsLoading(false)
    }).catch(()=>setIsLoading(false))
  };

  const handleClickOpen = () => {
    setOpen(true);
    setIsLoading(false)
    formik.resetForm();
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
  ];
  return (
    <Box dir={sidebarRTL ? "rtl" : "ltr"}>
      <DefaultButton handleClick={handleClickOpen} text={t("Add")} />
      <Dialog
        fullWidth={true}
        sx={{ width: { xs: "100%", md: "50%" }, margin: "auto", padding: "0" }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogContent dir={sidebarRTL ? "rtl" : "ltr"}>
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
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => setOpen(false)}
          >
            {t("Cancel")}
          </Button>
          {loading ? (
            <CustomLoader />
          ) : (
            <Button
              type="submit"
              onClick={formik.handleSubmit}
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 15px",
              }}
              disabled={isLoading}
            >
              {isLoading ? t("loading") : t("Add")}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddBlog;
