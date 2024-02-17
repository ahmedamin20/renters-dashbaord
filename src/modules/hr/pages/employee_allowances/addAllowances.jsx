import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import CustomSelectMenu from "../../../../components/CustomSelect/CustomSelect.jsx";
import CustomLable from "../../../../components/CustomLable.jsx";
import { CustomFormikTextFeild } from "../../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import { useRef } from "react";
import { useEffect } from "react";
import {
  getEmployeeAllowancesMenu,
  getMyManagermenu,
} from "../../../../redux/select_menus.js";
import {
  addEmployeeAllowances,
  getEmployeeAllowancesData,
} from "../../redux/employee_allowances.js";
import { StatuseCode } from "../../../../statuseCodes.js";
import Header from "../../../../components/Header.jsx";
import useMainHooks from "../../../../hooks/useMainHooks.jsx";
import DefaultButton from "../../../../components/defaultBtn.jsx";
const AddAllowances = () => {
  const EmployeePenalties = useSelector(
    (state) => state.selectMenu.EmployeeAllowances.data
  );
  const Employee = useSelector((state) => state.selectMenu.MyManagermenu.data);
  console.log("EmployeePenalties", EmployeePenalties);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { dispatch, t, sidebarRTL, navigate,isLoading,setIsLoading } = useMainHooks();
  const formik = useFormik({
    initialValues: {
      reason: "",
      amount: "",
    },
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    await dispatch(addEmployeeAllowances(values)).then((res) => {
      if (res.payload.code === StatuseCode.CREATED) {
        dispatch(getEmployeeAllowancesData({ pageSize: 10 }));
        navigate(-1, { replace: true });
        setIsLoading(false);
      }
    }).catch(()=>setIsLoading(false));
  };

  const handleEmployeePenaltiesChange = (value) => {
    formik.setFieldValue("allowance_penalty_type_id", value?.id);
  };
  const handleEmployeeChange = (value) => {
    formik.setFieldValue("employee_id", value?.id);
  };

  const employeeRef = useRef(true);
  useEffect(() => {
    dispatch(getEmployeeAllowancesMenu());
    dispatch(getMyManagermenu());
  }, [employeeRef, dispatch]);
  return (
    <Box m="20px" dir={sidebarRTL ? "rtl" : "ltr"}>
      {/* <Header title={t("add")} /> */}
      <Box display={"flex"} alignItems={sidebarRTL ? 'flex-end':'flex-start'}>
        <Header title={t("add")} />
      </Box>
      <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
        <CustomSelectMenu
          lable={"Employee"}
          options={Employee}
          onChange={handleEmployeeChange}
        />
        <CustomSelectMenu
          lable={t("allowance_type")}
          options={EmployeePenalties}
          onChange={handleEmployeePenaltiesChange}
        />
        <Box
          dir={sidebarRTL ? "rtl" : "ltr"}
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <CustomLable title="amount" />
          <CustomFormikTextFeild
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
        <Box
          dir={sidebarRTL ? "rtl" : "ltr"}
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
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
        <Box
          dir={sidebarRTL ? "rtl" : "ltr"}
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        ></Box>
        <Box display="flex" width="100%" justifyContent="end" mt="20px">
          <DefaultButton
            disabled={isLoading}
            fullWidth={true}
            text={"Add"}
            handleClick={() => handleFormSubmit(formik.values)}
          />
        </Box>
      </form>
    </Box>
  );
};

export default AddAllowances;
