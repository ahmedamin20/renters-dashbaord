import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import { CustomFormikTextFeild } from "../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import { addStoreHouseSchema } from "../../../utils/ValidationSchema.js";
import CustomSelect from "../../../components/CustomSelect/CustomSelect.jsx";
import {
  getEmployeesMenu,
  getGaragesMenu,
} from "../../../redux/select_menus.js";
import { addStoreHouse, getStoreHouses } from "../redux/storeHouse.js";
import { StatuseCode } from "../../../statuseCodes.js";
import { useNavigate } from "react-router-dom";
import DefaultButton from "../../../components/defaultBtn.jsx";

const AddStoreHouse = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employeesMenu =
    useSelector((state) => state.selectMenu.employeesMenu.data) || [];
  const garagesMenu =
    useSelector((state) => state.selectMenu.garagesMenu.data) || [];
  console.log(garagesMenu);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { sidebarRTL } = useSidebarContext();

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      address: "",
    },
    validationSchema: addStoreHouseSchema,
    onSubmit: (values) => handleFormSubmit(values),
  });

  const menuRef = useRef(true);

  useEffect(() => {
    dispatch(getEmployeesMenu());
    dispatch(getGaragesMenu());
  }, [dispatch, menuRef]);

  const handleFormSubmit = async (values) => {
    setLoading(true);
    dispatch(addStoreHouse(values)).then(
      (res) =>{
    setLoading(false)

        res.payload.code === StatuseCode.CREATED &&
        dispatch(getStoreHouses({ pageSize: props.pageSize })).then(() =>{

          navigate(-1, { replace: true })}
        )}
    );
  };

  const setManagerValue = (value) => {
    formik.setFieldValue("manager_id", value?.id);
  };
  const setGarageValue = (value) => {
    formik.setFieldValue("garage_id", value?.id);
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
      name: "phone",
      value: formik.values.phone,
      handleChange: formik.handleChange,
      placeholder: t("phone"),
      onBlur: formik.handleBlur,
      error: !!formik.touched.phone && !!formik.errors.phone,
      helperText: formik.touched.phone && formik.errors.phone,
    },
    {
      name: "address",
      value: formik.values.address,
      placeholder: t("address"),
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error: !!formik.touched.address && !!formik.errors.address,
      helperText: formik.touched.address && formik.errors.address,
    },
  ];
  const [loading, setLoading] = useState(false);
  return (
    <Box m="20px">
      <Box dir={sidebarRTL ? "rtl" : "ltr"}>
        <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
          {textFields.map((item, index) => (
            <Box
              key={index}
              dir={sidebarRTL ? "rtl" : "ltr"}
              display="grid"
              gap="30px"
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
          <CustomSelect
            lable={"select_garage"}
            options={garagesMenu}
            onChange={setGarageValue}
          />
          <CustomSelect
            lable={"select_manager"}
            options={employeesMenu}
            onChange={setManagerValue}
          />
          <DefaultButton
            disabled={loading}
            fullWidth={true}
            text={loading ? "loading" : "add"}
            handleClick={formik.handleSubmit}
          />
        </form>
      </Box>
    </Box>
  );
};

export default AddStoreHouse;
