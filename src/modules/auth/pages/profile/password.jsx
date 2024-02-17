import { useState } from "react";
import { useFormik } from "formik";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Button, useTheme } from "@mui/material";
import { tokens } from "../../../../theme.js";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../../pages/global/sidebar/sidebarContext.js";
import DefaultButton from "./defaultBtn.jsx";
import { addColors, getColors } from "../../../color/redux/colors.js";
import { StatuseCode } from "../../../../statuseCodes.js";
import CustomPassword from "../../../../components/PasswordAndConfirmPassword/PassAndConfPass.jsx";
import { profilePasswordSchema } from "../../../../utils/ValidationSchema.js";
import { Box } from "@mui/material";
const PasswordChange = ({ icon, pageSize }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { sidebarRTL } = useSidebarContext();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: profilePasswordSchema,
    onSubmit: async (values) => handleSubmit(values),
  });
  const handleSuccessClose = () => {
    dispatch(getColors({ pageSize }));
    setOpen(false);
    formik.resetForm();
  };
  const handleSubmit = async (values) => {
    const data = {
      name: values.name,
      code: values.code,
    };
    await dispatch(addColors(data)).then((res) => {
      res.payload.code === StatuseCode.CREATED && handleSuccessClose();
    });
  };
  const handleClickOpen = () => {
    setOpen(true);
    formik.resetForm();
  };
  const passwordFieldArray = [
    {
      name: "currentPassword",
      value: formik.values.currentPassword,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: "currentPassword",
      req: true,
      error:
        !!formik.touched.currentPassword && !!formik.errors.currentPassword,
      helperText:
        formik.touched.currentPassword && formik.errors.currentPassword,
    },
    {
      name: "newPassword",
      value: formik.values.newPassword,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: "newPassword",
      req: true,
      error: !!formik.touched.newPassword && !!formik.errors.newPassword,
      helperText: formik.touched.newPassword && formik.errors.newPassword,
    },
    {
      name: "confirmPassword",
      value: formik.values.confirmPassword,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: "confirmPassword",
      req: true,
      error:
        !!formik.touched.confirmPassword && !!formik.errors.confirmPassword,
      helperText:
        formik.touched.confirmPassword && formik.errors.confirmPassword,
    },
  ];
  return (
    <Box>
      <DefaultButton
        fullWidth={true}
        handleClick={handleClickOpen}
        text={t("Change Password")}
      />
      <Dialog
        fullWidth={true}
        sx={{ width: { xs: "100%", md: "50%" }, margin: "auto", padding: "0" }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogContent dir={sidebarRTL ? "rtl" : "ltr"}>
          {passwordFieldArray.map((item, index) => (
            <CustomPassword
              key={index}
              helperText={item.helperText}
              req={item.req}
              error={item.error}
              name={item.name}
              value={item.value}
              onBlur={item.onBlur}
              onChange={item.handleChange}
            />
          ))}
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
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 15px",
            }}
            disabled={!formik.isValid || formik.isSubmitting}
            onClick={formik.handleSubmit}
            endIcon={icon}
          >
            {t("save")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PasswordChange;
