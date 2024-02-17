import { Box, useTheme } from "@mui/material";
import { useFormik } from "formik";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux"; 
import CustomSelectMenu from "../../../../components/CustomSelect/CustomSelect.jsx";
import CustomLable from "../../../../components/CustomLable.jsx";
import { CustomFormikTextFeild } from "../../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import { penaltiesTypesArray } from "./PenaltiestypesArray.js";
import {
  editEmployeePenalties,
  getEmployeePenaltiesData,
} from "../../redux/EmployeePenalties.js";
import hasPermission from "../../../../utils/haspermission.js";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DefaultButton from "../../../../components/defaultBtn.jsx";
import useMainHooks from "../../../../hooks/useMainHooks.jsx";
const EditEmployeesPenalties = () => {
  const EmployeePenalties = useSelector(
    (state) => state.selectMenu.EmployeePenalties.data
  );
  const { id } = useParams();
  const data =
    useSelector((state) => state.employeePenalties.employeePenalties.data) ||
    [];
  const editedData = data.find((item) => item.id == id);
  const Employee = useSelector((state) => state.selectMenu.MyManagermenu.data);
  const { t, dispatch, sidebarRTL, isLoading, setIsLoading } = useMainHooks();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const formik = useFormik({
    initialValues: {
      reason: editedData?.reason,
      amount: editedData?.amount,
      employee_id: editedData?.employee.user.id,
      allowance_penalty_type_id: editedData?.allowancePenaltyType.id,
      type: editedData?.type,
    },

    // validationSchema: checkoutSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
    enableReinitialize: true,
  });
  const navigate = useNavigate();
  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    await dispatch(editEmployeePenalties({ values: values, id: id })).then(
      (res) => {
        if (res.payload.code == 201) {
          dispatch(getEmployeePenaltiesData({ pageSize: 10 }));
          navigate(-1, { replace: true });
          setIsLoading(false);
        }
      }
    ).catch(()=>setIsLoading(false));
  };

  const handleEmployeePenaltiesChange = (value) => {
    formik.setFieldValue("allowance_penalty_type_id", value?.id);
  };
  const handleEmployeeChange = (value) => {
    formik.setFieldValue("employee_id", value?.id);
  };

  const handlePenaltiesTypesChange = (value) => {
    formik.setFieldValue("type", value?.id);
  };
  return (
    <Box m="20px" dir={sidebarRTL ? "rtl" : "ltr"}>
      <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
        <CustomSelectMenu
          lable={"Employee"}
          options={Employee}
          onChange={handleEmployeeChange}
          defaultData={editedData?.employee.user.id}
        />
        <CustomSelectMenu
          lable={t("penalty_type")}
          options={EmployeePenalties}
          onChange={handleEmployeePenaltiesChange}
          defaultData={editedData?.allowancePenaltyType.id}
        />
        <Box dir={sidebarRTL ? "rtl" : "ltr"}>
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

        <Box dir={sidebarRTL ? "rtl" : "ltr"}>
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
          defaultData={editedData?.type}
        />
        <Box
          dir={sidebarRTL ? "rtl" : "ltr"}
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        ></Box>
        {hasPermission("update-employees_penalties") && (
          <Box display="flex" width="100%" justifyContent="end" mt="20px">
            <DefaultButton
              fullWidth={true}
              text={"edit"}
              disabled={isLoading}
              handleClick={() => handleFormSubmit(formik.values)}
            />
            {/* <Button
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
            >
              
            </Button> */}
          </Box>
        )}
      </form>
    </Box>
  );
};

export default EditEmployeesPenalties;
