import { Box, Button, useTheme } from "@mui/material";
import { useFormik } from "formik";
import { tokens } from "../../../../theme.js";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useSidebarContext } from "../../../../pages/global/sidebar/sidebarContext.js";
import CustomSelectMenu from "../../../../components/CustomSelect/CustomSelect.jsx";
import CustomLable from "../../../../components/CustomLable.jsx";
import { CustomFormikTextFeild } from "../../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import { penaltiesTypesArray } from "./PenaltiestypesArray.js";
import {
  addEmployeePenalties,
  getEmployeePenaltiesData,
} from "../../redux/EmployeePenalties.js";
import { StatuseCode } from "../../../../statuseCodes.js";

import { useNavigate } from "react-router-dom";
const AddEmployeesPenalties = () => {
  const EmployeePenalties = useSelector(
    (state) => state.selectMenu.EmployeePenalties.data
  );
  const Employee = useSelector((state) => state.selectMenu.MyManagermenu.data);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { sidebarRTL } = useSidebarContext();
  const loading = useSelector((state) => state.employeePenalties.loading);
  const [disableAmount, setDisableAmount] = useState(false);

  const formik = useFormik({
    initialValues: {
      reason: "",
      amount: "",
    },
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    navigate(-1, { replace: true });
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const handleFormSubmit = async (values) => {
    await dispatch(addEmployeePenalties(values)).then((res) => {
      if (res.payload.code === StatuseCode.CREATED) {
        dispatch(getEmployeePenaltiesData({ pageSize: 10 }));
        handleClose();
      }
    });
  };

  const handleEmployeePenaltiesChange = (value) => {
    formik.setFieldValue("allowance_penalty_type_id", value?.id);
  };
  const handleEmployeeChange = (value) => {
    formik.setFieldValue("employee_id", value?.id);
  };

  const handlePenaltiesTypesChange = (value) => {
    formik.setFieldValue("type", value?.id);
    setDisableAmount(value?.id === "warning");
  };
  return (
    <Box m="20px">
      <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
        <CustomSelectMenu
          lable={"Employee"}
          options={Employee}
          onChange={handleEmployeeChange}
        />
        <CustomSelectMenu
          lable={"penalty_type"}
          options={EmployeePenalties}
          onChange={handleEmployeePenaltiesChange}
        />
        <Box dir={sidebarRTL ? "rtl" : "ltr"} display="grid" gap="30px">
          <CustomLable title="amount" />
          <CustomFormikTextFeild
            disabled={disableAmount}
            fullWidth
            variant="outlined"
            type="text"
            placeholder={t("amount")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.amount}
            name="amount"
            error={!!formik.touched.amount && !!formik.errors.amount}
            helperText={formik.touched.amount && formik.errors.amount}
          />
        </Box>

        <Box dir={sidebarRTL ? "rtl" : "ltr"} display="grid" gap="30px">
          <CustomLable title="reason" />
          <CustomFormikTextFeild
            fullWidth
            variant="outlined"
            type="text"
            placeholder={t("reason")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.reason}
            name="reason"
            error={!!formik.touched.reason && !!formik.errors.reason}
            helperText={formik.touched.reason && formik.errors.reason}
          />
        </Box>
        <CustomSelectMenu
          lable={t("penalty_type")}
          options={penaltiesTypesArray}
          onChange={handlePenaltiesTypesChange}
        />
        <Box dir={sidebarRTL ? "rtl" : "ltr"} gap="30px"></Box>
        <Box display="flex" width="100%" justifyContent="end" mt="20px">
          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{
              backgroundColor: colors.blueAccent[700],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            disabled={loading}
            onClick={handleClickOpen}
          >
            {loading ? t("wait") : t("Add")}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddEmployeesPenalties;
