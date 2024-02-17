import { Box } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import CustomSelectMenu from "../../../../components/CustomSelect/CustomSelect.jsx";
import { typesArray } from "./typesAray.js";
import CustomLable from "../../../../components/CustomLable.jsx";
import { CustomFormikTextFeild } from "../../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import { editPenalty, getPenalty } from "../../redux/allowancePenaltyTypes.js";
import { StatuseCode } from "../../../../statuseCodes.js";
import hasPermission from "../../../../utils/haspermission.js";
import { useParams } from "react-router-dom";
import useMainHooks from "../../../../hooks/useMainHooks.jsx";
import DefaultButton from "../../../../components/defaultBtn.jsx";
const EditPenalty = () => {
  const { id } = useParams();
  const { t, sidebarRTL, navigate, dispatch, isLoading, setIsLoading } =
    useMainHooks();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const checkoutSchema = yup.object().shape({
    name: yup.string().required("Required"),
  });
  let data = useSelector((state) => state.Penalty.penaltyData.data) || [];
  data = data.find((item) => item.id == id);
  console.log(data);
  const formik = useFormik({
    initialValues: {
      name: data?.name,
      type: data?.type,
    },
    validationSchema: checkoutSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  const handleFormSubmit = async (values) => {
    const formData = {
      id: data?.id,
      values: { ...values },
    };
    setIsLoading(true);
    await dispatch(editPenalty(formData))
      .then((res) => {
        console.log(res);
        if (res.payload.code === StatuseCode.OK) {
          dispatch(
            getPenalty({ pageSize: 10, currentPage: data?.currentPage })
          );
          navigate(-1, { replace: true });
          setIsLoading(false);
        }
      })
      .catch(() => setIsLoading(false));
  };

  const handleTypeChange = (value) => {
    formik.setFieldValue("type", value?.id);
  };

  return (
    <>
      <Box m="20px" dir={sidebarRTL ? "rtl" : "ltr"}>
        <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
          <Box dir={sidebarRTL ? "rtl" : "ltr"}>
            <CustomLable title="name" />
            <CustomFormikTextFeild
              fullWidth={true}
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
            defaultData={data?.type}
            onChange={handleTypeChange}
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
          {hasPermission("update-allowances_penalties_types") && (
            <Box display="flex" width="100%" justifyContent="end" mt="20px">
              <DefaultButton
                handleClick={() => handleFormSubmit(formik.values)}
                disabled={isLoading}
                fullWidth={true}
                text={"edit"}
              />
            </Box>
          )}
        </form>
      </Box>
    </>
  );
};

export default EditPenalty;
