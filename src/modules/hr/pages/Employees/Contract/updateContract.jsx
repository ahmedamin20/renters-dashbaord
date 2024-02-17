import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, TextField } from "@mui/material";
import Header from "../../../../../components/Header.jsx";
import { useSelector } from "react-redux";
import {
  AddContract,
  editContract,
  getContractData,
} from "../../../redux/Contract.js";
import { useRef } from "react";
import CustomLable from "../../../../../components/CustomLable.jsx";
import { useFormik } from "formik";
import { CustomFormikTextFeild } from "../../../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import CustomTagInput from "../../../../../components/CustomTagInput/CustomTagInput.jsx";
import EditButton from "../../../../../components/editButton.jsx";
import CustomSelectMenu from "./../../../../../components/CustomSelect/CustomSelect";
import { workingTypesArray } from "./workingTypes.js";
import { StatuseCode } from "./../../../../../statuseCodes";
import { getEmployeesData } from "../../../redux/Employees.js";
import useMainHooks from "../../../../../hooks/useMainHooks.jsx";

const ContractUpdate = () => {
  const data = useSelector((state) => state.Contract.ContractData) || [];
  const { id } = useParams();
  const { t, dispatch, sidebarRTL, navigate } = useMainHooks();
  const contractRef = useRef(true);
  const formik = useFormik({
    initialValues: {
      national_id: data?.national_id,
      salary: data?.salary,
      working_location: data?.working_location,
      starts_at: data?.starts_at,
      ends_at: data?.ends_at,
      working_type: data?.working_type,
      employee_id: id,
    },
    enableReinitialize: true,
    onSubmit: (values) => handleSubmit(values),
  });

  useEffect(() => {
    dispatch(getContractData({ id }));
  }, [dispatch, id, contractRef]);

  const handleSubmit = (values) => {
    if (data?.shouldRenew) {
      updateContract(values);
    } else {
      addContract(values);
    }
  };

  const addContract = (values) => {
    dispatch(AddContract({ values: values, id: id })).then((res) => {
      if (res.payload.code === StatuseCode.CREATED) {
        navigate(-1, { replace: true });
        dispatch(getEmployeesData({ pageSize: 10 }));
      }
    });
  };
  const updateContract = (values) => {
    dispatch(editContract({ values: values, id: id })).then((res) => {
      {
        if (res.payload.code === StatuseCode.OK) {
          navigate(-1, { replace: true });
          dispatch(getEmployeesData({ pageSize: 10 }));
        }
      }
    });
  };

  const textFields = [
    {
      name: "national_id",
      value: formik.values.national_id,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("national_id"),
      error: !!formik.touched.national_id && !!formik.errors.national_id,
      helperText: formik.touched.national_id && formik.errors.national_id,
    },
    {
      name: "salary",
      value: formik.values.salary,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("salary"),
      error: !!formik.touched.salary && !!formik.errors.salary,
      helperText: formik.touched.salary && formik.errors.salary,
    },
    {
      name: "working_location",
      value: formik.values.working_location,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("working_location"),
      error:
        !!formik.touched.working_location && !!formik.errors.working_location,
      helperText:
        formik.touched.working_location && formik.errors.working_location,
    },
  ];
  const handleTermChange = (item) => {
    formik.setFieldValue("terms", item);
  };
  const handleDateChange = (event) => {
    formik.setFieldValue(event.currentTarget.name, event.currentTarget.value);
  };
  const handleSelect = (event) => {
    formik.setFieldValue("working_type", event?.id);
  };
  return (
    <Box m="20px">
      <Box
        flexDirection={sidebarRTL ? "row-reverse" : "row"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("contract")} />
      </Box>
      <form onSubmit={formik.handleSubmit}>
        {textFields.map((item, index) => (
          <Box key={index} sx={{ margin: "2rem 0" }}>
            <label
              style={{ fontWeight: "bold", fontSize: "16px", margin: ".5rem" }}
            >
              {t(item.name)}
            </label>
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

        <Box>
          <>
            <CustomLable title="starts_at" />
            <TextField
              dir={sidebarRTL ? "rtl" : "ltr"}
              type="date"
              fullWidth
              onChange={handleDateChange}
              name="starts_at"
              value={formik.values.starts_at}
            />
          </>
          <>
            <CustomLable title="ends_at" />
            <TextField
              onChange={handleDateChange}
              name="ends_at"
              type="date"
              fullWidth
              value={formik.values.ends_at}
            />
          </>
          <CustomSelectMenu
            lable="working_type"
            options={workingTypesArray}
            onChange={handleSelect}
            name={"working_type"}
            defaultData={formik.values.working_type}
          />
          <CustomTagInput
            onChange={handleTermChange}
            defaultData={data?.terms}
            title="terms"
          />
        </Box>
        <Box
          fullWidth={true}
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "45%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <EditButton
              fullWidth={true}
              onClick={formik.handleSubmit}
              disabled={!data?.shouldRenew}
              text="update"
            />
          </Box>
          <Box
            sx={{
              width: "45%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            
            <EditButton
              fullWidth={true}
              onClick={formik.handleSubmit}
              disabled={!!Object.keys(data).length}
              text="Add"
            />
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default ContractUpdate;
