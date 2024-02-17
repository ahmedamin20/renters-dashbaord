import {
  Box,
  Button,
  Dialog,
  DialogContent,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { useMediaQuery } from "@mui/material";
import { tokens } from "../../../theme.js";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import { CustomFormikTextFeild } from "../../../components/CustomFormikTextFeild/customFormikTextFeild.jsx";
import { DamagedMaterialsSchema } from "../../../utils/ValidationSchema.js";
import CustomSelect from "../../../components/CustomSelect/CustomSelect.jsx";
import {
  getStoreHousesMenu,
  getStoreHousesProductMenu,
} from "../../../redux/select_menus.js";
import CustomDialogActions from "../../../components/DialogActions/DialogActions.jsx";
import { StatuseCode } from "../../../statuseCodes.js";
import {
  addDamagedMaterials,
  getDamagedMaterials,
} from "../redux/DamagedMaterials.js";

const AddDamagedMaterials = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const storeHouseMenu =
    useSelector((state) => state.selectMenu.storeHouseMenu?.data) || [];
  console.log("storeHouseMenu", storeHouseMenu);
  const storeHouseProductsMenu =
    useSelector((state) => state.selectMenu.storeHouseProductsMenu?.data) || [];
  console.log("storeHouseProductMenu", storeHouseProductsMenu);
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { sidebarRTL } = useSidebarContext();
  const loading = useSelector((state) => state.selectMenu.loading);
  const [ isLoading,setIsLoading]=useState(false)
  const [storeHouse, setStoreHouse] = useState(null);
  console.log("storeHouse", storeHouse);
  const formik = useFormik({
    initialValues: {
      quantity: "",
    },
    validationSchema: DamagedMaterialsSchema,
    onSubmit: (values) => handleFormSubmit(values),
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = async () => {
    await dispatch(getStoreHousesMenu());
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setIsLoading(false)
    formik.resetForm();
  };

  const handleFormSubmit = async (values) => {
    setIsLoading(true)
    dispatch(addDamagedMaterials(values)).then((res) =>
      res.payload.code === StatuseCode.CREATED
        ? dispatch(getDamagedMaterials({ pageSize: 10, dateFilter: "" })).then(
            handleClose()
          )
        : setOpen(true)
    ).catch(()=> setIsLoading(false))
  };

  const setSelectedStoreHouse = async (value) => {
    try {
      await formik.setFieldValue("storehouse_id", value?.id);
      await dispatch(dispatch(getStoreHousesProductMenu(value?.id)));
      await setStoreHouse(value?.id);
    } catch (error) {
      console.log(error);
    }
  };
  const setSelectedProduct = (value) => {
    formik.setFieldValue("product_id", value?.id);
  };

  const textFields = [
    {
      name: "quantity",
      value: formik.values.quantity,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: t("quantity"),
      error: !!formik.touched.quantity && !!formik.errors.quantity,
      helperText: formik.touched.quantity && formik.errors.quantity,
    },
  ];
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
        disabled={loading}
        variant="outlined"
        onClick={handleClickOpen}
      >
        {loading ? t("wait...") : t("Add")}
      </Button>
      <Dialog
        sx={{ width: { xs: "100%", md: "50%" }, margin: "auto", padding: "0" }}
        open={open}
        onClose={handleClose}
      >
        <DialogContent dir={sidebarRTL ? "rtl" : "ltr"}>
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
              lable={"select_store_house"}
              options={storeHouseMenu}
              onChange={setSelectedStoreHouse}
            />
            <CustomSelect
              lable={"select_store_house_product"}
              isDisabled={!storeHouseProductsMenu.length}
              options={storeHouseProductsMenu}
              onChange={setSelectedProduct}
            />
            <CustomDialogActions
              onClick={handleClose}
              disabled={isLoading}
              onClickAction={formik.handleSubmit}
              text={isLoading ? t("wait") : t("Add")}
            />
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AddDamagedMaterials;
