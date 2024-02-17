import {
  Box,
  Button,
  Dialog,
  DialogContent,
  TextField,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import { tokens } from "../../../theme.js";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { addCar, getCarsData } from "../redux/cars.js";
import { useState } from "react";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import CustomSelectMenu from "../../../components/CustomSelect/CustomSelect.jsx";
import { useEffect } from "react";
import { getBrandsMenu } from "../../../redux/select_menus.js";
import DefaultButton from "../../../components/DefaultButton.jsx";

const AddCar = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const brands = useSelector((state) => state.selectMenu.brandsMenu.data) || [];
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { sidebarRTL } = useSidebarContext();
  const [loading, setLoading] = useState(false);
  const checkoutSchema = yup.object().shape({
    model: yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      model: "",
      brand_id: "",
    },
    validationSchema: checkoutSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };
  useEffect(() => {
    // dispatch(getFullMarkGrades());
    dispatch(getBrandsMenu());
  }, [dispatch]);
  const handleFormSubmit = async (values) => {
    setLoading(true);
    const info = {
      id: props.pageSize,
    };
    const formData = {
      ...values,
    };
    await dispatch(addCar(formData)).then((res) => {
      console.log(res);
      if (res.payload.code === 201) {
        dispatch(getCarsData(info));
        handleClose();
      }
    }).catch(()=> setLoading(false))
    setLoading(false);
  };

  const handleBrandChange = (value) => {
    formik.setFieldValue("brand_id", value?.id);
  };

  return (
    <Box m="20px">
      <Button
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
        }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        {t("Add")}
      </Button>
      <Dialog
        sx={{ width: { xs: "100%", md: "50%" }, margin: "auto", padding: "0" }}
        open={open}
        onClose={handleClose}
      >
        <DialogContent dir={sidebarRTL ? "rtl" : "ltr"}>
          <form onSubmit={formik.handleSubmit} dir={sidebarRTL ? "ltr" : "rtl"}>
            <CustomSelectMenu
              lable={"select_brand"}
              options={brands}
              onChange={handleBrandChange}
            />
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
                {t("name")}
              </label>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                placeholder={t("model")}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.model}
                name="model"
                error={!!formik.touched.model && !!formik.errors.model}
                helperText={formik.touched.model && formik.errors.model}
                dir={sidebarRTL ? "rtl" : "ltr"}
                sx={{ gridColumn: "span 10" }}
                inputProps={{
                  style: { fontSize: "18px", fontWeight: "bold" }, // Adjust the font size here
                }}
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
            ></Box>
            <Box display="flex" width="100%" justifyContent="end" mt="20px">
              <DefaultButton
                disabled={loading}
                text={loading ? t("wait") : t("Add")}
                fullWidth={true}
                type={"submit"}
              />
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AddCar;
