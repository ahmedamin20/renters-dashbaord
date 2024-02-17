import { Box } from "@mui/material";
import DefaultButton from "../../../../components/defaultBtn.jsx";
import { useFormik } from "formik";
import { CustomFormikTextFeild } from "../../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import CustomLable from "../../../../components/CustomLable.jsx";
import CustomSelectMenu from "../../../../components/CustomSelect/CustomSelect.jsx";
import { types } from "./vacationsTypes.js";
import CustomDate from "../../../../components/CustomDate/CustomDate.jsx";
import { addVacations, getVacations } from "../../redux/vacations.js";
import useMainHooks from "../../../../hooks/useMainHooks.jsx";

const AddVacation = () => {
  const {navigateBack,t,sidebarRTL,dispatch,isLoading,setIsLoading} = useMainHooks()
  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      vacation_date: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    dispatch(addVacations(values))
      .unwrap()
      .then((res) => {
        console.log(res)
        if(res.code==201){
          setIsLoading(false)
          dispatch(getVacations({ pageSize: 10 }));
          navigateBack();
        }
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
      <form style={{
        marginBottom:"20px"
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
          onChange={hanldeTypesChange}
          options={types}
        />
        <CustomDate title="vacation_date" onChange={handleDateChange} />
      </form>

      <DefaultButton
        fullWidth={true}
        disabled={isLoading}
        text="Add"
        handleClick={() => handleSubmit(formik.values)}
      />
    
    </Box>
  );
};

export default AddVacation;
