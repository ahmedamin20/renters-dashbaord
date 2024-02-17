import { Box } from "@mui/material";
import { PropTypes } from "prop-types";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import useSelectMenu from "./../../../../../hooks/useSelectMenu";
import { getMyManagermenu } from "../../../../../redux/select_menus";
import useMainHooks from "../../../../../hooks/useMainHooks";
import DefaultButton from "./../../../../../components/defaultBtn";
import { CustomFormikTextFeild } from "./../../../../../components/CustomFormikTextFeild/customFormikTextFeild";
import CustomSelectMenu from "./../../../../../components/CustomSelect/CustomSelect";
import CustomDate from "./../../../../../components/CustomDate/CustomDate";
import {
  addEmployeePayment,
  editEmployeePayment,
  getEmployeePayment,
  oneEmployeePayment,
} from "../redux/employeePayment";
import CustomLable from "../../../../../components/CustomLable";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useMoneyTypeHook from "../../../../../hooks/useMoneyTypeHook";
import Header from "../../../../../components/Header";

const EmployeePaymentForm = () => {
  const { hrEmployeeMenu } = useSelectMenu();
  const { id } = useParams();
  let employeeData = [];
  if (id) {
    employeeData = useSelector((state) => state.employeePayment.OneEmployeePayment);
    // employeeData = employeeData?.employeePayment.find((item) => item.id == id);
  }
  const { typeIn, handleTypeChange, typeOptions } = useMoneyTypeHook(
    employeeData?.type
  );
    console.log(employeeData)
  const inUpdate = !!id;
  const { dispatch, sidebarRTL, navigate, t } = useMainHooks();
  const [monyIn, setMonyIn] = useState(employeeData?.incoming || false);
  
  const formik = useFormik({
    initialValues: {
      amount:
        employeeData?.amount?.replaceAll(",", "").split(".")[0] || null,
      employee_id: employeeData?.employee?.id || null,
      created_at: employeeData?.created_at?.split(" ")[0] || null,
      money_receiver_name: employeeData?.money_receiver_name || "",
      check_number: employeeData?.check_number || "",
      money_payer_name: employeeData?.money_payer_name || "",
      type: employeeData?.type || "",
      description: employeeData?.description || "",
    },
    enableReinitialize: id ? true : false,
    onSubmit: (values) => {
      setLoading(true);
      handleSubmit(values);
    },
  });
  useEffect(() => {
    dispatch(getMyManagermenu());
    if(id){
      dispatch(oneEmployeePayment(id))
    }
  }, [id]);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (values) => {
    setLoading(true);
    if (inUpdate) {
      console.log(values)
      dispatch(editEmployeePayment({ id, values }))
        .unwrap()
        .then(() => {
          setLoading(false);

          dispatch(getEmployeePayment(10));
          navigate(-1, { replace: true });
        })
        .catch(() => setLoading(false));
    } else {
      dispatch(addEmployeePayment(values))
        .unwrap()
        .then(() => {
          setLoading(false);
          dispatch(getEmployeePayment(10));
          navigate(-1, { replace: true });
        })
        .catch(() => setLoading(false));
    }
  };
  const [disapleCheckID, setDisapledCheckID] = useState(true);

  const options = [
    {
      id: 0,
      name: t("income"),
    },
    {
      id: 1,
      name: t("outcome"),
    },
  ];
  const textFieldsArray = [
    {
      name: "money_payer_name",
      value: formik.values.money_payer_name,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("money_payer_name"),
      error:
        !!formik.touched.money_payer_name && !!formik.errors.money_payer_name,
      helperText:
        formik.touched.money_payer_name && formik.errors.money_payer_name,
    },
    {
      name: "money_receiver_name",
      value: formik.values.money_receiver_name,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("money_receiver_name"),
      error:
        !!formik.touched.money_receiver_name &&
        !!formik.errors.money_receiver_name,
      helperText:
        formik.touched.money_receiver_name && formik.errors.money_receiver_name,
    },
    {
      name: "check_number",
      value: formik.values.check_number,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("check_number"),
      disabled: disapleCheckID,
      error: !!formik.touched.check_number && !!formik.errors.check_number,
      helperText: formik.touched.check_number && formik.errors.check_number,
    },
    {
      name: "amount",
      value: formik.values.amount,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("amount"),
      type:'number',
      error: !!formik.touched.amount && !!formik.errors.amount,
      helperText: formik.touched.amount && formik.errors.amount,
    },
    {
      name: "description",
      value: formik.values.description,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("description"),
      error: !!formik.touched.description && !!formik.errors.description,
      helperText: formik.touched.description && formik.errors.description,
    },
  ];

  return (
    <Box m={"20px"}>
      <Header title={inUpdate ? t("edit") : t("add")} />

      <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
        <CustomLable requiredString={true} title={"statusType"} />
        <CustomSelectMenu
          options={options}
          defaultData={
            inUpdate
              ? formik.values.incoming
                ? options[0].id
                : options[1].id
              : null
          }
          onChange={(e) => {
            setMonyIn(!monyIn);
            if (e) {
              formik.setFieldValue("incoming", !formik.values.incoming);
            }
          }}
        />
        <CustomSelectMenu
          required={true}
          lable="employee"
          onChange={(item) => formik.setFieldValue("employee_id", item?.id)}
          defaultData={employeeData?.employee_id}
          options={hrEmployeeMenu}
          name="employee_id"
        />
        <CustomLable requiredString={true} title={"money_type"} />
        <CustomSelectMenu
          options={typeOptions}
          defaultData={inUpdate && employeeData?.type}
          onChange={(e) => {
            console.log(e);
            if (e.id == "cash") {
              handleTypeChange(e);
              setDisapledCheckID(true);

              formik.setFieldValue("type", e.id);
            }
            if (e.id == "check") {
              handleTypeChange(e);
              setDisapledCheckID(false);

              formik.setFieldValue("type", e.id);
            }
          }}
        />
        {textFieldsArray.map((item, index) => (
          <Box key={index}>
            <CustomLable title={t(item.placeholder)} />
            <CustomFormikTextFeild
              placeholder={t(item.placeholder)}
              onBlur={item.onBlur}
              type={item.type || 'text'}
              onChange={item.handleChange}
              value={item.value}
              name={item.name}
              error={item.error}
              helperText={item.helperText}
              disabled={item.disabled}
            />
          </Box>
        ))}
        <Box sx={{ mb: "1rem" }} dir={sidebarRTL ? "rtl" : "ltr"}>
          <CustomDate
            required={true}
            title="created_at"
            value={employeeData?.created_at?.split(" ")[0]}
            name="created_at"
            key={employeeData?.created_at}
            onChange={(item) =>
              formik.setFieldValue("created_at", item?.format("YYYY-MM-DD"))
            }
          />
        </Box>
        <DefaultButton
          fullWidth={true}
          disabled={loading}
          text={!loading ? (inUpdate ? "edit" : "Add") : "Loading"}
          handleClick={formik.handleSubmit}
        />
      </form>
    </Box>
  );
};
EmployeePaymentForm.propTypes = {
  id: PropTypes.string,
  pageSize: PropTypes.number,
  date: PropTypes.string,
  employee_id: PropTypes.number,
};
export default EmployeePaymentForm;
