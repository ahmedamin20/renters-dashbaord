import { Box } from "@mui/material";
import useMainHooks from "../../../hooks/useMainHooks";
import { useFormik } from "formik";
import { CustomFormikTextFeild } from "../../../components/CustomFormikTextFeild/customFormikTextFeild";
import DefaultButton from "../../../components/defaultBtn";
import { useState } from "react";
import CustomLable from "../../../components/CustomLable";
import { addSafe, editSafe, getBudget, getSafe } from "../redux/safe-slice";
import CustomSelectMenu from "./../../../components/CustomSelect/CustomSelect";
import useMoneyTypeHook from "../../../hooks/useMoneyTypeHook";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const SafeForm = () => {
  const { id } = useParams();
  let safeData = [];
  const [isLoading, setIsLoading] = useState(false)
  safeData = useSelector((state) => state.safeSlice);
  if (id) {
    safeData = safeData?.safeData?.data?.find((item) => item.id == id);
  }
  console.log(safeData)

  const inUpdate = !!id;
  const { typeIn, handleTypeChange, typeOptions } = useMoneyTypeHook(
    safeData?.type
  );
  const { dispatch, sidebarRTL, t, navigate } = useMainHooks();
  const [monyIn, setMonyIn] = useState(safeData?.incoming || false);
  const formik = useFormik({
    initialValues: {
      amount: safeData?.amount || '',
      description: safeData?.description || "",
      incoming: safeData?.incoming,
      money_receiver_name: safeData?.money_receiver_name || "",
      check_number: safeData?.check_number || "",
      money_payer_name: safeData?.money_payer_name || "",
      type: safeData?.type || "",
    },
    enableReinitialize: inUpdate,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = (values) => {
    setIsLoading(true)

    values = { ...values, amount: Number(values?.amount.replaceAll(',', '')) };
    if (values.type == "cash") {
      values.check_number = "";
    }
    if (inUpdate) {
      dispatch(editSafe({ id, values }))
        .unwrap()
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            navigate(-1, { replace: true });
            dispatch(getBudget());
            dispatch(getSafe(10));
            setMonyIn(false);
            setIsLoading(false)
          }
        }).catch(() => setIsLoading(false));
    } else {
      dispatch(addSafe(values))
        .unwrap()
        .then((res) => {
          if (res.code == 201) {
            navigate(-1, { replace: true });
            setIsLoading(false)

            dispatch(getBudget());
            dispatch(getSafe(10));
            setMonyIn(false);
          }
        }).catch(() => setIsLoading(false));
    }
  };

  const options = [
    {
      id: 'Income',
      name: t("income"),
    },
    {
      id: 'Outcome',
      name: t("outcome"),
    },
  ];

  const [disapleCheckID, setDisapledCheckID] = useState(true);
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
      error: !!formik.touched.amount && !!formik.errors.amount,
      helperText: formik.touched.amount && formik.errors.amount,
    },
    {
      name: "description",
      value: formik.values.description,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      isMulti: true,
      placeholder: t("description"),
      error: !!formik.touched.description && !!formik.errors.description,
      helperText: formik.touched.description && formik.errors.description,
    },
  ];
  return (
    <Box m={"20px"}>
      <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
        <Box sx={{ mb: "1rem" }} dir={sidebarRTL ? "rtl" : "ltr"}>
          <CustomSelectMenu
            required={true}
            lable={"statusType"}
            options={options}
            defaultData={
              inUpdate
                ? formik.values.incoming
                  ? options[0].id
                  : options[1].id
                : null
            }
            onChange={(e) => {
              console.log(e)
              setMonyIn(e.id == 'Income' ? true : false);
              if (e) {
                console.log(e)
                formik.setFieldValue("incoming", e.id == 'Income' ? true : false);
              }
            }}
          />
          <CustomSelectMenu
            required={true}
            lable={"money_type"}
            options={typeOptions}
            defaultData={inUpdate && typeIn}
            onChange={(e) => {
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
                onChange={item.handleChange}
                value={item.value}
                name={item.name}
                error={item.error}
                helperText={item.helperText}
                disabled={item.disabled}
                isMulti={item.isMulti}
              />
            </Box>
          ))}
        </Box>
        <DefaultButton
          disabled={isLoading}
          fullWidth={true}
          handleClick={formik.handleSubmit}
          text={id ? t("edit") : t("add")}
          type="submit"
        />
      </form>
    </Box>
  );
};

export default SafeForm;
