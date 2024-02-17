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
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch } from "react-redux";
import DropDownRolesEdit from "./DropDownEdit";
import { editAdmin, stuffData } from "../../redux/stuff";
import { useTranslation } from "react-i18next";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useSidebarContext } from "../global/sidebar/sidebarContext";

const StaffEdit = (props) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  let [roleID, setRoleID] = useState();
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
      ),
    password_confirmation: yup
      .string()
      .min(8)
      .oneOf([yup.ref("password")], "Passwords must match"), // Check if password_confirmation matches the password field
  });
  const formik = useFormik({
    initialValues: {
      type: "admin_employee",
      name: props.name,
      username: props.userName,
      password: "",
      password_confirmation: "",
      showPassword: false, // Add the showPassword field
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleClose = async () => {
    setOpen(false);
    formik.resetForm(); // Reset Formik form's state
  };

  const handleSubmit = async (values) => {
    try {
      const ID = props.ID;
      const info = {
        ID,
        values: {
          ...values, // Spread the existing values
          type: "admin_employee", // Add the type property
        },
      };
      let dataInfo = {
        pageSize: props.pageSize,
      };
      dispatch(editAdmin(info))
        .then((res) => res.payload.code === 200 && handleClose())
        .then(() => dispatch(stuffData(dataInfo)));
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };
  const handleClickOpen = async () => {
    setOpen(true);
  };

  const { sidebarRTL } = useSidebarContext();

  return (
    <Box m="20px">
      <Button
        variant="contained"
        sx={props.sx}
        endIcon={props.icon}
        onClick={handleClickOpen}
      >
        {t("Edit")}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontSize: "22px", fontWeight: "bold" }} align={sidebarRTL ? "right" : "left"}>
          {t("Edit")}
        </DialogTitle>
        <DialogContent>
          <form dir={sidebarRTL ? "rtl" : "ltr"} onSubmit={formik.handleSubmit}>
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
              <DropDownRolesEdit oldRole={props.oldRole} formik={formik} onSelect={handleSelection} />{" "}
              {/* Pass formik prop */}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  direction: "ltr"
                }}
                variant="outlined"
                endIcon={<SaveIcon />}
              >
                {t("Save")}
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default StaffEdit;
