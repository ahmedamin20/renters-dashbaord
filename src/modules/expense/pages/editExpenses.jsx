import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CustomFormikTextFeild } from "../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import { getExpensesMenu } from "../../../redux/select_menus.js";
import { getStoreHouses } from "../../storehouse/redux/storeHouse.js";
import { OneExpenses, addExpenses, editExpenses, getExpenses } from "../redux/Expenses.js";
import { useParams } from "react-router-dom";
import useMainHooks from "../../../hooks/useMainHooks.jsx";
import CustomSelectMenu from "../../../components/CustomSelect/CustomSelect.jsx";
import CustomLable from "../../../components/CustomLable.jsx";
import DefaultButton from "../../../components/DefaultButton.jsx";
import useMoneyTypeHook from "../../../hooks/useMoneyTypeHook.jsx";
import CustomDateTime from "../../../components/CustomDateTime/CustomDateTime.jsx";

const EditExpenses = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { sidebarRTL, t, dispatch, navigate, isLoading, setIsLoading } =
    useMainHooks();
  const { id } = useParams();
  useEffect(() => {
    dispatch(OneExpenses(id));
    dispatch(getExpensesMenu());
  }, [dispatch, id]);
  const handleDateChange = (e) => {
    console.log(e);
    formik.setFieldValue("created_at", e?.replace("T", " "));
  };
  const expensesMenu =
    useSelector((state) => state.selectMenu.expensesMenu.data) || [];
  const oneExpenses =
    useSelector((state) => state.Expenses.OneExpensesData.data) || [];
  const [disapleCheckID, setDisapledCheckID] = useState(true);
  const formik = useFormik({
    initialValues: {
      name: oneExpenses.name,
      price: oneExpenses.price,
      notes: oneExpenses?.notes,
      type: oneExpenses?.type,
      expense_type_id: oneExpenses?.expense_type?.id,
      money_payer_name: oneExpenses?.money_payer_name,
      money_receiver_name: oneExpenses?.money_receiver_name,
      created_at: oneExpenses?.created_at || "",
    },

    enableReinitialize: true,
    // validationSchema: ExpensesSchema,
    onSubmit: (values) => handleFormSubmit(values),
  });

  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    dispatch(editExpenses({id,values}))
      .then((res) => {
        console.log(res);
        if (res.payload.code == 200) {
          setIsLoading(false);
          dispatch(getExpenses({ pageSize: 10 }));
          navigate(-1, { replace: true });
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  const setExpensesValue = (value) => {
    formik.setFieldValue("expense_type_id", value?.id);
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
  ];

  const { handleTypeChange, typeOptions } = useMoneyTypeHook();

  return (
    <Box m="20px">
      <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
        <CustomLable requiredString={true} title={"money_type"} />
        <CustomSelectMenu
          options={typeOptions}
          defaultData={oneExpenses?.type}
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

        <CustomLable requiredString={true} title={"date"} />
        <CustomDateTime
          defaultData={formik.values?.created_at}
          title={"date"}
          dateType={"date"}
          onChange={handleDateChange}
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
            />
          </Box>
        ))}
        <CustomLable title={t("TypeExpensess")} />
        <CustomSelectMenu
          defaultData={oneExpenses?.expense_type?.id}
          options={expensesMenu}
          onChange={setExpensesValue}
        />
        {/* // TODO :: vistorCar , car fix */}
        <DefaultButton
          text={isLoading ? t("wait") : t("Edit")}
          type="submit"
          disabled={isLoading}
          fullWidth={true}
          handleClick={handleFormSubmit}
        />
      </form>
    </Box>
  );
};

export default EditExpenses;
