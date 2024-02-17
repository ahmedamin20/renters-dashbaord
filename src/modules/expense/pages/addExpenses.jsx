import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { CustomFormikTextFeild } from "../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import { ExpensesSchema } from "../../../utils/ValidationSchema.js";
import CustomSelect from "../../../components/CustomSelect/CustomSelect.jsx";
import { getExpensesMenu } from "../../../redux/select_menus.js";
import { getStoreHouses } from "../../storehouse/redux/storeHouse.js";
import { addExpenses } from "../redux/Expenses.js";
import DefaultButton from "../../../components/DefaultButton.jsx";
import useMainHooks from "../../../hooks/useMainHooks.jsx";
import { useSelector } from "react-redux";
import useMoneyTypeHook from "../../../hooks/useMoneyTypeHook.jsx";
import Header from "./../../../components/Header";
import CustomSelectMenu from "../../../components/CustomSelect/CustomSelect.jsx";
import CustomLable from "../../../components/CustomLable.jsx";
import CustomDateTime from "../../../components/CustomDateTime/CustomDateTime.jsx";

const AddExpenses = () => {
  const { sidebarRTL, t, dispatch, navigate, isLoading, setIsLoading } =
    useMainHooks();
  const expensesMenu =
    useSelector((state) => state.selectMenu.expensesMenu.data) || [];
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const loading = useSelector((state) => state.selectMenu.loading);
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      notes: "",
      money_receiver_name: "",
      check_number: "",
      money_payer_name: "",
      type: "",
      created_at:'',
    },
    validationSchema: ExpensesSchema,
    onSubmit: (values) => handleFormSubmit(values),
  });
  useEffect(() => {
    dispatch(getExpensesMenu());
  }, [dispatch]);

  const handleClose = () => {
    formik.resetForm();
  };
  const handleDateChange=(e)=>{
    console.log(e)
    formik.setFieldValue("created_at",e);
  }
  const handleFormSubmit = async (values) => {
    setIsLoading(true)
    dispatch(addExpenses(values)).then((res) => {
      console.log(res);
      if (res.payload.code == 201) {
        navigate(-1, { replace: true });
        handleClose();
        setIsLoading(false)
        dispatch(getStoreHouses({ pageSize: 10 }));
      }
    }).catch(()=>setIsLoading(false))
  };
  const setExpensesValue = (value) => {
    formik.setFieldValue("expense_type_id", value?.id);
  };

  const [disapleCheckID, setDisapledCheckID] = useState(true);

  const textFields = [
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
      name: "name",
      value: formik.values.name,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("name"),
      error: !!formik.touched.name && !!formik.errors.name,
      helperText: formik.touched.name && formik.errors.name,
    },
    {
      name: "price",
      value: formik.values.price,
      handleChange: formik.handleChange,
      placeholder: t("price"),
      onBlur: formik.handleBlur,
      error: !!formik.touched.price && !!formik.errors.price,
      helperText: formik.touched.price && formik.errors.price,
    },
    {
      name: "notes",
      value: formik.values.notes,
      handleChange: formik.handleChange,
      placeholder: t("note"),
      isMulti: true,
      onBlur: formik.handleBlur,
      error: !!formik.touched.notes && !!formik.errors.notes,
      helperText: formik.touched.notes && formik.errors.notes,
    },
   
  ];
  const { handleTypeChange, typeOptions } = useMoneyTypeHook();

  return (
    <Box m="20px">
      <Header title={t("add")} />
      <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
        <CustomSelect
          options={expensesMenu}
          lable={"TypeExpensess"}
          onChange={setExpensesValue}
        />
         <CustomLable requiredString={true} title={"date"} />
        <CustomDateTime
          defaultData={ formik.values?.created_at}
          title={"date"}
          dateType={"date"}
          onChange={handleDateChange}
        />
        <CustomLable requiredString={true} title={"money_type"} />
        <CustomSelectMenu
          options={typeOptions}
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
        {/* <CustomDate title={"date"} onChange={handleDateChange}/> */}
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
            <label
              style={{
                marginTop: "1rem",
                fontSize: "18px",
                fontWeight: "Bold",
              }}
            >
              {t(item.placeholder)}
            </label>
            <CustomFormikTextFeild
              placeholder={t(item.placeholder)}
              onBlur={item.onBlur}
              onChange={item.handleChange}
              value={item.value}
              name={item.name}
              error={item.error}
              helperText={item.helperText}
              isMulti={item.isMulti}
            />
          </Box>
        ))}
  
        <DefaultButton
          text={loading ? t("wait") : t("Add")}
          fullWidth={true}
          disabled={isLoading}
          handleClick={() => handleFormSubmit(formik.values)}
        />
      </form>
    </Box>
  );
};

export default AddExpenses;
