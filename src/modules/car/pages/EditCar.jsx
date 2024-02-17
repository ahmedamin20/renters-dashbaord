import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import { editCars } from "../redux/cars.js";
import { StatuseCode } from "../../../statuseCodes.js";
import CustomSelect from "../../../components/CustomSelect/CustomSelect.jsx";
import { getBrandsMenu } from "../../../redux/select_menus.js";
import CustomDialogActions from "../../../components/DialogActions/DialogActions.jsx";
import { CustomFormikTextFeild } from "../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import { getCarsData } from "../redux/cars.js";
import { useEffect } from "react";
import { useRef } from "react";
import EditButton from "../../../components/editButton.jsx";

const EditCar = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.selectMenu.brandsMenu.data) || [];
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { sidebarRTL } = useSidebarContext();
  const [loading, setLoading] = useState(false);
  const checkoutSchema = yup.object().shape({
    model: yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      model: props.name,
      brand_id: props.brand_id,
    },
    validationSchema: checkoutSchema,
    enableReinitialize: true,
    onSubmit: (values) => handleFormSubmit(values),
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const handleFormSubmit = async (values) => {
    setLoading(true);
    const carInfo = {
      id: props.id,
      values: {
        ...values,
      },
    };
    await dispatch(editCars(carInfo))
      .then((res) => {
        if (res.payload.code === StatuseCode.OK) {
          dispatch(getCarsData({ pageSize: 10 }));
          handleClose();
        }
      })
      .catch(() => {
        setLoading(false);
        setOpen(true);
      });
    setLoading(false);
  };
  const menuRef = useRef(true);
  useEffect(() => {
    dispatch(getBrandsMenu());
  }, [menuRef, dispatch]);
  const handleBrandChange = (event) => {
    formik.setFieldValue("brand_id", event?.id);
  };
  const textFields = [
    {
      name: "model",
      value: formik.values.model,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("model"),
      error: !!formik.touched.model && !!formik.errors.model,
      helperText: formik.touched.model && formik.errors.model,
    },
  ];
  return (
    <Box m="20px">
      <EditButton onClick={handleClickOpen} text={"edit"} />

      <Dialog
        sx={{ width: { xs: "100%", md: "50%" }, margin: "auto", padding: "0" }}
        open={open}
        onClose={handleClose}
      >
        <DialogContent dir={sidebarRTL ? "rtl" : "ltr"}>
          <DialogTitle
            sx={{ fontWeight: "bold", fontSize: "22px" }}
            align={sidebarRTL ? "right" : "left"}
          >
            {t("Edit", " ", "model")}
          </DialogTitle>
          <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
            <Box fullWidth dir={sidebarRTL ? "rtl" : "ltr"}>
              <label
                style={{ fontSize: "18px", fontWeight: "Bold", width: "10rem" }}
              >
                {t("select_brand")}
              </label>
              <CustomSelect
                onChange={handleBrandChange}
                options={brands}
                defaultData={props.brand_id}
              />
            </Box>
            <Box
              dir={sidebarRTL ? "rtl" : "ltr"}
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <label
                style={{ fontSize: "18px", fontWeight: "Bold", width: "10rem" }}
              >
                {t("model_name")}
              </label>
              {textFields.map((item) => (
                <CustomFormikTextFeild
                  key={item.name}
                  placeholder={t(item.placeholder)}
                  onBlur={item.onBlur}
                  onChange={item.handleChange}
                  value={item.value}
                  name={item.name}
                  error={item.error}
                  helperText={item.helperText}
                />
              ))}
            </Box>
            <Box
              dir={sidebarRTL ? "rtl" : "ltr"}
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            ></Box>
            <CustomDialogActions
              disabled={loading}
              onClick={handleClose}
              onClickAction={handleFormSubmit}
              text={loading ? "loading" : "Edit"}
            />
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default EditCar;
