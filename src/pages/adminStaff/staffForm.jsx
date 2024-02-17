import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import { tokens } from "../../theme";
import AddIcon from "@mui/icons-material/Add";
import DropDownRoles from "./DropDown";
import { useDispatch, useSelector } from "react-redux";
import { addAdmin, stuffData } from "../../redux/stuff";
import { useTranslation } from "react-i18next";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useSidebarContext } from "../global/sidebar/sidebarContext";

const StaffForm = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.stuff.loading);
  const { t } = useTranslation();
  const [roleID, setRoleID] = useState();
  const handleSelection = (selectedValue) => {
    setRoleID(selectedValue);
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const validationSchema = yup.object().shape({
    username: yup.string().required("Required"),
    name: yup.string().required("Required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[A-Z][a-z])/,
        "Password must contain at least one uppercase letter and least one lowercase letter"
      )
      .required("Password is required"),
    password_confirmation: yup
      .string()
      .required("Required")
      .min(8)
      .oneOf([yup.ref("password")], "Passwords must match"), // Check if password_confirmation matches the password field
  });
  const formik = useFormik({
    initialValues: {
      type: "admin_employee",
      name: "",
      username: "",
      password: "",
      password_confirmation: "",
      showPassword: false, // Add the showPassword field
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("type", values.type); // You might want to set a default type here
      formData.append("name", values.name);
      formData.append("username", values.username);
      formData.append("password", values.password);
      formData.append("password_confirmation", values.password_confirmation);
      formData.append("role", roleID);
      const info = {
        pageSize: props.pageSize,
      };
      await dispatch(addAdmin(formData))
        .then((res) => res.payload.code === 201 && handleClose())
        .then(() => {
          dispatch(stuffData(info));
        });
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm(); // Reset Formik form's state
  };

  const { sidebarRTL } = useSidebarContext();

  return (
    <Box m="20px">
      <Button
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
          display: props.show ? "inline-flex" : "none"
        }}
        variant="outlined"
        onClick={handleClickOpen}
        endIcon={<AddIcon sx={{ marginRight: sidebarRTL ? ".7rem" : "0" }} />}
      >
        {t("Add")}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontSize: "22px", fontWeight: "bold" }} align={sidebarRTL ? "right" : "left"}>
          {t("Add")}
        </DialogTitle>
        <DialogContent>
          <form dir={sidebarRTL ? "rtl" : "ltr"}
            onSubmit={formik.handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
              dir={sidebarRTL ? "rtl" : "ltr"}
            >
              <Box display="flex" flexDirection="column" sx={{gridColumn: "span 2"}}>
              <label style={{fontSize:"18px",fontWeight: "Bold"}}>{t("Username")}</label>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                placeholder={t("Username")}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.username}
                name="username"
                error={!!formik.touched.username && !!formik.errors.username}
                helperText={formik.touched.username && formik.errors.username}
                sx={{
                  gridColumn: "span 2",
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: colors.blueAccent[700],
                  },
                  "& .MuiFormLabel-root.MuiInputLabel-root.MuiInputLabel-formControl":
                  {
                    right: sidebarRTL ? "24px" : "0",
                    left: sidebarRTL ? "0" : "0",
                  },
                }}
                dir={sidebarRTL ? "rtl" : "ltr"}
                inputProps={{
                  style: { fontSize: "18px", fontWeight: "bold" }, // Adjust the font size here
                }}
              />
              </Box>
              <Box display="flex" flexDirection="column" sx={{gridColumn: "span 2"}}>
              <label style={{fontSize:"18px",fontWeight: "Bold"}}>{t("Name")}</label>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                placeholder={t("Name")}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                name="name"
                error={!!formik.touched.name && !!formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
                sx={{
                  gridColumn: "span 2",
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: colors.blueAccent[700],
                  },
                }}
                dir={sidebarRTL ? "rtl" : "ltr"}
                inputProps={{
                  style: { fontSize: "18px", fontWeight: "bold" }, // Adjust the font size here
                }}
                />
              </Box>
              <Box display="flex" flexDirection="column" sx={{gridColumn: "span 4"}}>
              <label style={{fontSize:"18px",fontWeight: "Bold"}}>{t("Password")}</label>
              <TextField
                fullWidth
                variant="outlined"
                type={formik.values.showPassword ? "text" : "password"} // Use formik's showPassword state
                placeholder={t("Password")}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                name="password"
                error={!!formik.touched.password && !!formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
                sx={{
                  gridColumn: "span 4",
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: colors.blueAccent[700],
                  },
                }}
                dir={sidebarRTL ? "rtl" : "ltr"}
                InputProps={{
                  style: { fontSize: "18px", fontWeight: "bold" }, // Adjust the font size here
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          formik.setFieldValue(
                            "showPassword",
                            !formik.values.showPassword
                          )
                        } // Toggle showPassword
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {formik.values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              </Box>

              <Box display="flex" flexDirection="column" sx={{gridColumn: "span 4"}}>
              <label style={{fontSize:"18px",fontWeight: "Bold"}}>{t("Password Confirmation")}</label>
              <TextField
                fullWidth
                variant="outlined"
                type={formik.values.showPassword ? "text" : "password"} // Use formik's showPassword state
                placeholder={t("Password Confirmation")}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password_confirmation}
                name="password_confirmation"
                error={
                  !!formik.touched.password_confirmation &&
                  !!formik.errors.password_confirmation
                }
                helperText={
                  formik.touched.password_confirmation &&
                  formik.errors.password_confirmation
                }
                sx={{
                  gridColumn: "span 4",
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: colors.blueAccent[700],
                  },
                }}
                dir={sidebarRTL ? "rtl" : "ltr"}
                InputProps={{
                  style: { fontSize: "18px", fontWeight: "bold" }, // Adjust the font size here
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          formik.setFieldValue(
                            "showPassword",
                            !formik.values.showPassword
                          )
                        } // Toggle showPassword
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {formik.values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                />
                </Box>
              <DropDownRoles onSelect={handleSelection} fullWidth />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "15px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  textAlign: "center",
                  direction: sidebarRTL ? "ltr" : "ltr"
                }}
                variant="outlined"
                endIcon={<AddIcon />}
                disabled={loading ? true : false}
              >
                {loading ? "wait..." : t("Add")}
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default StaffForm;
