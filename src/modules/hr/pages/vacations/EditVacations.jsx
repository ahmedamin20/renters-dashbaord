import { Box } from "@mui/material";
import { useFormik } from "formik";
import { CustomFormikTextFeild } from "../../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import CustomLable from "../../../../components/CustomLable.jsx";
import CustomSelectMenu from "../../../../components/CustomSelect/CustomSelect.jsx";
import { types } from "./vacationsTypes.js";
import CustomDate from "../../../../components/CustomDate/CustomDate.jsx";
import { editVacations, getVacations } from "../../redux/vacations.js";
import Header from "../../../../components/Header.jsx";
import DefaultButton from "../../../../components/defaultBtn.jsx";
import useMainHooks from "../../../../hooks/useMainHooks.jsx";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EditVacation = ({ type, date, name }) => {
  const { id } = useParams();
  const { navigateBack, dispatch, t, sidebarRTL,isLoading,setIsLoading } = useMainHooks();
  const testDate = new Date("2023-11-19");
  testDate.setDate(testDate.getDate() + 1);
  let data = useSelector((state) => state.vacations.vacationsData.data) || [];
  data = data.find((item) => item.id == id);
  console.log("data", data);
  const translatedDate = testDate
    .toLocaleDateString()
    .replace("/", "-")
    .replace("/", "-");

  const formik = useFormik({
    initialValues: {
      name: data?.name,
      type: data?.type,
      vacation_date: data?.vacation_date,
    },
    enableReinitialize: true,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    dispatch(editVacations({ id: id, values: values }))
      .unwrap()
      .then(() => {
        dispatch(getVacations({ pageSize: 10 }));
        navigateBack();
        setIsLoading(false);
      }).catch(()=>setIsLoading(false));
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
  ];
  const handleDateChange = (event) => {
    formik.setFieldValue("vacation_date", event?.format("YYYY-MM-DD"));
  };
  const hanldeTypesChange = (event) => {
    formik.setFieldValue("type", event?.id);
  };
  return (
    <Box m={"20px"}>
      <Header title={t("edit")} />
      <form style={{
        marginBottom: "20px"
      }} onSubmit={formik.handleSubmit}>
        {textFields.map((item, index) => (
          <Box dir={sidebarRTL ? "rtl" : "ltr"} key={index}>
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
        <CustomSelectMenu
          lable="type"
          name="type"
          defaultData={data?.type}
          onChange={hanldeTypesChange}
          options={types}
        />
        <CustomDate
          value={data?.vacation_date.replace("-", "/").replace("-", "/")}
          title="vacation_date"
          onChange={handleDateChange}
        />
      </form>
      <DefaultButton
        fullWidth={true}
        text={"edit"}
        disabled={isLoading}
        handleClick={() => handleSubmit(formik.values)}
      />
    </Box>
  );
};

export default EditVacation;
