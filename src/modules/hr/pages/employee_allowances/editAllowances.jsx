import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import CustomSelectMenu from "../../../../components/CustomSelect/CustomSelect.jsx";
import CustomLable from "../../../../components/CustomLable.jsx";
import { CustomFormikTextFeild } from "../../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import {
  editEmployeeAllowances,
  getEmployeeAllowancesData,
} from "../../redux/employee_allowances.js";
import { StatuseCode } from "../../../../statuseCodes.js";
import useMainHooks from "../../../../hooks/useMainHooks.jsx";
import DefaultButton from "../../../../components/defaultBtn.jsx";
import { useParams } from "react-router-dom";
import Header from "../../../../components/Header.jsx";
import { useEffect } from "react";
import { getMyManagermenu } from "../../../../redux/select_menus.js";

const EditAllowances = () => {
  const { id } = useParams();
  let data =
    useSelector(
      (state) => state.employeeAllowances.getemployeeAllowancesData.data
    ) || [];
  data = data.find((item) => item.id == id);
  const EmployeeAllowancesSelectMenu = useSelector(
    (state) => state.selectMenu.EmployeeAllowances.data
  );
  useEffect(() => {
    getMyManagermenu();
    getEmployeeAllowancesData();
  }, [id]);
  const Employee = useSelector((state) => state.selectMenu.MyManagermenu.data);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { navigate, t, dispatch, sidebarRTL, isLoading, setIsLoading } =
    useMainHooks();
  console.log(data);
  const formik = useFormik({
    initialValues: {
      reason: data?.reason,
      amount: data?.amount,
      employee_id: data?.employee?.user?.id,
      allowance_penalty_type_id: data?.allowancePenaltyType?.id,
    },
    // validationSchema: checkoutSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    await dispatch(editEmployeeAllowances({ values: values, id: id }))
      .then((res) => {
        if (res.payload.code === StatuseCode.OK) {
          dispatch(getEmployeeAllowancesData({ pageSize: 10 }));
          navigate(-1, { replace: true });
          setIsLoading(false);
        }
      })
      .catch(() => setIsLoading(false));
  };

  const handleEmployeePenaltiesChange = (value) => {
    formik.setFieldValue("allowance_penalty_type_id", value?.id);
  };
  const handleEmployeeChange = (value) => {
    formik.setFieldValue("employee_id", value?.id);
  };
  console.log(data);
  return (
    <Box m="20px" dir={sidebarRTL ? "rtl" : "ltr"}>
      <Box display={"flex"} alignItems={sidebarRTL ? 'flex-end':'flex-start'}>
        <Header title={t("edit")} />
      </Box>
      <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
        <CustomSelectMenu
          defaultData={data?.employee?.user?.id}
          lable={"Employee"}
          options={Employee}
          onChange={handleEmployeeChange}
        />
        <CustomSelectMenu
          defaultData={data?.allowancePenaltyType?.id}
          lable={t("allowance_type")}
          options={EmployeeAllowancesSelectMenu}
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
            fullWidth={true}
            disabled={isLoading}
            text={"edit"}
            handleClick={() => handleFormSubmit(formik.values)}
          />
        </Box>
      </form>
    </Box>
  );
};

export default EditAllowances;
