import { Box, Button, useTheme } from "@mui/material";
import { useFormik } from "formik";
import { useMediaQuery } from "@mui/material";
import { tokens } from "../../../theme.js";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import { CustomFormikTextFeild } from "../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import { useEffect, useState } from "react";
import { getRole } from "../../../redux/select_menus.js";
import { StatuseCode } from "../../../statuseCodes.js";
import { useNavigate } from "react-router-dom";
import CustomPassword from "../../../components/PasswordAndConfirmPassword/PassAndConfPass.jsx";
import CustomLable from "../../../components/CustomLable.jsx";
import CustomSwitch from "../../../components/CustomSwitch/CustomSwitch.jsx";
import { addAdmin, getAdminEmployee } from "../redux/adminEmployee.js";
import CustomMultiSelectMenu from "../../../components/CustomMultiSelectMenu/CustomMultiSelectMenu.jsx";
import { adminAccountSchema } from "../../../utils/ValidationSchema.js";

const AddAdmin = () => {
  const rolesMenu = useSelector((state) => state.selectMenu.roles.data) || [];
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { sidebarRTL } = useSidebarContext();
  const loading = useSelector((state) => state.visitorsCars.loading);

  useEffect(() => {
    if (!rolesMenu.length) {
      dispatch(getRole());
    }
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      is_admin_employee: 0,
    },
    enableReinitialize: true,
    validationSchema: adminAccountSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  const handleFormSubmit = async (values) => {
    const pageSize = 10;
    setIsLoading(true);
    await dispatch(addAdmin(values))
      .then((res) => {
        if (res.payload.code === StatuseCode.CREATED) {
          dispatch(getAdminEmployee({ pageSize: pageSize }));
          formik.resetForm();
          navigate(-1);
          setIsLoading(false);
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  const [isLoading, setIsLoading] = useState(false);
  const textFields = [
    {
      name: "name",
      value: formik.values.name,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("name"),
      error: !!formik.touched.name && !!formik.errors.name,
      helperText: formik.touched.name && formik.errors.name,
    },
    {
      name: "email",
      value: formik.values.email,
      handleChange: formik.handleChange,
      placeholder: t("email"),
      onBlur: formik.handleBlur,
      error: !!formik.touched.email && !!formik.errors.email,
      helperText: formik.touched.email && formik.errors.email,
    },
  ];
  const handleRoleChange = (items) => {
    const selectedIds = items.map((option) => option.id);
    formik.setFieldValue("role_id", selectedIds);
  };
  const [isAdmin, setIsAdmin] = useState(true);
  const handleSwitchChange = async (isChecked) => {
    await formik.setFieldValue("is_admin_employee", isChecked ? 1 : 0);
    await setIsAdmin(!isChecked);
  };
  return (
    <Box m="20px">
      <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
        <CustomSwitch
          fullWidth
          variant="outlined"
          type="text"
          title={t("is_admin_employee")}
          onSwitchChange={handleSwitchChange}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.is_admin_employee}
          name="is_admin_employee"
          error={
            !!formik.touched.is_admin_employee &&
            !!formik.errors.is_admin_employee
          }
          helperText={
            formik.touched.is_admin_employee && formik.errors.is_admin_employee
          }
          sx={{ gridColumn: "span 4" }}
          inputProps={{
            style: { fontSize: "18px", fontWeight: "bold" }, // Adjust the font size here
          }}
        />
        {textFields.map((item, index) => (
          <Box
            key={index}
            dir={sidebarRTL ? "rtl" : "ltr"}
            display="grid"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
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
              error={item.error}
              helperText={item.helperText}
            />
          </Box>
        ))}
        <CustomPassword
          req={true}
          name="password"
          error={!!formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <CustomPassword
          req={true}
          name="password_confirmation"
          error={
            !!formik.touched.password_confirmation &&
            !!formik.errors.password_confirmation
          }
          helperText={
            formik.touched.password_confirmation &&
            formik.errors.password_confirmation
          }
          value={formik.values.password_confirmation}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <CustomMultiSelectMenu
          disabled={isAdmin}
          lable="role"
          onChange={handleRoleChange}
          options={rolesMenu}
        />
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: "white",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            disabled={isLoading}
          >
            {isLoading ? t("wait") : t("Add")}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddAdmin;
