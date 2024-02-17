import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import { tokens } from "../../../theme.js";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import { editCars, getCarsData } from "../../car/redux/cars.js";
import { StatuseCode } from "../../../statuseCodes.js";
import CustomSelect from "../../../components/CustomSelect/CustomSelect.jsx";
import { getBrandsMenu } from "../../../redux/select_menus.js";
import CustomDialogActions from "../../../components/DialogActions/DialogActions.jsx";

const EditCar = (props) => {
  console.log(props.brand_id);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const brands = useSelector((state) => state.selectMenu.brandsMenu.data) || [];
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { sidebarRTL } = useSidebarContext();
  const loading = useSelector((state) => state.cars.loading);

  const checkoutSchema = yup.object().shape({
    model: yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      model: props.name,
      brand_id: props.brand_id,
    },
    validationSchema: checkoutSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = async () => {
    await dispatch(getBrandsMenu());
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const handleFormSubmit = async (values) => {
    const info = {
      id: props.pageSize,
    };
    const carInfo = {
      id: props.id,
      values: {
        ...values,
      },
    };
    await dispatch(editCars(carInfo)).then((res) => {
      res.payload.code === StatuseCode.OK && dispatch(getCarsData(info));
      handleClose();
    });
  };

  const handleBrandChange = (event) => {
    formik.setFieldValue("brand_id", event?.id);
  };

  return (
    <Box m="20px">
      <Button
        variant="contained"
        sx={props.sx}
        endIcon={props.icon}
        onClick={handleClickOpen}
      >
        {t("Edit")}
      </Button>
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
            <CustomDialogActions
              onClick={handleClose}
              onClickAction={handleFormSubmit}
              text="Edit"
              action={handleClose}
            />
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default EditCar;
