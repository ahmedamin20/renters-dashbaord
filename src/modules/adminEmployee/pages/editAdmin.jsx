import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { CustomFormikTextFeild } from "../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import { useEffect, useState } from "react";
import { getRole } from "../../../redux/select_menus.js";
import { StatuseCode } from "../../../statuseCodes.js";
import { useParams } from "react-router-dom";
import CustomPassword from "../../../components/PasswordAndConfirmPassword/PassAndConfPass.jsx";
import CustomLable from "../../../components/CustomLable.jsx";
import {
  editAdmin,
  getAdminEmployee,
  getOneAdmin,
} from "../redux/adminEmployee.js";
import CustomMultiSelectMenu from "../../../components/CustomMultiSelectMenu/CustomMultiSelectMenu.jsx";
import { USER_TYPES_ENUM } from "../../../enums/userTypeEnum.js";
import { adminAccountSchema } from "../../../utils/ValidationSchema.js";
import useMainHooks from "../../../hooks/useMainHooks.jsx";

const EditAdmin = () => {
  const { id } = useParams();
  const rolesMenu = useSelector((state) => state.selectMenu.roles.data) || [];
  const { t, navigate, colors, dispatch, sidebarRTL } = useMainHooks();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const loading = useSelector((state) => state.visitorsCars.loading);
  const oneAdminData = useSelector((state) => state.admin.oneAdminData.data);
  console.log(oneAdminData);
  useEffect(() => {
    dispatch(getOneAdmin(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!rolesMenu.length) {
      dispatch(getRole());
    }
  });

  const formik = useFormik({
    initialValues: {
      name: oneAdminData?.name,
      email: oneAdminData?.email,
      password: "",
      password_confirmation: "",
      role_id: oneAdminData?.rolesIds,
      is_admin_employee:
        oneAdminData?.type === USER_TYPES_ENUM.ADMIN_EMPLOYEE ? 1 : 0,
    },
    enableReinitialize: true,
    validationSchema: adminAccountSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (values) => {
    console.log(values);
    const pageSize = 10;
    const info = {
      id: id,
      values: {
        ...values,
      },
    };
    setIsLoading(true)
    await dispatch(editAdmin(info)).then((res) => {
      if (res.payload.code === StatuseCode.OK) {
        dispatch(getAdminEmployee({ pageSize: pageSize }));
        formik.resetForm();
        navigate(-1);
        setIsLoading(false)
      }
    }).catch(() => {
      setIsLoading(false);
    });
  };

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
    const selectedIds = items?.map((option) => option.id);
    formik.setFieldValue("role_id", selectedIds);
  };

  return (
    <Box m="20px">
      <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
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
          // req={ formik.values.is_admin_employee }
          name="password"
          error={!!formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <CustomPassword
          // req={ formik.values.is_admin_employee }
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
        <Box>
          {oneAdminData?.type === USER_TYPES_ENUM.ADMIN_EMPLOYEE && (
            <CustomMultiSelectMenu
              defaultData={oneAdminData?.rolesIds}
              lable="role"
              placeholder="Select an option"
              onChange={handleRoleChange}
              options={rolesMenu}
            />
          )}
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
              width: "100%",
            }}
            disabled={isLoading}
            variant="outlined"
          >
            {isLoading ? t("wait") : t("edit")}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditAdmin;
