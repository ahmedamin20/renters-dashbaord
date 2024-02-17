import { Box } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";

import CustomSelectMenu from "../../../../components/CustomSelect/CustomSelect.jsx";
import { typesArray } from "./typesAray.js";
import CustomLable from "../../../../components/CustomLable.jsx";
import { CustomFormikTextFeild } from "../../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import { addPenalty, getPenalty } from "../../redux/allowancePenaltyTypes.js";
import { StatuseCode } from "../../../../statuseCodes.js";
import DefaultButton from "../../../../components/defaultBtn.jsx";
import useMainHooks from "../../../../hooks/useMainHooks.jsx";

const AddPenalty = () => {
  const { navigate, t, sidebarRTL, dispatch, isLoading, setIsLoading } =
    useMainHooks();
  const checkoutSchema = yup.object().shape({
    name: yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
    },
    validationSchema: checkoutSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  const handleFormSubmit = async (values) => {
    console.log(values);
    const formData = {
      ...values,
    };
    setIsLoading(true);
    await dispatch(addPenalty(formData)).then((res) => {
      if (res.payload.code === StatuseCode.CREATED) {
        dispatch(getPenalty({ pageSize: 10 }));
        navigate(-1, { replace: true });
        setIsLoading(false);
      }
    }).catch(()=>setIsLoading(false));
  };

  const handleTypeChange = (value) => {
    formik.setFieldValue("type", value?.id);
  };

  return (
    <Box m="20px" dir={sidebarRTL ? "rtl" : "ltr"}>
      <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
        <Box dir={sidebarRTL ? "rtl" : "ltr"}>
          <CustomLable title="name" />
          <CustomFormikTextFeild
            fullWidth
            variant="outlined"
            type="text"
            placeholder={t("name")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            name="name"
            error={!!formik.touched.name && !!formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Box>
        <CustomSelectMenu
          lable={"select_type"}
          options={typesArray}
          onChange={handleTypeChange}
        />
        <Box display="flex" width="100%" justifyContent="end" mt="20px">
          <DefaultButton
            fullWidth={true}
            disabled={isLoading}
            text={"Add"}
            handleClick={() => handleFormSubmit(formik.values)}
          />
        </Box>
      </form>
    </Box>
  );
};

export default AddPenalty;
