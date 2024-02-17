import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import { CustomFormikTextFeild } from "../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import { consumedSchema } from "../../../utils/ValidationSchema.js";
import { StatuseCode } from "../../../statuseCodes.js";
import CustomSelect from "../../../components/CustomSelect/CustomSelect.jsx";
import { useNavigate, useParams } from "react-router-dom";
import CustomLable from "../../../components/CustomLable.jsx";
import { SubmitButton } from "../../../components/SubmitButton.jsx";
import { getParentUnits, getSubUnit } from "../../../redux/select_menus.js";
 import {
  OneCosnumedProduct,
  editConsumedProduct,
  getConsumedProduct,
} from "../redux/consumedProduct.js";

const EditConsumedProduct = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const oneConsumed = useSelector(
    (state) => state.consumedProducts.OneConsumedProductData.data
  );
  const [selectedMainUnit, setMainUnit] = useState(oneConsumed?.main_unit_id);
  const [selectedSubUnit, setSubUnit] = useState(oneConsumed?.sub_unit_id);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { sidebarRTL } = useSidebarContext();
  const [loading,setLoading]=useState(false)
  const parentUnitsMenu =
    useSelector((state) => state.selectMenu.ParentUnitsMenu.data) || [];
  const subUnitsMenu =
    useSelector((state) => state.selectMenu.subUnitsMenu.data) || [];
  useEffect(() => {
    dispatch(OneCosnumedProduct(id));
  }, [dispatch, id]);
  useEffect(() => {
    dispatch(getParentUnits());
  }, [dispatch, !parentUnitsMenu.length]);

  useEffect(() => {
    if (selectedMainUnit) {
      dispatch(getSubUnit(selectedMainUnit));
    }
  }, [dispatch, selectedMainUnit]);

  const formik = useFormik({
    initialValues: {
      name: oneConsumed?.name,
      main_unit_quantity: oneConsumed?.main_unit_quantity,
      sub_unit_quantity: oneConsumed?.sub_unit_quantity,
      purchase_price: oneConsumed?.sub_unit_purchase_price,
      selling_price: oneConsumed?.sub_unit_selling_price,
      main_unit_id: oneConsumed?.main_unit_id,
      sub_unit_id: oneConsumed?.sub_unit_id,
    },
    enableReinitialize: true,
    validationSchema: consumedSchema,
    onSubmit: (values) => {
      setLoading(true)
      handleFormSubmit(values);
    },
  });

  const handleFormSubmit = async (values) => {
    console.log(values);
    const pageSize = 10;
    const info = {
      id: id,
      values: {
        ...values,
      },
    };
    try {
      await dispatch(editConsumedProduct(info)).then((res) => {
        if (res.payload.code === StatuseCode.OK) {
          dispatch(getConsumedProduct({ pageSize: pageSize }));
          formik.resetForm();
          navigate(-1);
        }
      });
    } catch (error) {
      setLoading(false)
    }
    setLoading(false)

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
      name: "main_unit_quantity",
      value: formik.values.main_unit_quantity,
      handleChange: formik.handleChange,
      placeholder: t("main_unit_quantity"),
      onBlur: formik.handleBlur,
      error:
        !!formik.touched.main_unit_quantity &&
        !!formik.errors.main_unit_quantity,
      helperText:
        formik.touched.main_unit_quantity && formik.errors.main_unit_quantity,
    },
    {
      name: "sub_unit_quantity",
      value: formik.values.sub_unit_quantity,
      placeholder: t("sub_unit_quantity"),
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error:
        !!formik.touched.sub_unit_quantity && !!formik.errors.sub_unit_quantity,
      helperText:
        formik.touched.sub_unit_quantity && formik.errors.sub_unit_quantity,
    },
    {
      name: "purchase_price",
      value: formik.values.purchase_price,
      placeholder: t("purchase_price"),
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error: !!formik.touched.purchase_price && !!formik.errors.purchase_price,
      helperText: formik.touched.purchase_price && formik.errors.purchase_price,
    },
    {
      name: "selling_price",
      value: formik.values.selling_price,
      placeholder: t("selling_price"),
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error: !!formik.touched.selling_price && !!formik.errors.selling_price,
      helperText: formik.touched.selling_price && formik.errors.selling_price,
    },
  ];
  const handleMainUnitChange = async (item) => {
    await formik.setFieldValue("main_unit_id", item?.id);
    await setMainUnit(item?.id);
    // console.log(type)
  };
  const handleSubUnitChange = async (item) => {
    await formik.setFieldValue("sub_unit_id", item?.id);
    setSubUnit(item?.id);
    // console.log(type)
  };
  return  (
    <Box m="20px">
      <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
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
        <CustomSelect
          lable="select_main_unit"
          onChange={handleMainUnitChange}
          options={parentUnitsMenu}
          defaultData={oneConsumed?.main_unit_id}
        />
        <CustomSelect
          lable="select_sub_unit"
          defaultData={selectedSubUnit}
          isDisabled={!selectedMainUnit}
          onChange={handleSubUnitChange}
          options={subUnitsMenu}
        />
        <SubmitButton fullWidth={true} loading={loading} text="edit" />
      </form>
    </Box>
  ) 
};

export default EditConsumedProduct;
